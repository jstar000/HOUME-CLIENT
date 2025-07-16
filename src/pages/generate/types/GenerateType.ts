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
