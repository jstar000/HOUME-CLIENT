import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { getJjymList } from '@pages/mypage/apis/saveItemsList';
import type {
  FurnitureItem,
  JjymsResponse,
} from '@pages/mypage/types/apis/saveItemsList';

import { queryKeys } from '@constants/queryKey';

export const useGetJjymListQuery = (
  options?: UseQueryOptions<JjymsResponse, unknown, FurnitureItem[]>
) => {
  return useQuery({
    queryKey: queryKeys.jjym.list(),
    queryFn: getJjymList,
    select: (data) => data.items,
    ...options,
  });
};
