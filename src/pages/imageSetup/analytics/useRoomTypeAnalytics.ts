import { useCallback, useEffect, useRef } from 'react';

import {
  getRoomTypePreviousSpaceParams,
  trackRoomTypeCardRoomClick,
  trackRoomTypeEmptyListRecCardClick,
  trackRoomTypeEmptyListRecCardView,
  trackRoomTypeFilterSheetDimmedClick,
  trackRoomTypeFilterSheetCloseClick,
  trackRoomTypeFilterSheetReset,
  trackRoomTypeFilterSheetSubmit,
  trackRoomTypeListEmptyView,
  trackRoomTypeListRoomCardView,
  trackRoomTypeViewSheetSubmit,
  trackRoomTypeViewSheetView,
} from '@pages/imageSetup/analytics/roomTypeAnalytics';
import { useFloorPlanSelect } from '@pages/imageSetup/v2/hooks/useFloorPlanSelect';
import { useFloorPlanStore } from '@pages/imageSetup/v2/stores/useFloorPlanStore';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  useAnalyticsPageView,
  useScrollDepthTrack,
} from '@shared/analytics/hooks';
import { SCREEN_NAME } from '@shared/analytics/screenNames';

import type {
  CompletedFloorPlanSelect,
  ImageSetupSteps,
} from '../types/funnel/steps';

