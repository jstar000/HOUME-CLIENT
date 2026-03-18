/**
 * 도면 선택 페이지의 모든 상태를 한 곳에서 관리
 * 1. 도면 선택 상태
 *    - selectedFloorPlanId: 어떤 도면 카드를 선택했는지
 *    - isMirror: 좌우반전 여부
 * 2. 필터 상태 (API query param 이름과 통일: residenceType, layoutType, areaSize)
 *    - appliedFilters: 실제 적용된 필터 (도면 카드 그리드에 반영됨)
 *    - pendingFilters: FilterSheet에서 선택했지만 아직 적용하지 않은 값 저장용 임시 필터
 * 3. 시트 열림/닫힘 상태
 *    - isFilterSheetOpen: 필터 sheet 상태
 *    - isFloorPlanSheetOpen: 도면 sheet 상태
 *    - isRecentSheetOpen: 최근 선택 도면 sheet 상태
 */

// 4개 컴포넌트(도면 그리드, 필터 3개)가 동일 상태를 읽고 써야함 + prop drilling 방지
import { create } from 'zustand';

import { DEFAULT_FILTERS, type FloorPlanFilters } from '../types/floorPlan';

interface FloorPlanStoreState {
  selectedFloorPlanId: number | null;
  selectedViewIndex: number;
  isMirror: boolean;

  appliedFilters: FloorPlanFilters;
  pendingFilters: FloorPlanFilters;

  isFilterSheetOpen: boolean;
  isFloorPlanSheetOpen: boolean;
  isRecentSheetOpen: boolean;

  // 도면 카드 클릭 시 호출, viewIndex/mirror 초기화
  selectFloorPlan: (id: number) => void;
  // 도면 카드 선택 해제
  clearFloorPlan: () => void;
  setViewIndex: (idx: number) => void;
  toggleMirror: () => void;
  // FilterSheet 안에서 칩 클릭 시 다중 선택 토글 (그리드에 실제 반영 X)
  setPendingFilter: (key: keyof FloorPlanFilters, value: string) => void;
  clearAppliedFilter: (key: keyof FloorPlanFilters) => void;
  // '필터 적용하기' 클릭 시 pendingFilter를 appliedFilter로 복사
  applyFilters: () => void;
  resetFilters: () => void;
  // 필터 sheet 열 때 pendingFilter를 appliedFilter로 동기화
  openFilterSheet: () => void;
  closeFilterSheet: () => void;
  openFloorPlanSheet: () => void;
  // 도면선택 sheet 닫을 때 선택 상태도 함께 초기화
  closeFloorPlanSheet: () => void;
  openRecentSheet: () => void;
  closeRecentSheet: () => void;
  // 페이지 이탈 시 모든 상태 초기화
  reset: () => void;
}

export const useFloorPlanStore = create<FloorPlanStoreState>((set) => ({
  selectedFloorPlanId: null,
  selectedViewIndex: 0,
  isMirror: false,

  appliedFilters: { ...DEFAULT_FILTERS },
  pendingFilters: { ...DEFAULT_FILTERS },

  isFilterSheetOpen: false,
  isFloorPlanSheetOpen: false,
  isRecentSheetOpen: false,

  selectFloorPlan: (id) =>
    set({ selectedFloorPlanId: id, selectedViewIndex: 0, isMirror: false }),
  clearFloorPlan: () =>
    set({ selectedFloorPlanId: null, selectedViewIndex: 0, isMirror: false }),
  setViewIndex: (idx) => set({ selectedViewIndex: idx }),
  toggleMirror: () => set((state) => ({ isMirror: !state.isMirror })),

  setPendingFilter: (key, value) =>
    set((state) => ({
      pendingFilters: {
        ...state.pendingFilters,
        [key]:
          value === 'ALL'
            ? []
            : state.pendingFilters[key].includes(value)
              ? state.pendingFilters[key].filter(
                  (selectedValue) => selectedValue !== value
                )
              : [...state.pendingFilters[key], value],
      },
    })),
  clearAppliedFilter: (key) =>
    set((state) => ({
      appliedFilters: {
        ...state.appliedFilters,
        [key]: [],
      },
    })),
  applyFilters: () =>
    set((state) => ({ appliedFilters: { ...state.pendingFilters } })),
  resetFilters: () =>
    set({
      pendingFilters: { ...DEFAULT_FILTERS },
    }),

  openFilterSheet: () =>
    set((state) => ({
      isFilterSheetOpen: true,
      pendingFilters: { ...state.appliedFilters },
    })),
  closeFilterSheet: () => set({ isFilterSheetOpen: false }),
  openFloorPlanSheet: () => set({ isFloorPlanSheetOpen: true }),
  closeFloorPlanSheet: () =>
    set({
      isFloorPlanSheetOpen: false,
      selectedFloorPlanId: null,
      selectedViewIndex: 0,
      isMirror: false,
    }),
  openRecentSheet: () => set({ isRecentSheetOpen: true }),
  closeRecentSheet: () => set({ isRecentSheetOpen: false }),

  reset: () =>
    set({
      selectedFloorPlanId: null,
      selectedViewIndex: 0,
      isMirror: false,
      appliedFilters: { ...DEFAULT_FILTERS },
      pendingFilters: { ...DEFAULT_FILTERS },
      isFilterSheetOpen: false,
      isFloorPlanSheetOpen: false,
      isRecentSheetOpen: false,
    }),
}));
