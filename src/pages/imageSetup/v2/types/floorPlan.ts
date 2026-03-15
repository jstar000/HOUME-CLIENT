export interface FloorPlanView {
  viewId: number;
  viewLabel: string;
  imageUrl: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FloorPlanData {
  id: number;
  spaceName: string;
  houseType: FilterOption;
  structure: FilterOption;
  areaType: FilterOption;
  thumbnailUrl: string;
  views: FloorPlanView[];
}

export interface RecentSpaceData {
  spaceId: number;
  spaceName: string;
  thumbnailUrl: string;
  views: FloorPlanView[];
}

export interface FloorPlanFilters {
  houseType: string;
  structure: string;
  areaType: string;
}

export const DEFAULT_FILTERS: FloorPlanFilters = {
  houseType: 'ALL',
  structure: 'ALL',
  areaType: 'ALL',
};
