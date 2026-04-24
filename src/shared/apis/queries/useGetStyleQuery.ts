import { useQuery } from '@tanstack/react-query';

import type { OtherStyleListResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getStyleList = async (
  size?: number
): Promise<OtherStyleListResponse> => {
  return request<OtherStyleListResponse>({
    method: HTTPMethod.GET,
    url: API_ENDPOINT.STYLES.STYLE_LIST,
    query: size !== undefined ? { size } : {},
  });
};

export const useGetStyleListQuery = (size?: number) => {
  return useQuery({
    queryKey: queryKeys.styles.list(size),
    queryFn: () => getStyleList(size),
    select: (res) => res.otherStyles ?? [],
  });
};
