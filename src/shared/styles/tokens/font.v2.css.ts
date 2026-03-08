import { createGlobalTheme } from '@vanilla-extract/css';

const LS = '-0.02em'; // Letter spacing -2%

/**
 * 디자인 토큰 V2 - 타이포그래피
 *
 * Naming: {역할}_{weight}_{size}
 * - Line height: title/body 150%, caption 130%
 */
export const fontVarsV2 = createGlobalTheme(':root', {
  fontV2: {
    family: {
      pretendard: 'Pretendard',
    },

    // Title (150%)
    title_sb_24: {
      size: '2.4rem',
      weight: '600',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_20: {
      size: '2rem',
      weight: '600',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_18: {
      size: '1.8rem',
      weight: '600',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_16: {
      size: '1.6rem',
      weight: '600',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_m_16: {
      size: '1.6rem',
      weight: '500',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_15: {
      size: '1.5rem',
      weight: '600',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_m_15: {
      size: '1.5rem',
      weight: '500',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_r_15: {
      size: '1.5rem',
      weight: '400',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    title_sb_14: {
      size: '1.4rem',
      weight: '600',
      lineHeight: '150%',
      letterSpacing: LS,
    },

    // Body (150%)
    body_m_14: {
      size: '1.4rem',
      weight: '500',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    body_r_14: {
      size: '1.4rem',
      weight: '400',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    body_m_13: {
      size: '1.3rem',
      weight: '500',
      lineHeight: '150%',
      letterSpacing: LS,
    },
    body_r_13: {
      size: '1.3rem',
      weight: '400',
      lineHeight: '150%',
      letterSpacing: LS,
    },

    // Caption (130%)
    caption_m_12: {
      size: '1.2rem',
      weight: '500',
      lineHeight: '130%',
      letterSpacing: LS,
    },
    caption_r_12: {
      size: '1.2rem',
      weight: '400',
      lineHeight: '130%',
      letterSpacing: LS,
    },
    caption_r_11: {
      size: '1.1rem',
      weight: '400',
      lineHeight: '130%',
      letterSpacing: LS,
    },
    caption_sb_12: {
      size: '1.2rem',
      weight: '600',
      lineHeight: '130%',
      letterSpacing: LS,
    },
  },
});
