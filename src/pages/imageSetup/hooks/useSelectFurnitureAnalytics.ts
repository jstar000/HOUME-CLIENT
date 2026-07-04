import { useMemo } from 'react';

import {
  trackSelectFurnitureActivitySheetCtaClick,
  trackSelectFurnitureActivitySheetView,
  trackSelectFurnitureChipClear,
  trackSelectFurnitureChipClick,
  trackSelectFurnitureDropDownActivityClick,
  trackSelectFurnitureErrorToastDeselectView,
} from '@pages/imageSetup/analytics/selectFurnitureAnalytics';
import { useActivityInfo } from '@pages/imageSetup/hooks/activityInfo/useActivityInfo';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  useAnalyticsPageView,
  useScrollDepthTrack,
} from '@shared/analytics/hooks';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';

import type { ImageSetupSteps } from '../types/funnel/steps';

export const useSelectFurnitureAnalytics = (
  context: ImageSetupSteps['ActivityInfo']
) => {
  const categoryAnalytics = useMemo(
    () => ({
      onFurnitureSelect: trackSelectFurnitureChipClick,
      onFurnitureDeselect: trackSelectFurnitureChipClear,
      onEssentialDeselectToast: trackSelectFurnitureErrorToastDeselectView,
    }),
    []
  );

  const activityInfo = useActivityInfo(context, { categoryAnalytics });

  useAnalyticsPageView(
    GA_EVENTS.selectFurniture.PAGE_VIEW,
    SCREEN_NAME.SELECT_FURNITURE,
    { image_entry_route: getEntryRoute() }
  );

  useScrollDepthTrack(
    GA_EVENTS.selectFurniture.PAGE_SCROLL,
    SCREEN_NAME.SELECT_FURNITURE
  );

  const trackDropDownActivityClick = () => {
    trackSelectFurnitureDropDownActivityClick(activityInfo.formData.activity);
  };

  const trackActivitySheetView = () => {
    trackSelectFurnitureActivitySheetView(activityInfo.formData.activity);
  };

  const trackActivitySheetCtaClick = (activityCode: string) => {
    trackSelectFurnitureActivitySheetCtaClick(activityCode);
  };

  return {
    ...activityInfo,
    trackDropDownActivityClick,
    trackActivitySheetView,
    trackActivitySheetCtaClick,
  };
};
