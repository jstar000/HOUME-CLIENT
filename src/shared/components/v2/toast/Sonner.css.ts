import { globalStyle } from '@vanilla-extract/css';

import { interaction } from '@styles/tokensV2/interaction/interaction.utils';

import {
  TOAST_MOTION_EASING,
  TOAST_MOTION_MS,
  toastHideSpec,
  toastShowSpec,
} from './constants';

const toastShowTransition = [
  interaction({ ...toastShowSpec, property: 'opacity' }),
  interaction({ ...toastShowSpec, property: 'transform' }),
  interaction({ ...toastShowSpec, property: 'height' }),
].join(', ');

const toastHideTransition = [
  interaction({ ...toastHideSpec, property: 'opacity' }),
  interaction({ ...toastHideSpec, property: 'transform' }),
  interaction({ ...toastHideSpec, property: 'height' }),
].join(', ');

/** Sonner 기본 400ms ease → Figma motion.fadeIn/slideIn (duration.slower + bezier.out) */
globalStyle('[data-sonner-toast]', {
  transition: toastShowTransition,
});

globalStyle('[data-sonner-toast] > *', {
  transition: interaction({ ...toastShowSpec, property: 'opacity' }),
});

/** Sonner removed 상태별 하드코딩 transition 오버라이드 */
globalStyle(
  '[data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]',
  {
    transition: toastHideTransition,
  }
);

/** drag down swipe-out → motion.slideOut + fadeOut */
globalStyle(
  '[data-sonner-toast][data-swipe-out="true"][data-y-position="bottom"], [data-sonner-toast][data-swipe-out="true"][data-y-position="top"]',
  {
    animationDuration: `${TOAST_MOTION_MS}ms`,
    animationTimingFunction: TOAST_MOTION_EASING,
  }
);
