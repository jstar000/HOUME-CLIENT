import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const ENTRY_ROUTE = {
  GENERATE_BUTTON: 'GENERATE_BUTTON', // 경로1: 상단 "이미지 생성" 버튼
  HOME_BANNER: 'HOME_BANNER', // 경로2: 홈 배너 슬라이드
  FLOOR_PLAN: 'FLOOR_PLAN', // 경로3: "우리 집 공간으로 시작하기" 도면 클릭
  STYLE_RESTYLE: 'STYLE_RESTYLE', // 경로4: "다른 스타일로 꾸며보기"
  PRODUCT_SELECTION: 'PRODUCT_SELECTION', // 경로5: "상품" 탭 담기 → CTA
} as const;

export type EntryRoute = (typeof ENTRY_ROUTE)[keyof typeof ENTRY_ROUTE];

export const RESULT_TYPE = {
  RECOMMENDATION: 'RECOMMENDATION',
  LIST: 'LIST',
} as const;

export type ResultType = (typeof RESULT_TYPE)[keyof typeof RESULT_TYPE];

// 경로5(PRODUCT_SELECTION)에서 ProductTab UI 복원에 사용하는 스냅샷 아이템
// productIds는 상품으로 이미지 생성 API payload용, productSnapshot은 상품 탭에서 바텀시트가 확장됐을 때의 가구 UI 복원용으로 책임이 분리됨
export interface ProductSnapshotItem {
  id: string;
  title: string;
  brand: string;
  imageUrl?: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
}

// 경로별 프리셋 (경로에 따라 preset이 달라짐을 나타내고, 경로별 타입 안정성을 위해 discriminated union 적용)
// 퍼널 진입 시점에 setFlow()로 저장 → 최종 이미지 생성 API 호출 시 사용
// 경로5(product)는 productIds(API payload) + productSnapshot(UI 복원, 로그인 게이트 복귀/재선택 진입 시 ProductTab hydration용)을 함께 보관 (홈 화면에서 상품 '탭'은 url이 없으므로 자체 url이 존재하는 banner/style 플로우와는 다른 방식으로 로그인 게이트에 대비해야 함)
export type PresetData =
  | { type: 'banner'; bannerId: number; answerId: number } // 경로2
  | { type: 'floorPlan'; floorPlanId: number } // 경로3: 홈에서 도면 선택
  | { type: 'style'; styleId: number } // 경로4
  | {
      type: 'product';
      productIds: number[];
      productSnapshot: ProductSnapshotItem[];
    }; // 경로5

interface ImageFlowState {
  entryRoute: EntryRoute | null;
  resultType: ResultType | null;
  preset: PresetData | null;
  // 퍼널 진입 시 호출, 진입경로 + 프리셋 세팅 및 resultType 자동 매핑
  // TODO: API 명세 나오면 entryRoute와 preset 조합을 타입으로 강제 (ex: STYLE_RESTYLE + banner preset 방지)
  setFlow: (params: { entryRoute: EntryRoute; preset?: PresetData }) => void;
  // preset만 선택적으로 비움 (entryRoute/resultType은 ResultPage에서 사용하므로 유지해야 하는 케이스에 사용)
  clearPreset: () => void;
  // 퍼널 완료/이탈 시 호출
  reset: () => void;
}

// 경로 → 결과 유형 자동 매핑
const RESULT_TYPE_MAP: Record<EntryRoute, ResultType> = {
  [ENTRY_ROUTE.GENERATE_BUTTON]: RESULT_TYPE.RECOMMENDATION,
  [ENTRY_ROUTE.HOME_BANNER]: RESULT_TYPE.LIST,
  [ENTRY_ROUTE.FLOOR_PLAN]: RESULT_TYPE.RECOMMENDATION,
  [ENTRY_ROUTE.STYLE_RESTYLE]: RESULT_TYPE.LIST,
  [ENTRY_ROUTE.PRODUCT_SELECTION]: RESULT_TYPE.LIST,
};

export const useImageFlowStore = create<ImageFlowState>()(
  persist(
    (set) => ({
      entryRoute: null,
      resultType: null,
      preset: null,
      setFlow: ({ entryRoute, preset }) =>
        set({
          entryRoute,
          resultType: RESULT_TYPE_MAP[entryRoute], // 결과 페이지 타입 자동 매핑
          preset: preset ?? null,
        }),
      clearPreset: () => set({ preset: null }),
      reset: () => set({ entryRoute: null, resultType: null, preset: null }),
    }),
    {
      name: 'image-flow',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// 진입 경로 기반 다음 퍼널 스텝 분기 헬퍼
// 경로1,3: 도면→인테리어스타일, 2,4,5: 도면→이미지로딩
export const getNextFunnelStep = (
  entryRoute: EntryRoute
): 'INTERIOR_STYLE' | 'IMAGE_LOADING' => {
  if (
    entryRoute === ENTRY_ROUTE.GENERATE_BUTTON ||
    entryRoute === ENTRY_ROUTE.FLOOR_PLAN
  ) {
    return 'INTERIOR_STYLE';
  }
  return 'IMAGE_LOADING';
};
