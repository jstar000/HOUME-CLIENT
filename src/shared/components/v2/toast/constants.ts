import {
  interactionDurationMs,
  interactionEasing,
  type InteractionSpec,
} from '@styles/tokensV2/interaction/interaction.utils';

/** 노출 시점 상이 → motion.fadeIn + motion.slideIn */
export const toastShowSpec = {
  trigger: 'tap',
  action: 'motion.fadeIn',
  duration: 'slower',
  easing: 'bezier.out',
  property: 'opacity',
} as const satisfies InteractionSpec;

/** motion.fadeOut + motion.slideOut — dismiss 트리거는 toast.ts defaults 참고 */
export const toastHideSpec = {
  trigger: 'afterDelay',
  action: 'motion.fadeOut',
  duration: 'slower',
  easing: 'bezier.out',
  property: 'opacity',
} as const satisfies InteractionSpec;

export const TOAST_SHOW_MS = interactionDurationMs(toastShowSpec);
export const TOAST_SHOW_EASING = interactionEasing(toastShowSpec);
