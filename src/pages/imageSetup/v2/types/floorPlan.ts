// --- API 응답 타입 ---

// 도면 카드 하나의 데이터
// imageUrls: 도면 뷰 이미지 배열. [0]이 대표 이미지(그리드 썸네일), 나머지는 상세 시트에서 전환
export interface FloorPlanData {
  id: number;
  name: string;
  imageUrls: string[]; // 임시구현
  isLatest: boolean;
}

// API 응답 래퍼
export interface FloorPlanListResponse {
  isExact: boolean;
  floorPlans: FloorPlanData[];
}

// --- 최근 생성 도면 API 응답 타입 ---

// 최근 생성에 사용된 도면 데이터
export interface RecentFloorPlanData {
  id: number;
  name: string;
  imageUrl: string;
  equilibrium: string; // 아직 Enum값 미정
  view: string; // 아직 Enum값 미정
}

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
  residenceType: string;
  layoutType: string;
  areaSize: string;
}

// 필터 초기값
export const DEFAULT_FILTERS: FloorPlanFilters = {
  residenceType: 'ALL',
  layoutType: 'ALL',
  areaSize: 'ALL',
};
