export interface ImageGenerateRequest extends Record<string, unknown> {
  houseId: boolean;
  equilibrium: string;
  floorPlan: {
    floorPlanId: number;
    isMirror: boolean;
  };
  moodBoardIds: number[];
  activity: string;
  bedId: number;
  selectiveIds: number[];
}

export interface ImageGenerateData {
  imageId: number;
  imageUrl: string;
  isMirror: boolean;
  equilibrium: string;
  houseForm: string;
  tasteTag: string;
  name: string;
}

export interface ImageGenerateResponse {
  code: number;
  msg: string;
  data: ImageGenerateData;
}
