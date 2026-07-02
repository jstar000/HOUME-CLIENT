import { globalStyle } from '@vanilla-extract/css';

import { interaction } from '@styles/tokensV2/interaction/interaction.utils';

import {
  TOAST_SHOW_EASING,
  TOAST_SHOW_MS,
  toastHideSpec,
  toastShowSpec,
} from './constants';

const buildTransition = (spec: typeof toastShowSpec | typeof toastHideSpec) =>
  [
    interaction({ ...spec, property: 'opacity' }),
    interaction({ ...spec, property: 'transform' }),
    interaction({ ...spec, property: 'height' }),
  ].join(', ');

const toastShowTransition = buildTransition(toastShowSpec);
const toastHideTransition = buildTransition(toastHideSpec);

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

/** drag down swipe-out */
globalStyle(
  '[data-sonner-toast][data-swipe-out="true"][data-y-position="bottom"], [data-sonner-toast][data-swipe-out="true"][data-y-position="top"]',
  {
    animationDuration: `${TOAST_SHOW_MS}ms`,
    animationTimingFunction: TOAST_SHOW_EASING,
  }
);
