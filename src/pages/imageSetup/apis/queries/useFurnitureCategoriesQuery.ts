import { useQuery } from '@tanstack/react-query';

import type { DashboardCategoriesResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getFurnitureCategories =
  async (): Promise<DashboardCategoriesResponse> => {
    return request<DashboardCategoriesResponse>({
      method: HTTPMethod.GET,
      url: API_ENDPOINT.IMAGE_SETUP.FURNITURE_CATEGORIES,
    });
  };

export const useFurnitureCategoriesQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.furnitureCategories(),
    queryFn: getFurnitureCategories,
    staleTime: 1000 * 60 * 60, // 정적 데이터, prefetch와 동일하게 1시간 설정
    gcTime: 1000 * 60 * 60 * 24,
  });
};
