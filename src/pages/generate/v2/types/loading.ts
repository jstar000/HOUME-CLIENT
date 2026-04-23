// 스택 UI
export interface CarouselItem {
  rawProductId: number;
  url: string;
}

export interface ImageStackResponse {
  carousels: CarouselItem[];
}
