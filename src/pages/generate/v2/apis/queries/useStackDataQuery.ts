import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { GetCarouselV2ListResponseDTO } from '@/shared/apis/__generated__/data-contracts';

export const getStackData = async (
  furnitureIds: number[]
): Promise<GetCarouselV2ListResponseDTO> => {
  const res = await request<GetCarouselV2ListResponseDTO>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.GENERATE.CAROUSELS_V2,
    query: { furnitureIds },
  });
  return res;
};

export const useStackDataQuery = (
  furnitureIds: number[],
  options: {
    enabled: boolean;
    onSuccess?: (data: GetCarouselV2ListResponseDTO) => void;
    onError?: (err: unknown) => void;
  }
) => {
  const { enabled, onSuccess, onError } = options;

  const query = useQuery<GetCarouselV2ListResponseDTO, unknown>({
    queryKey: queryKeys.generate.stack(furnitureIds),
    queryFn: () => getStackData(furnitureIds),
    staleTime: 2 * 60 * 1000,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
    enabled,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      onSuccess?.(query.data);
    }
  }, [onSuccess, query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError) {
      onError?.(query.error);
    }
  }, [onError, query.isError, query.error]);

  return query;
};
