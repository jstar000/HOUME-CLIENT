import { useFunnelStore } from '@pages/imageSetup/stores/useFunnelStore';

import {
  ENTRY_ROUTE,
  getNextFunnelStep,
  useImageFlowStore,
} from '@store/useImageFlowStore';
import type { FlowAnalyticsSnapshot } from '@store/useImageFlowStore';

import {
  ACTIVITY_CHIP,
  type ActivityChip,
} from '@shared/analytics/params/imageSetup';
import {
  LOAD_PREFERENCE_TYPE,
  RESULT_PREFERENCE_TYPE,
  type LoadPreferenceType,
  type ResultPreferenceType,
} from '@shared/analytics/params/result';
import { SHEET_EXPANSION_STATUS } from '@shared/analytics/params/shop';
import { SCREEN_NAME, type ScreenName } from '@shared/analytics/screenNames';

import type { FurnitureCategoryGroup } from '@apis/__generated__/data-contracts';

const ACTIVITY_CODE_TO_CHIP: Record<string, ActivityChip> = {
  // API v2 activity.code
  REMOTE_WORK: ACTIVITY_CHIP.WORK_REMOTE,
  READING: ACTIVITY_CHIP.READING,
  FLOOR_LIVING: ACTIVITY_CHIP.SEDENTARY,
  HOME_CAFE: ACTIVITY_CHIP.HOME_CAFE,
  // GA 스펙 snake_case (레거시/스냅샷 호환)
  default: ACTIVITY_CHIP.DEFAULT,
  work_remote: ACTIVITY_CHIP.WORK_REMOTE,
  reading: ACTIVITY_CHIP.READING,
  sedentary: ACTIVITY_CHIP.SEDENTARY,
  home_cafe: ACTIVITY_CHIP.HOME_CAFE,
};

export const mapActivityCodeToChip = (code: string): ActivityChip =>
  ACTIVITY_CODE_TO_CHIP[code] ?? ACTIVITY_CHIP.DEFAULT;

export const buildMoodboardIdsParam = (ids: number[]): string => ids.join(', ');

export const buildSelectedFurnitureChips = (
  furnitureIds: number[],
  categories: FurnitureCategoryGroup[] | undefined
): string | undefined => {
  if (!categories?.length || furnitureIds.length === 0) return undefined;

  const codes: string[] = [];
  for (const category of categories) {
    for (const furniture of category.furnitures ?? []) {
      if (
        furniture.id != null &&
        furnitureIds.includes(furniture.id) &&
        furniture.code
      ) {
        codes.push(furniture.code);
      }
    }
  }

  return codes.length > 0 ? codes.join(', ') : undefined;
};

/** image_entry_route 기준 imageSetup 직전 화면 — image funnel `return_screen_name` */
export const getReturnScreenNameFromImageEntry = (): ScreenName | undefined => {
  const entryRoute = useImageFlowStore.getState().entryRoute;
  if (!entryRoute) return undefined;

  switch (entryRoute) {
    case ENTRY_ROUTE.GENERATE_BUTTON:
    case ENTRY_ROUTE.FLOOR_PLAN:
      return SCREEN_NAME.HOME;
    case ENTRY_ROUTE.HOME_BANNER:
      return SCREEN_NAME.BANNER_DETAIL;
    case ENTRY_ROUTE.STYLE_RESTYLE:
      return SCREEN_NAME.STYLE_DETAIL;
    case ENTRY_ROUTE.PRODUCT_SELECTION:
    case ENTRY_ROUTE.PRODUCT_REGENERATE:
      return SCREEN_NAME.SHOP;
    default:
      return undefined;
  }
};

/** loadImg_page_view `return_screen_name` — generate 직전 퍼널 스텝 */
export const getLoadImgReturnScreenName = (): ScreenName => {
  const entryRoute = useImageFlowStore.getState().entryRoute;
  if (!entryRoute) return SCREEN_NAME.ROOM_TYPE;

  return getNextFunnelStep(entryRoute) === 'INTERIOR_STYLE'
    ? SCREEN_NAME.SELECT_FURNITURE
    : SCREEN_NAME.ROOM_TYPE;
};

export const toSheetExpansionStatus = (expanded: boolean) =>
  expanded ? SHEET_EXPANSION_STATUS.EXPANDED : SHEET_EXPANSION_STATUS.DEFAULT;

export const toLoadPreferenceType = (isLike: boolean): LoadPreferenceType =>
  isLike ? LOAD_PREFERENCE_TYPE.PREFERRED : LOAD_PREFERENCE_TYPE.NON_PREFERRED;

export const toResultPreferenceType = (
  isLike: boolean
): ResultPreferenceType =>
  isLike
    ? RESULT_PREFERENCE_TYPE.PREFERRED
    : RESULT_PREFERENCE_TYPE.NON_PREFERRED;

export const getFlowAnalyticsSnapshot = (): FlowAnalyticsSnapshot | null =>
  useImageFlowStore.getState().flowSnapshot;

/** mutation onSettled 전 — 결과 GA용 퍼널 입력값 백업 (풀퍼널) */
export const captureFullFunnelFlowSnapshot = (
  snapshot: FlowAnalyticsSnapshot
): void => {
  useImageFlowStore.getState().setFlowSnapshot(snapshot);
};

/**
 * mutation onSettled 전 — 결과 GA용 퍼널 입력값 백업 (숏퍼널)
 * useActivityInfo에서 이미 저장됐으면 skip
 */
export const ensureShortFunnelFlowSnapshot = (): void => {
  const { flowSnapshot, preset } = useImageFlowStore.getState();
  if (flowSnapshot) return;

  const funnel = useFunnelStore.getState();
  useImageFlowStore.getState().setFlowSnapshot({
    floorPlanId: funnel.floorPlan?.floorPlanId,
    productIds: preset?.type === 'product' ? preset.productIds : undefined,
  });
};

export const buildResultRecPageViewParams = (genImgId: number) => {
  const snapshot = getFlowAnalyticsSnapshot();

  return {
    screen_name: SCREEN_NAME.RESULT_REC,
    gen_img_id: genImgId,
    space_id: snapshot?.floorPlanId,
    selected_moodBoard_ids: snapshot?.moodBoardIds?.length
      ? buildMoodboardIdsParam(snapshot.moodBoardIds)
      : undefined,
    selected_activity_chip: snapshot?.activityCode
      ? mapActivityCodeToChip(snapshot.activityCode)
      : undefined,
    selected_furniture_chips: snapshot?.furnitureChipCodes,
  };
};

export const buildResultListPageViewParams = (genImgId: number) => {
  const snapshot = getFlowAnalyticsSnapshot();

  return {
    screen_name: SCREEN_NAME.RESULT_LIST,
    gen_img_id: genImgId,
    selected_product_ids: snapshot?.productIds?.length
      ? snapshot.productIds.join(', ')
      : undefined,
  };
};
