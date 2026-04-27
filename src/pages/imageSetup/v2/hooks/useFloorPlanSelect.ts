import { useEffect } from 'react';

import { useFunnelStore } from '../../stores/useFunnelStore';
import { useHouseTemplateDetailQuery } from '../apis/queries/useHouseTemplateDetailQuery';
import { useHouseTemplatesQuery } from '../apis/queries/useHouseTemplatesQuery';
import { FILTER_CATEGORIES } from '../constants/floorPlanFilters';
import { useFloorPlanStore } from '../stores/useFloorPlanStore';

import type {
  CompletedFloorPlanSelect,
  ImageSetupSteps,
} from '../../types/funnel/steps';

export const useFloorPlanSelect = (
  _context: ImageSetupSteps['FloorPlanSelect'],
  onNext: (data: CompletedFloorPlanSelect) => void
) => {
  const store = useFloorPlanStore();

  // 도면 전체 조회 (필터 변경 시 자동 refetch — queryKey에 appliedFilters 포함)
  const { data: houseTemplatesData } = useHouseTemplatesQuery({
    residenceType: store.appliedFilters.residenceType,
    layoutType: store.appliedFilters.layoutType,
    equilibrium: store.appliedFilters.equilibrium,
  });
  const floorPlans = houseTemplatesData?.floorPlans ?? [];

  // 도면 상세 조회 (카드 선택 시점에만 fetch)
  const { data: detailData } = useHouseTemplateDetailQuery(
    store.selectedFloorPlanId
  );
  const selectedFloorPlanName = detailData?.floorPlanName ?? '';
  const selectedEquilibrium = detailData?.equilibrium ?? '';
  const selectedDetailViews = detailData?.floorPlans ?? [];

  // 1순위: useFunnelStore에 저장된 도면이 있는 경우 시트 복원
  // (case: 경로 3 홈 도면 클릭 / 로그인 게이트에서 복귀)
  // TODO: 2순위 최근 생성 공간(RecentSheet)은 GET /api/v2/recent-floor-plan swagger 갱신 후 추가
  useEffect(() => {
    const savedFloorPlan = useFunnelStore.getState().floorPlan;
    if (savedFloorPlan) {
      store.restoreFloorPlan(
        savedFloorPlan.floorPlanId,
        savedFloorPlan.isMirror
      );
      store.openFloorPlanSheet();
    }
    // 마운트 시 1회만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (floorPlanId: number) => {
    store.selectNewFloorPlan(floorPlanId);
    store.openFloorPlanSheet();
  };

  // 도면 선택 후 "공간 선택하기" CTA
  const handleConfirmFloorPlan = () => {
    if (store.selectedFloorPlanId === null) return;
    const floorPlanData: CompletedFloorPlanSelect['floorPlan'] = {
      floorPlanId: store.selectedFloorPlanId,
      isMirror: store.isMirror,
    };
    useFunnelStore.getState().setFloorPlan(floorPlanData);
    onNext({ floorPlan: floorPlanData });
  };

  return {
    filterCategories: FILTER_CATEGORIES,
    floorPlans,
    selectedFloorPlanName,
    selectedEquilibrium,
    selectedDetailViews,
    handleCardClick,
    handleConfirmFloorPlan,

    // 필터 그리드에서 사용하는 상태/액션
    grid: {
      appliedFilters: store.appliedFilters,
      onFilterChipClick: store.openFilterSheet,
      onFilterChipClear: store.clearAppliedFilter,
    },

    // FilterSheet props
    filterSheet: {
      open: store.isFilterSheetOpen,
      onClose: store.closeFilterSheet,
      pendingFilters: store.pendingFilters,
      onFilterChange: store.setPendingFilter,
      onApply: () => {
        store.applyFilters();
        store.closeFilterSheet();
      },
      onReset: store.resetFilters,
    },

    // FloorPlanSheet (도면 상세) props
    floorPlanSheet: {
      open: store.isFloorPlanSheetOpen,
      onClose: store.closeFloorPlanSheet,
    },
  };
};
