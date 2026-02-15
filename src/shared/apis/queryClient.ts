import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { handleGlobalError, isSessionExpiredError } from './globalErrorHandler';
import { prefetchStaticData } from './staticDataPrefetch';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleGlobalError }),
  mutationCache: new MutationCache({ onError: handleGlobalError }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 브라우저 포커싱 시 자동 재요청 방지
      retry: (failureCount, error) => {
        if (isSessionExpiredError(error)) return false;
        const status = (error as any)?.response?.status;
        if (status === 401 || status === 403) return false;
        return failureCount < 1;
      },
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: false,
    },
  },
});

prefetchStaticData(queryClient);
