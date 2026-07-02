import {
  interaction,
  interactionDurationMs,
  type InteractionSpec,
} from '@styles/tokensV2/interaction/interaction.utils';

/** tap → motion.fadeIn (scale 0.9 → 1, opacity) */
export const popupFadeInSpec = {
  trigger: 'tap',
  action: 'motion.fadeIn',
  duration: 'fast',
  easing: 'bezier.back',
  property: 'opacity',
} as const satisfies InteractionSpec;

/** tap → motion.fadeOut (scale 1 → 0.9, opacity) */
export const popupFadeOutSpec = {
  trigger: 'tap',
  action: 'motion.fadeOut',
  duration: 'fastest',
  easing: 'bezier.out',
  property: 'opacity',
} as const satisfies InteractionSpec;

export const POPUP_FADE_OUT_MS = interactionDurationMs(popupFadeOutSpec);

export const popupFadeInTransition = [
  interaction({ ...popupFadeInSpec, property: 'opacity' }),
  interaction({ ...popupFadeInSpec, property: 'transform' }),
].join(', ');

export const popupFadeOutTransition = [
  interaction({ ...popupFadeOutSpec, property: 'opacity' }),
  interaction({ ...popupFadeOutSpec, property: 'transform' }),
].join(', ');

export const popupFadeInOpacityTransition = interaction({
  ...popupFadeInSpec,
  property: 'opacity',
});

export const popupFadeOutOpacityTransition = interaction({
  ...popupFadeOutSpec,
  property: 'opacity',
});
