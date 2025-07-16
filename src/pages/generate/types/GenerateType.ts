export interface GenerateTypes {
  sqft: string;
  style: string[];
  user: string;
}

// 스택 UI
export interface CarouselItem {
  carouselId: number;
  url: string;
}

export interface ImageStackResponse {
  carouselResponseDTOS: CarouselItem[];
}

export interface GenerateImageRequest extends Record<string, unknown> {
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

export interface GenerateImageData {
  imageId: number;
  imageUrl: string;
  isMirror: boolean;
  equilibrium: string;
  houseForm: string;
  tasteTag: string;
  name: string;
}

export interface GenerateImageResponse {
  code: number;
  msg: string;
  data: GenerateImageData;
}
