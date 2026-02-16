import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants/queryKey';

import { getHistoryData } from '../apis/landing';

export const useLandingData = () => {
  return useQuery({
    queryKey: queryKeys.landing.history(),
    queryFn: () => getHistoryData(),
    select: (data) => data ?? false,
  });
};
