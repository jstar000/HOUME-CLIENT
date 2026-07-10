import { type QueryClient, useQuery } from '@tanstack/react-query';

import type { RecentFloorPlanResponse } from '@apis/__generated__/data-contracts';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const getRecentFloorPlan =
  async (): Promise<RecentFloorPlanResponse> => {
    return request<RecentFloorPlanResponse>({
      method: HTTPMethod.GET,
      url: API_ENDPOINT.IMAGE_SETUP.RECENT_FLOOR_PLAN,
    });
  };

/** GA previous_space_* — RecentSheet 노출 여부와 동일하게 hasRecentImage 게이트 */
export const getRecentFloorPlanForAnalytics = (
  data: RecentFloorPlanResponse | undefined
): RecentFloorPlanResponse | null => (data?.hasRecentImage ? data : null);

/** viewSht_submit 등 제출 시점에 캐시/네트워크 최신값 보장 (home_space preset 빠른 확인 레이스 방지) */
export const ensureRecentFloorPlanForAnalytics = async (
  queryClient: QueryClient
): Promise<RecentFloorPlanResponse | null> => {
  const data = await queryClient.ensureQueryData({
    queryKey: queryKeys.imageSetup.recentFloorPlan(),
    queryFn: getRecentFloorPlan,
  });

  return getRecentFloorPlanForAnalytics(data);
};

export const useRecentFloorPlanQuery = () => {
  return useQuery({
    queryKey: queryKeys.imageSetup.recentFloorPlan(),
    queryFn: getRecentFloorPlan,
  });
};