export const useRoomTypeAnalytics = (
  context: ImageSetupSteps['FloorPlanSelect'],
  onNext: (data: CompletedFloorPlanSelect) => void
) => {
  const gridScrollRef = useRef<HTMLDivElement>(null);
  const trackedViewSheetKeyRef = useRef<string | null>(null);

  const floorPlanSelect = useFloorPlanSelect(context, onNext);
  const {
    floorPlans,
    isExact,
    selectedFloorPlanName,
    selectedEquilibrium,
    selectedDetailViews,
    recentFloorPlan,
    handleCardClick,
    handleConfirmFloorPlan,
    handleConfirmRecentFloorPlan,
    grid,
    filterSheet,
    floorPlanSheet,
    recentSheet,
  } = floorPlanSelect;

  const selectedFloorPlanId = useFloorPlanStore(
    (state) => state.selectedFloorPlanId
  );

  useAnalyticsPageView(
    GA_EVENTS.roomType.PAGE_VIEW,
    SCREEN_NAME.ROOM_TYPE,
    getRoomTypePreviousSpaceParams(recentFloorPlan)
  );

  useScrollDepthTrack(GA_EVENTS.roomType.PAGE_SCROLL, SCREEN_NAME.ROOM_TYPE, {
    getScrollElement: () => gridScrollRef.current,
  });

  useEffect(() => {
    if (isExact) {
      trackRoomTypeListRoomCardView(grid.appliedFilters, floorPlans.length);
      return;
    }

    trackRoomTypeListEmptyView(grid.appliedFilters);

    const alternativeSpaceIds = floorPlans
      .map((plan) => plan.id)
      .filter((id): id is number => id !== undefined);

    if (alternativeSpaceIds.length > 0) {
      trackRoomTypeEmptyListRecCardView(
        grid.appliedFilters,
        alternativeSpaceIds
      );
    }
  }, [floorPlans, grid.appliedFilters, isExact]);

  useEffect(() => {
    if (
      floorPlanSheet.open &&
      selectedFloorPlanId &&
      selectedDetailViews.length
    ) {
      const trackKey = `floor-${selectedFloorPlanId}`;
      if (trackedViewSheetKeyRef.current === trackKey) return;

      trackedViewSheetKeyRef.current = trackKey;
      trackRoomTypeViewSheetView({
        floorPlanId: selectedFloorPlanId,
        floorPlanName: selectedFloorPlanName,
        equilibrium: selectedEquilibrium,
        viewCount: selectedDetailViews.length,
      });
      return;
    }

    if (
      recentSheet.open &&
      recentFloorPlan?.floorPlanId &&
      (recentFloorPlan.floorPlans?.length ?? 0) > 0
    ) {
      const trackKey = `recent-${recentFloorPlan.floorPlanId}`;
      if (trackedViewSheetKeyRef.current === trackKey) return;

      trackedViewSheetKeyRef.current = trackKey;
      trackRoomTypeViewSheetView({
        floorPlanId: recentFloorPlan.floorPlanId,
        floorPlanName: recentFloorPlan.floorPlanName ?? '',
        equilibrium: recentFloorPlan.equilibrium,
        viewCount: recentFloorPlan.floorPlans?.length ?? 0,
      });
      return;
    }

    if (!floorPlanSheet.open && !recentSheet.open) {
      trackedViewSheetKeyRef.current = null;
    }
  }, [
    floorPlanSheet.open,
    recentFloorPlan,
    recentSheet.open,
    selectedDetailViews.length,
    selectedEquilibrium,
    selectedFloorPlanId,
    selectedFloorPlanName,
  ]);

  const handleCardClickWithAnalytics = useCallback(
    (floorPlanId: number, fromRecommendation = false) => {
      const plan = floorPlans.find((item) => item.id === floorPlanId);
      if (!plan?.id) return;

      if (fromRecommendation) {
        trackRoomTypeEmptyListRecCardClick(plan, grid.appliedFilters);
      } else {
        trackRoomTypeCardRoomClick(plan, grid.appliedFilters);
      }

      handleCardClick(floorPlanId);
    },
    [floorPlans, grid.appliedFilters, handleCardClick]
  );

  const handleConfirmFloorPlanWithAnalytics = useCallback(() => {
    if (selectedFloorPlanId === null) return;

    const floorPlanView =
      selectedDetailViews[useFloorPlanStore.getState().selectedViewIndex]
        ?.view ?? '';

    trackRoomTypeViewSheetSubmit({
      floorPlanId: selectedFloorPlanId,
      floorPlanName: selectedFloorPlanName,
      floorPlanView,
      equilibrium: selectedEquilibrium,
      recentFloorPlan,
    });
    handleConfirmFloorPlan();
  }, [
    handleConfirmFloorPlan,
    recentFloorPlan,
    selectedDetailViews,
    selectedEquilibrium,
    selectedFloorPlanId,
    selectedFloorPlanName,
  ]);

  const handleConfirmRecentFloorPlanWithAnalytics = useCallback(() => {
    if (!recentFloorPlan?.floorPlanId) return;

    const floorPlanView =
      (recentFloorPlan.floorPlans ?? [])[
        useFloorPlanStore.getState().selectedViewIndex
      ]?.view ?? '';

    trackRoomTypeViewSheetSubmit({
      floorPlanId: recentFloorPlan.floorPlanId,
      floorPlanName: recentFloorPlan.floorPlanName ?? '',
      floorPlanView,
      equilibrium: recentFloorPlan.equilibrium,
      recentFloorPlan,
    });
    handleConfirmRecentFloorPlan();
  }, [handleConfirmRecentFloorPlan, recentFloorPlan]);

  const handleFilterApplyWithAnalytics = useCallback(() => {
    const nextFilters = useFloorPlanStore.getState().pendingFilters;
    trackRoomTypeFilterSheetSubmit(nextFilters);
    filterSheet.onApply();
  }, [filterSheet]);

  const handleFilterResetWithAnalytics = useCallback(() => {
    filterSheet.onReset();
    trackRoomTypeFilterSheetReset();
  }, [filterSheet]);

  const handleFilterCloseWithAnalytics = useCallback(() => {
    trackRoomTypeFilterSheetCloseClick();
    filterSheet.onClose();
  }, [filterSheet]);

  const handleFilterDimmedCloseWithAnalytics = useCallback(() => {
    trackRoomTypeFilterSheetDimmedClick();
    filterSheet.onClose();
  }, [filterSheet]);

  return {
    gridScrollRef,
    filterCategories: floorPlanSelect.filterCategories,
    floorPlans,
    isExact,
    selectedFloorPlanName,
    selectedEquilibrium,
    selectedDetailViews,
    recentFloorPlan,
    handleCardClick: handleCardClickWithAnalytics,
    handleConfirmFloorPlan: handleConfirmFloorPlanWithAnalytics,
    handleConfirmRecentFloorPlan: handleConfirmRecentFloorPlanWithAnalytics,
    grid,
    filterSheet: {
      ...filterSheet,
      onApply: handleFilterApplyWithAnalytics,
      onReset: handleFilterResetWithAnalytics,
      onClose: handleFilterCloseWithAnalytics,
      onOverlayClose: handleFilterDimmedCloseWithAnalytics,
    },
    floorPlanSheet,
    recentSheet,
  };
};
