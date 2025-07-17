import type { CarouselItem, ImageStackResponse } from '../types/GenerateType';
import type {
  GenerateImageRequest,
  GenerateImageResponse,
} from '../types/GenerateType';
import { HTTPMethod, request, type RequestConfig } from '@/shared/apis/request';

// 스택 UI
// 캐러셀 가구 이미지 제공
export const getStackData = async (page: number): Promise<CarouselItem[]> => {
  const res = await request<ImageStackResponse>({
    method: HTTPMethod.GET,
    url: '/api/v1/carousels',
    query: { page },
  });
  return res.carouselResponseDTOS ?? [];
};

// 캐러셀 이미지 좋아요 / 별로예요
export const postLikeStack = async (carouselId: number) => {
  return request({
    method: HTTPMethod.POST,
    url: `/api/v1/carousels/like`,
    query: {
      carouselId,
    },
  });
};

export const postHateStack = async (carouselId: number) => {
  return request({
    method: HTTPMethod.POST,
    url: `/api/v1/carousels/hate`,
    query: {
      carouselId,
    },
  });
};

// 생성 결과
// 생성된 이미지 조회
export const getResultData = async (imageId: number) => {
  return request({
    method: HTTPMethod.GET,
    url: `/api/v1/generated-images/${imageId}/preference`,
  });
};

// 생성된 이미지 선호 여부
export const postPreference = async (imageId: number, isLike: boolean) => {
  return request({
    method: HTTPMethod.POST,
    url: `/api/v1/generated-images/${imageId}/preference`,
    body: {
      isLike,
    },
  });
};

// 가구 추천 받기 버튼 클릭 로그 확인
export const postFurnitureLog = async () => {
  return request({
    method: HTTPMethod.POST,
    url: '/api/v1/furnitures/logs',
  });
};

// 결제 모달 버튼 클릭 로그 확인
export const postCreditLog = async () => {
  return request({
    method: HTTPMethod.POST,
    url: '/api/v1/credits/logs',
  });
};

export const generateImage = async (
  requestData: GenerateImageRequest
): Promise<GenerateImageResponse['data']> => {
  const config: RequestConfig = {
    method: HTTPMethod.POST,
    url: '/api/v1/generated-images/generate',
    body: requestData,
  };

  return await request<GenerateImageResponse['data']>(config);
};
