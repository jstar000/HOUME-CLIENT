import { useCallback, useEffect, useMemo } from 'react';

import { useFunnelStore } from '../../stores/useFunnelStore';
import {
  DUMMY_FILTER_CATEGORIES,
  DUMMY_FLOOR_PLANS,
  DUMMY_RECENT_FLOOR_PLAN,
} from '../constants/floorPlanDummy';
import { useFloorPlanStore } from '../stores/useFloorPlanStore';

import type {
  CompletedFloorPlan,
  ImageSetupSteps,
} from '../../types/funnel/steps';
import type { FloorPlanData } from '../types/floorPlan';

export const useFloorPlanSelect = (
  context: ImageSetupSteps['FloorPlan'],
  onNext: (data: CompletedFloorPlan) => void
) => {
  const store = useFloorPlanStore();
  const savedHouseInfo = useFunnelStore((state) => state.houseInfo);

  // 더미 데이터 (추후 useFloorPlanQuery로 교체)
  const filterCategories = DUMMY_FILTER_CATEGORIES;
  const allFloorPlans = DUMMY_FLOOR_PLANS;
  const recentFloorPlan = DUMMY_RECENT_FLOOR_PLAN;

  // 최근 생성 공간이 있으면 초기 시트 표시
  useEffect(() => {
    if (recentFloorPlan) {
      store.openRecentSheet();
    }
    // 마운트 시 1회만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 필터링된 도면 리스트
  // appliedFilters 기준으로 filteredFloorPlans 반환
  const filteredFloorPlans = useMemo(() => {
    const { houseType, structure, areaType } = store.appliedFilters;

    return allFloorPlans.filter((plan) => {
      if (houseType !== 'ALL' && plan.houseType.id !== houseType) return false;
      if (structure !== 'ALL' && plan.structure.id !== structure) return false;
      if (areaType !== 'ALL' && plan.areaType.id !== areaType) return false;
      return true;
    });
  }, [allFloorPlans, store.appliedFilters]);

  // 선택된 공간 데이터
  // selectedFloorPlanId로 해당 객체 찾아서 반환
  const selectedFloorPlan: FloorPlanData | null = useMemo(
    () =>
      store.selectedFloorPlanId
        ? (allFloorPlans.find((p) => p.id === store.selectedFloorPlanId) ??
          null)
        : null,
    [allFloorPlans, store.selectedFloorPlanId]
  );

  // 카드 클릭 → 도면 바텀시트 오픈
  const handleCardClick = useCallback(
    (floorPlanId: number) => {
      store.selectFloorPlan(floorPlanId);
      store.openFloorPlanSheet();
    },
    [store]
  );

  // TODO: 바텀시트 use-overlay 적용
  // TODO: 바텀시트 dismiss 시 처리할 로직 확인(상태 초기화 등)

  // 도면 선택 후 "공간 선택하기" CTA
  const handleConfirmFloorPlan = useCallback(() => {
    if (!selectedFloorPlan) return;

    const currentView = selectedFloorPlan.views[store.selectedViewIndex];

    const floorPlanData = {
      floorPlanId: selectedFloorPlan.id,
      isMirror: store.isMirror,
      viewId: currentView?.viewId ?? null,
    };

    // TODO: useFunnelStore 수정(각 스텝 별 필요한 데이터 달라짐)
    useFunnelStore.getState().setFloorPlan(floorPlanData);

    const payload: CompletedFloorPlan = {
      houseType: savedHouseInfo?.houseType ?? context.houseType,
      roomType: savedHouseInfo?.roomType ?? context.roomType,
      areaType: savedHouseInfo?.areaType ?? context.areaType,
      houseId: savedHouseInfo?.houseId ?? context.houseId,
      floorPlan: floorPlanData,
    };

    onNext(payload);
  }, [
    selectedFloorPlan,
    store.selectedViewIndex,
    store.isMirror,
    savedHouseInfo,
    context,
    onNext,
  ]);

  // 저장된 내 공간 바텀시트 "선택 완료하기" CTA
  const handleConfirmRecentFloorPlan = useCallback(() => {
    if (!recentFloorPlan) return;

    const firstView = recentFloorPlan.views[0];

    const floorPlanData = {
      floorPlanId: recentFloorPlan.floorPlanId,
      isMirror: false,
      viewId: firstView?.viewId ?? null,
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
    recentFloorPlan,
    hasRecentFloorPlan: recentFloorPlan !== null,
    handleCardClick,
    handleConfirmFloorPlan,
    handleConfirmRecentFloorPlan,
  };
};
