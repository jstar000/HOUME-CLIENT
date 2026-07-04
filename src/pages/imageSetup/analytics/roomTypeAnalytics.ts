import { FILTER_CATEGORIES } from '@pages/imageSetup/v2/constants/floorPlanFilters';
import type { FloorPlanFilters } from '@pages/imageSetup/v2/types/floorPlan';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  SPACE_VIEW_TYPE,
  type SpaceViewType,
} from '@shared/analytics/params/space';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import {
  getReturnScreenNameFromImageEntry,
  toSheetExpansionStatus,
} from '@shared/analytics/utils/imageFlow';

import type {
  ExploreHouseTemplateItemResponse,
  RecentFloorPlanResponse,
} from '@apis/__generated__/data-contracts';

const roomTypeScreenParams = () => ({
  screen_name: SCREEN_NAME.ROOM_TYPE,
});

const getFilterOptionLabel = (
  categoryId: keyof FloorPlanFilters,
  optionId: string
) =>
  FILTER_CATEGORIES.find(
    (category) => category.id === categoryId
  )?.options.find((option) => option.id === optionId)?.label;

const joinFilterLabels = (
  categoryId: keyof FloorPlanFilters,
  values: string[]
) =>
  values
    .map((value) => getFilterOptionLabel(categoryId, value))
    .filter(Boolean)
    .join(', ') || undefined;

export const getRoomTypeFilterParams = (appliedFilters: FloorPlanFilters) => ({
  filter_space_roomType: joinFilterLabels(
    'residenceType',
    appliedFilters.residenceType
  ),
  filter_space_struct: joinFilterLabels(
    'layoutType',
    appliedFilters.layoutType
  ),
  filter_space_size: joinFilterLabels(
    'equilibrium',
    appliedFilters.equilibrium
  ),
});

export const getRoomTypePreviousSpaceParams = (
  recentFloorPlan?: RecentFloorPlanResponse | null
) => ({
  has_previous_space: recentFloorPlan?.hasRecentImage === true,
  previous_space_id: recentFloorPlan?.floorPlanId,
  previous_space_name: recentFloorPlan?.floorPlanName,
});

const getSpaceViewType = (viewCount: number): SpaceViewType =>
  viewCount > 1 ? SPACE_VIEW_TYPE.MULTI : SPACE_VIEW_TYPE.ONLY;

export const getRoomTypeSpaceCardParams = (
  plan: Pick<ExploreHouseTemplateItemResponse, 'id' | 'name'>
) => ({
  space_id: plan.id,
  space_name: plan.name,
});

export const getRoomTypeViewSheetParams = ({
  floorPlanId,
  floorPlanName,
  equilibrium,
  viewCount,
  floorPlanView,
  sheetExpanded,
}: {
  floorPlanId: number;
  floorPlanName: string;
  equilibrium?: string;
  viewCount: number;
  floorPlanView?: string;
  sheetExpanded: boolean;
}) => ({
  ...roomTypeScreenParams(),
  space_id: floorPlanId,
  space_name: floorPlanName,
  space_size: equilibrium,
  space_view: floorPlanView,
  space_view_type: getSpaceViewType(viewCount),
  sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
});

const filterSheetParams = () => ({
  sheet_expansion_status: toSheetExpansionStatus(true),
});

export const trackRoomTypeCardRoomClick = (
  plan: Pick<ExploreHouseTemplateItemResponse, 'id' | 'name'>,
  appliedFilters: FloorPlanFilters
) => {
  trackEvent(GA_EVENTS.roomType.CARD_ROOM_CLICK, {
    ...roomTypeScreenParams(),
    ...getRoomTypeFilterParams(appliedFilters),
    ...getRoomTypeSpaceCardParams(plan),
  });
};

export const trackRoomTypeEmptyListRecCardClick = (
  plan: Pick<ExploreHouseTemplateItemResponse, 'id' | 'name'>,
  appliedFilters: FloorPlanFilters
) => {
  trackEvent(GA_EVENTS.roomType.EMPTY_LIST_REC_CARD_CLICK, {
    ...roomTypeScreenParams(),
    ...getRoomTypeFilterParams(appliedFilters),
    ...getRoomTypeSpaceCardParams(plan),
  });
};

