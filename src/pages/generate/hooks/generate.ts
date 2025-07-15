import { useQuery } from '@tanstack/react-query';
import { getStackData } from '../apis/generate';
import { QUERY_KEY } from '@/shared/constants/queryKey';

export const useStackData = (page: number, options: { enabled: boolean }) => {
  return useQuery({
    queryKey: [QUERY_KEY.GENERATE_LOADING, page],
    queryFn: () => getStackData(page),
    ...options,
  });
};
