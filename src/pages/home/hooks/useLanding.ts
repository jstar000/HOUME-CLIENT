import { useQuery } from '@tanstack/react-query';
import { getHistoryData } from '../apis/landing';
import { QUERY_KEY } from '@/shared/constants/queryKey';

export const useLandingData = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LANDING],
    queryFn: () => getHistoryData(),
    select: (data) => data ?? false,
  });
};
