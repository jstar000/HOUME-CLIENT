import {
  interactionDurationMs,
  interactionEasing,
  type InteractionSpec,
} from '@styles/tokensV2/interaction/interaction.utils';

export const TOP_OFFSET_REM = '10.4rem';

export const sheetSlideInSpec = {
  trigger: 'tap',
  action: 'motion.slideIn',
  duration: 'base',
  easing: 'bezier.back',
  property: 'transform',
} as const satisfies InteractionSpec;

export const sheetSlideOutSpec = {
  trigger: 'tap',
  action: 'motion.slideOut',
  duration: 'base',
  easing: 'bezier.back',
  property: 'transform',
} as const satisfies InteractionSpec;

export const SHEET_SLIDE_IN_MS = interactionDurationMs(sheetSlideInSpec);
export const SHEET_SLIDE_IN_EASING = interactionEasing(sheetSlideInSpec);

export const SHEET_SLIDE_OUT_MS = interactionDurationMs(sheetSlideOutSpec);
export const SHEET_SLIDE_OUT_EASING = interactionEasing(sheetSlideOutSpec);

/** transitionend / setTimeout fallback용 (slideOut과 동일) */
export const SHEET_TRANSITION_MS = SHEET_SLIDE_OUT_MS;

export const DRAG_THRESHOLD_PX = 5;

/** Persistent 모드에서 expanded snap을 트리거하는 드래그 비율 (collapsed~expanded 구간 중 상위 비율) */
export const PERSISTENT_EXPAND_RATIO = 0.2;
