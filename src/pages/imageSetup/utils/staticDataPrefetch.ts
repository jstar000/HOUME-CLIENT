import { queryKeys } from '@constants/queryKey';

import { getActivities } from '../apis/queries/useActivitiesQuery';
import { getFurnitureCategories } from '../apis/queries/useFurnitureCategoriesQuery';
import { getMoodBoardImage } from '../apis/queries/useMoodBoardQuery';
import { MOOD_BOARD_CONSTANTS } from '../types/apis/interiorStyle';
import { getHouseTemplates } from '../v2/apis/queries/useHouseTemplatesQuery';

import type { QueryClient } from '@tanstack/react-query';

// admin에서 추가되는 무드보드 이미지/주요 활동 등이 있을 수 있으므로
// 정적 데이터 prefetch 주기 1시간으로 설정
const STATIC_DATA_STALE_TIME = 1000 * 60 * 60;
const STATIC_DATA_GC_TIME = 1000 * 60 * 60 * 24;

/**
 * 앱 시작 시점에 미리 로딩할 데이터들을 prefetch하는 함수
 */
export const prefetchStaticData = (queryClient: QueryClient) => {
  // 도면 전체 조회 (필터 없는 기본 응답을 미리 캐싱)
  // 카드 클릭 시 도면 상세 조회는 floorPlanId 의존이라 prefetch 대상 X
  const defaultHouseTemplatesParams = {
    residenceType: [],
    layoutType: [],
    equilibrium: [],
  };
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.houseTemplates(defaultHouseTemplatesParams),
    queryFn: () => getHouseTemplates(defaultHouseTemplatesParams),
    staleTime: STATIC_DATA_STALE_TIME,
    gcTime: STATIC_DATA_GC_TIME,
  });

  // 주요활동 데이터 (활동 목록 + 활동별 필수 가구)
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.activities(),
    queryFn: getActivities,
    staleTime: STATIC_DATA_STALE_TIME,
    gcTime: STATIC_DATA_GC_TIME,
  });

  // 가구 카테고리 데이터 (카테고리 + 카테고리별 가구)
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.furnitureCategories(),
    queryFn: getFurnitureCategories,
    staleTime: STATIC_DATA_STALE_TIME,
    gcTime: STATIC_DATA_GC_TIME,
  });

  // 무드보드 이미지 데이터
  queryClient.prefetchQuery({
    queryKey: queryKeys.imageSetup.moodBoard(
      MOOD_BOARD_CONSTANTS.DEFAULT_LIMIT
    ),
    queryFn: () => getMoodBoardImage(),
    staleTime: STATIC_DATA_STALE_TIME,
    gcTime: STATIC_DATA_GC_TIME,
  });
};
