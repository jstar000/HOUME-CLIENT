import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * 디자인 토큰 V2 - Unit (dimension, gap/padding, radius)
 *
 * Figma Design Token - unit 스코프
 * 값 단위: px
 */
export const unitVars = createGlobalTheme(':root', {
  unit: {
    // dimension - WIDTH_HEIGHT
    dimension: {
      hMax: '956px',
      hMin: '667px',
      wMax: '440px',
      wMin: '375px',
    },

    // gap, padding - GAP
    gapPadding: {
      '000': '0',
      '050': '2px',
      '100': '4px',
      '200': '8px',
      '300': '12px',
      '400': '16px',
      '500': '20px',
      '600': '24px',
      '700': '32px',
      '800': '40px',
      '900': '56px',
      full: '999999px',
    },

    // radius - CORNER_RADIUS
    radius: {
      '000': '0',
      '100': '4px',
      '200': '8px',
      '300': '12px',
      '400': '16px',
      '500': '20px',
      '600': '24px',
      '700': '32px',
      '800': '40px',
      full: '999999px',
    },
  },
});
