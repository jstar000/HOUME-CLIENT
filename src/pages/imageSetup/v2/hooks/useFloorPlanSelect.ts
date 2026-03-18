import { useCallback, useEffect, useMemo } from 'react';

import { useFunnelStore } from '../../stores/useFunnelStore';
import {
  DUMMY_FILTER_CATEGORIES,
  DUMMY_FLOOR_PLAN_DETAILS,
  DUMMY_FLOOR_PLANS,
  DUMMY_RECENT_FLOOR_PLAN,
} from '../constants/floorPlanDummy';
import { useFloorPlanStore } from '../stores/useFloorPlanStore';

import type {
  CompletedFloorPlan,
  ImageSetupSteps,
} from '../../types/funnel/steps';
import type {
  FloorPlanData,
  FloorPlanDetailView,
  FloorPlanFilters,
  RecentFloorPlanData,
} from '../types/floorPlan';

export const useFloorPlanSelect = (
  context: ImageSetupSteps['FloorPlan'],
  onNext: (data: CompletedFloorPlan) => void
) => {
  const store = useFloorPlanStore();
  const savedHouseInfo = useFunnelStore((state) => state.houseInfo);

  // 더미 데이터 (추후 useFloorPlanQuery / useRecentFloorPlanQuery로 교체)
  const filterCategories = DUMMY_FILTER_CATEGORIES;
  const allFloorPlans = DUMMY_FLOOR_PLANS;

  // 최근 생성 도면 (별도 API 응답)
  const recentFloorPlan: RecentFloorPlanData | null = DUMMY_RECENT_FLOOR_PLAN;

  // 최근 생성 공간이 있으면 초기 시트 표시
  useEffect(() => {
    if (recentFloorPlan) {
      store.openRecentSheet();
    }
    // 마운트 시 1회만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchesFilter = (
    selectedValues: string[],
    planValue: string
  ): boolean => {
    return selectedValues.length === 0 || selectedValues.includes(planValue);
  };

  // 필터링된 도면 리스트
  // TODO: API 연동 시 서버사이드 필터링으로 교체 (query param: residenceType, layoutType, areaSize[])
  const filteredFloorPlans = useMemo(
    () =>
      allFloorPlans.filter((plan) => {
        const filters: FloorPlanFilters = store.appliedFilters;

        return (
          matchesFilter(filters.residenceType, plan.residenceType) &&
          matchesFilter(filters.layoutType, plan.layoutType) &&
          matchesFilter(filters.areaSize, plan.areaSize)
        );
      }),
    [allFloorPlans, store.appliedFilters]
  );

  // 선택된 도면 데이터
  const selectedFloorPlan: FloorPlanData | null = useMemo(
    () =>
      store.selectedFloorPlanId
        ? (allFloorPlans.find((p) => p.id === store.selectedFloorPlanId) ??
          null)
        : null,
    [allFloorPlans, store.selectedFloorPlanId]
  );

  // 선택된 도면의 상세 뷰 (추후 상세 API 호출로 교체)
  const selectedDetailViews: FloorPlanDetailView[] = useMemo(
    () =>
      store.selectedFloorPlanId
        ? (DUMMY_FLOOR_PLAN_DETAILS[store.selectedFloorPlanId] ?? [])
        : [],
    [store.selectedFloorPlanId]
  );

  // 카드 클릭 → 도면 바텀시트 오픈
  const handleCardClick = useCallback(
    (floorPlanId: number) => {
      store.selectFloorPlan(floorPlanId);
      store.openFloorPlanSheet();
    },
    [store]
  );

  // 도면 선택 후 "공간 선택하기" CTA
  const handleConfirmFloorPlan = useCallback(() => {
    if (!selectedFloorPlan) return;

    const floorPlanData = {
      floorPlanId: selectedFloorPlan.id,
      isMirror: store.isMirror,
    };

    useFunnelStore.getState().setFloorPlan(floorPlanData);

    const payload: CompletedFloorPlan = {
      houseType: savedHouseInfo?.houseType ?? context.houseType,
      roomType: savedHouseInfo?.roomType ?? context.roomType,
      areaType: savedHouseInfo?.areaType ?? context.areaType,
      houseId: savedHouseInfo?.houseId ?? context.houseId,
      floorPlan: floorPlanData,
    };

    onNext(payload);
  }, [selectedFloorPlan, store.isMirror, savedHouseInfo, context, onNext]);

  // 최근 생성 공간 바텀시트 "선택 완료" CTA
  const handleConfirmRecentFloorPlan = useCallback(() => {
    if (!recentFloorPlan) return;

    const floorPlanData = {
      floorPlanId: recentFloorPlan.id,
      isMirror: false,
    };

    useFunnelStore.getState().setFloorPlan(floorPlanData);

    const payload: CompletedFloorPlan = {
      houseType: savedHouseInfo?.houseType ?? context.houseType,
      roomType: savedHouseInfo?.roomType ?? context.roomType,
      areaType: savedHouseInfo?.areaType ?? context.areaType,
      houseId: savedHouseInfo?.houseId ?? context.houseId,
      floorPlan: floorPlanData,
    };

    store.closeRecentSheet();
    onNext(payload);
  }, [recentFloorPlan, savedHouseInfo, context, store, onNext]);

  return {
    filterCategories,
    filteredFloorPlans,
    selectedFloorPlan,
    selectedDetailViews,
    recentFloorPlan,
    hasRecentFloorPlan: recentFloorPlan !== null,
    handleCardClick,
    handleConfirmFloorPlan,
    handleConfirmRecentFloorPlan,
  };
};
