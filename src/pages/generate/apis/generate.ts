import type { CarouselItem, ImageStackResponse } from '../types/GenerateType';
import { HTTPMethod, request } from '@/shared/apis/request';

// 캐러셀 가구 이미지 제공
export const getStackData = async (page: number): Promise<CarouselItem[]> => {
  const res = await request<ImageStackResponse>({
    method: HTTPMethod.GET,
    url: '/api/v1/carousels',
    query: { page },
  });
  return res.carouselResponseDTOS ?? [];
};

// 이미지 좋아요 / 별로예요
