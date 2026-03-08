import { createGlobalTheme } from '@vanilla-extract/css';

const LS = '-0.02em'; // Letter spacing -2%

/**
 * 디자인 토큰 V2 - 타이포그래피
 *
 * 1) Primitives: Figma typo-primitive (font, size, weight) — 원시값만
 * 2) Semantic: 역할별 토큰 (title_sb_16, body_m_14 등) — primitive 참조
 */

const primitives = createGlobalTheme(':root', {
  typoPrimitive: {
    font: {
      pretendard: 'Pretendard',
    },
    size: {
      11: '1.1rem',
      12: '1.2rem',
      13: '1.3rem',
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
      18: '1.8rem',
      20: '2rem',
      24: '2.4rem',
    },
    weight: {
      400: '400',
      500: '500',
      600: '600',
      700: '700',
    },
  },
});

const semantic = createGlobalTheme(':root', {
  font: {
    family: {
      pretendard: primitives.typoPrimitive.font.pretendard,
    },

    // Title (150%)
    title_sb_24: {
      size: primitives.typoPrimitive.size[24],
      weight: primitives.typoPrimitive.weight[600],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_20: {
      size: primitives.typoPrimitive.size[20],
      weight: primitives.typoPrimitive.weight[600],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_18: {
      size: primitives.typoPrimitive.size[18],
      weight: primitives.typoPrimitive.weight[600],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_16: {
      size: primitives.typoPrimitive.size[16],
      weight: primitives.typoPrimitive.weight[600],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_m_16: {
      size: primitives.typoPrimitive.size[16],
      weight: primitives.typoPrimitive.weight[500],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_15: {
      size: primitives.typoPrimitive.size[15],
      weight: primitives.typoPrimitive.weight[600],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_m_15: {
      size: primitives.typoPrimitive.size[15],
      weight: primitives.typoPrimitive.weight[500],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_r_15: {
      size: primitives.typoPrimitive.size[15],
      weight: primitives.typoPrimitive.weight[400],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_14: {
      size: primitives.typoPrimitive.size[14],
      weight: primitives.typoPrimitive.weight[600],
      lineHeight: '150%',
      letterSpacing: LS,
    },

    // Body (150%)
    body_m_14: {
      size: primitives.typoPrimitive.size[14],
      weight: primitives.typoPrimitive.weight[500],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    body_r_14: {
      size: primitives.typoPrimitive.size[14],
      weight: primitives.typoPrimitive.weight[400],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    body_m_13: {
      size: primitives.typoPrimitive.size[13],
      weight: primitives.typoPrimitive.weight[500],
      lineHeight: '150%',
      letterSpacing: LS,
    },
    body_r_13: {
      size: primitives.typoPrimitive.size[13],
      weight: primitives.typoPrimitive.weight[400],
      lineHeight: '150%',
      letterSpacing: LS,
    },

    // Caption (130%)
    caption_m_12: {
      size: primitives.typoPrimitive.size[12],
      weight: primitives.typoPrimitive.weight[500],
      lineHeight: '130%',
      letterSpacing: LS,
    },
    caption_r_12: {
      size: primitives.typoPrimitive.size[12],
      weight: primitives.typoPrimitive.weight[400],
      lineHeight: '130%',
      letterSpacing: LS,
    },
    caption_r_11: {
      size: primitives.typoPrimitive.size[11],
      weight: primitives.typoPrimitive.weight[400],
      lineHeight: '130%',
      letterSpacing: LS,
    },
    caption_sb_12: {
      size: primitives.typoPrimitive.size[12],
      weight: primitives.typoPrimitive.weight[600],
      lineHeight: '130%',
      letterSpacing: LS,
    },
  },
});

/** Primitives + Semantic */
export const fontVars = {
  font: {
    ...primitives.typoPrimitive,
    family: semantic.font.family,
    title_sb_24: semantic.font.title_sb_24,
    title_sb_20: semantic.font.title_sb_20,
    title_sb_18: semantic.font.title_sb_18,
    title_sb_16: semantic.font.title_sb_16,
    title_m_16: semantic.font.title_m_16,
    title_sb_15: semantic.font.title_sb_15,
    title_m_15: semantic.font.title_m_15,
    title_r_15: semantic.font.title_r_15,
    title_sb_14: semantic.font.title_sb_14,
    body_m_14: semantic.font.body_m_14,
    body_r_14: semantic.font.body_r_14,
    body_m_13: semantic.font.body_m_13,
    body_r_13: semantic.font.body_r_13,
    caption_m_12: semantic.font.caption_m_12,
    caption_r_12: semantic.font.caption_r_12,
    caption_r_11: semantic.font.caption_r_11,
    caption_sb_12: semantic.font.caption_sb_12,
  },
};
