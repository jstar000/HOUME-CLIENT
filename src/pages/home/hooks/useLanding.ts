import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@constants/queryKey';

import { getHistoryData } from '../apis/landing';

export const useLandingDataQuery = () => {
  return useQuery({
    queryKey: queryKeys.landing.history(),
    queryFn: () => getHistoryData(),
    select: (data) => data ?? false,
  });
};
