// --- 도면 목록 API 응답 타입 ---

// 도면 카드 하나의 데이터 (목록 조회)
export interface FloorPlanData {
  id: number;
  name: string;
  imageUrl: string;
  isLatest: boolean;
  residenceType: string;
  layoutType: string;
  areaSize: string;
}

// API 응답 래퍼
export interface FloorPlanListResponse {
  isExact: boolean;
  floorPlans: FloorPlanData[];
}

// --- 도면 상세 API 응답 타입 ---

// 도면 상세 뷰 하나의 데이터 (상세 조회 시 배열로 반환)
export interface FloorPlanDetailView {
  id: number;
  name: string;
  imageUrl: string;
  equilibrium: string; // Enum — 평형 (값 미정)
  view: string; // Enum — 뷰 (값 미정)
}

// API 응답 래퍼
export interface FloorPlanDetailResponse {
  floorPlan: FloorPlanDetailView[];
}

// --- 최근 생성 도면 API 응답 타입 ---

// 최근 생성에 사용된 도면 데이터 (FloorPlanDetailView와 동일 구조)
export type RecentFloorPlanData = FloorPlanDetailView;

// API 응답 래퍼
export interface RecentFloorPlanResponse {
  hasRecentImage: boolean;
  floorPlan: RecentFloorPlanData | null;
}

// --- 필터 관련 타입 ---

// 각 FilterCategory의 하위 선택지
export interface FilterOption {
  id: string;
  label: string;
}

// ex: 주거 형태, 구조, 평형
export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

// 현재 적용된 필터 상태 (API query param 이름과 통일)
export interface FloorPlanFilters {
  residenceType: string[];
  layoutType: string[];
  areaSize: string[];
}

// 필터 초기값
export const DEFAULT_FILTERS: FloorPlanFilters = {
  residenceType: [],
  layoutType: [],
  areaSize: [],
};
