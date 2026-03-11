/**
 * CtaButtonV2 - Figma Component Playground 스펙
 *
 * 1. shape - round | square
 * 2. style - fill | outline
 * 3. height - 56 | 44 | 40 | 32 | 26 (px)
 * 4. color - primary(다크) | inverse(하양)
 * 5. leftIcon - true | false (아이콘 종류는 icon prop)
 * 6. status - default | pressed (pressed 시 height scale: 56→0.98, 나머지→0.95)
 */

export const CTA_BUTTON_SHAPE = ['round', 'square'] as const;
export type CtaButtonShape = (typeof CTA_BUTTON_SHAPE)[number];

export const CTA_BUTTON_STYLE = ['fill', 'outline'] as const;
export type CtaButtonStyle = (typeof CTA_BUTTON_STYLE)[number];

/** Figma height (px) */
export const CTA_BUTTON_HEIGHT = [56, 44, 40, 32, 26] as const;
export type CtaButtonHeight = (typeof CTA_BUTTON_HEIGHT)[number];

export const CTA_BUTTON_COLOR = ['primary', 'inverse'] as const;
export type CtaButtonColor = (typeof CTA_BUTTON_COLOR)[number];

export const CTA_BUTTON_ICON = [
  'none',
  'twostar',
  'externalLink',
  'refresh',
] as const;
export type CtaButtonIcon = (typeof CTA_BUTTON_ICON)[number];

export const CTA_BUTTON_STATUS = ['default', 'pressed'] as const;
export type CtaButtonStatus = (typeof CTA_BUTTON_STATUS)[number];

/** pressed 시 적용되는 scale (height 56 → 0.98, 그 외 → 0.95) */
export const PRESSED_SCALE: Record<CtaButtonHeight, number> = {
  56: 0.98,
  44: 0.95,
  40: 0.95,
  32: 0.95,
  26: 0.95,
};
