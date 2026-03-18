// 도면 뷰
export interface FloorPlanView {
  viewId: number;
  viewLabel: string; // 다용도실이 있는 원룸 / 10평대
  imageUrl: string;
}

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

// 도면 카드 하나의 전체 데이터
export interface FloorPlanData {
  id: number;
  name: string;
  houseType: FilterOption;
  structure: FilterOption;
  areaType: FilterOption;
  thumbnailUrl: string;
  views: FloorPlanView[];
}

// '최근 생성한 공간' 데이터
export interface RecentFloorPlanData {
  floorPlanId: number;
  name: string;
  thumbnailUrl: string;
  views: FloorPlanView[];
}

// 현재 적용된 필터 상태 (houseType, structure, areaType 각각의 선택값)
export interface FloorPlanFilters {
  houseType: string;
  structure: string;
  areaType: string;
}

// 필터 초기값
export const DEFAULT_FILTERS: FloorPlanFilters = {
  houseType: 'ALL',
  structure: 'ALL',
  areaType: 'ALL',
};
