export interface GenerateTypes {
  sqft: string;
  style: string[];
  user: string;
}

// 결과 페이지 좋아요/별로예요 상태
export type ResultPageLikeState = 'like' | 'dislike' | null;

// 스택 UI
export interface CarouselItem {
  carouselId: number;
  url: string;
}

export interface ImageStackResponse {
  carouselResponseDTOS: CarouselItem[];
}

// 이미지 생성 V4 요청 타입은 swagger 자동 생성 사용, V2/V3 Legacy API 관련 타입은 제거

// 결과 페이지 자식 컴포넌트 props용 이미지 메타 타입은 v2/pages/result/types.ts(ResultImageMeta) 참조

// 요인 문구 타입
export interface Factor {
  id: number;
  text: string;
}

// 요인 문구 API 응답 타입
export interface FactorsResponse {
  factors: Factor[];
}
