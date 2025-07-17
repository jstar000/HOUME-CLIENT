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

// 이미지 생성 API 요청 데이터 타입
export interface GenerateImageRequest extends Record<string, unknown> {
  houseId: number;
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

// 이미지 생성 API 응답 데이터 타입
export interface GenerateImageData {
  imageId: number;
  imageUrl: string;
  isMirror: boolean;
  equilibrium: string;
  houseForm: string;
  tagName: string;
  name: string;
}

// 이미지 생성 API 응답 데이터 타입
export interface GenerateImageResponse {
  code: number;
  msg: string;
  data: GenerateImageData;
}