export const trackRoomTypeFilterSheetSubmit = (
  appliedFilters: FloorPlanFilters
) => {
  trackEvent(GA_EVENTS.roomType.FILTER_SHT_SUBMIT, {
    ...roomTypeScreenParams(),
    ...getRoomTypeFilterParams(appliedFilters),
    ...filterSheetParams(),
  });
};

export const trackRoomTypeFilterSheetReset = () => {
  trackEvent(GA_EVENTS.roomType.FILTER_SHT_RESET, filterSheetParams());
};

export const trackRoomTypeFilterSheetCloseClick = () => {
  trackEvent(GA_EVENTS.roomType.FILTER_SHT_CLOSE_CLICK, filterSheetParams());
};

export const trackRoomTypeFilterSheetDimmedClick = () => {
  trackEvent(GA_EVENTS.roomType.FILTER_SHT_DIMMED_CLICK, filterSheetParams());
};

export const trackRoomTypeListRoomCardView = (
  appliedFilters: FloorPlanFilters,
  spaceCount: number
) => {
  trackEvent(GA_EVENTS.roomType.LIST_ROOM_CARD_VIEW, {
    ...roomTypeScreenParams(),
    ...getRoomTypeFilterParams(appliedFilters),
    space_count: spaceCount,
  });
};

export const trackRoomTypeListEmptyView = (
  appliedFilters: FloorPlanFilters
) => {
  trackEvent(GA_EVENTS.roomType.LIST_EMPTY_VIEW, {
    ...roomTypeScreenParams(),
    ...getRoomTypeFilterParams(appliedFilters),
  });
};

export const trackRoomTypeEmptyListRecCardView = (
  appliedFilters: FloorPlanFilters,
  alternativeSpaceIds: number[]
) => {
  trackEvent(GA_EVENTS.roomType.EMPTY_LIST_REC_CARD_VIEW, {
    ...roomTypeScreenParams(),
    ...getRoomTypeFilterParams(appliedFilters),
    alternative_space_ids:
      alternativeSpaceIds.length > 0
        ? alternativeSpaceIds.join(', ')
        : undefined,
  });
};

export const trackRoomTypeViewSheetView = (params: {
  floorPlanId: number;
  floorPlanName: string;
  equilibrium?: string;
  viewCount: number;
  floorPlanView?: string;
}) => {
  trackEvent(
    GA_EVENTS.roomType.VIEW_SHT_VIEW,
    getRoomTypeViewSheetParams({ ...params, sheetExpanded: true })
  );
};

export const trackRoomTypeViewSheetArrowRightClick = () => {
  trackEvent(
    GA_EVENTS.roomType.VIEW_SHT_ARROW_RIGHT_CLICK,
    filterSheetParams()
  );
};

export const trackRoomTypeViewSheetArrowLeftClick = () => {
  trackEvent(GA_EVENTS.roomType.VIEW_SHT_ARROW_LEFT_CLICK, filterSheetParams());
};

export const trackRoomTypeViewSheetFlipClick = () => {
  trackEvent(GA_EVENTS.roomType.VIEW_SHT_FLIP_CLICK, filterSheetParams());
};

export const trackRoomTypeViewSheetSubmit = ({
  floorPlanId,
  floorPlanName,
  floorPlanView,
  equilibrium,
  recentFloorPlan,
}: {
  floorPlanId: number;
  floorPlanName: string;
  floorPlanView: string;
  equilibrium?: string;
  recentFloorPlan?: RecentFloorPlanResponse | null;
}) => {
  trackEvent(GA_EVENTS.roomType.VIEW_SHT_SUBMIT, {
    ...roomTypeScreenParams(),
    image_entry_route: getEntryRoute(),
    return_screen_name: getReturnScreenNameFromImageEntry(),
    space_id: floorPlanId,
    space_name: floorPlanName,
    space_view: floorPlanView,
    space_size: equilibrium,
    sheet_expansion_status: toSheetExpansionStatus(true),
    ...getRoomTypePreviousSpaceParams(recentFloorPlan),
  });
};

export const trackRoomTypeBtnBackClick = () => {
  trackEvent(GA_EVENTS.roomType.BTN_BACK_CLICK, roomTypeScreenParams());
};

export const trackRoomTypeMdResetInfoView = () => {
  trackEvent(GA_EVENTS.roomType.MD_RESET_INFO_VIEW, roomTypeScreenParams());
};
