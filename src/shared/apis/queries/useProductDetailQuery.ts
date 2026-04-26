import { useQuery } from '@tanstack/react-query';

import type { CurationProductDetailResponse } from '@shared/apis/__generated__/data-contracts';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getProductDetail = async (
  productId: number
): Promise<CurationProductDetailResponse> => {
  return request<CurationProductDetailResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.PRODUCT.DETAIL(productId),
  });
};

export const useProductDetailQuery = (
  productId: number | null | undefined,
  options?: { enabled?: boolean }
) => {
  const resolvedId =
    productId !== undefined && productId !== null && Number.isFinite(productId)
      ? productId
      : null;

  const enabledById = resolvedId !== null;
  const enabled =
    options?.enabled !== undefined
      ? options.enabled && enabledById
      : enabledById;

  return useQuery({
    queryKey: [...queryKeys.product.all, 'productDetail', resolvedId] as const,
    queryFn: () => getProductDetail(resolvedId as number),
    enabled,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  });
};
