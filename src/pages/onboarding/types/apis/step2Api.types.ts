export interface FloorPlanList {
  id: number;
  form: string;
  structure: string;
  floorPlanImage: string;
}

export interface FloorPlanResponse {
  code: number;
  msg: string;
  data: {
    floorPlanList: FloorPlanList[];
  };
}
