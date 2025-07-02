import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    // Grayscale
    gray999_50: 'rgba(0, 0, 0, 0.5)',
    gray999_04: 'rgba(0, 0, 0, 0.04);',
    gray999: '#000000',
    gray900: '#1B1E22',
    gray800: '#31373F',
    gray700: '#48505B',
    gray600: '#6C7789',
    gray500: '#8996A9',
    gray400: '#B7C0CD',
    gray300: '#D4DAE2',
    gray200: '#E7EAEF',
    gray100: '#F3F4F7',
    gray050: '#F9FAFB',

    // Brand Colors
    primary: '#6F00FF',
    primary_light1: '#A696FF',
    primary_light2: '#E8E3FC',
    primary_dark: '#5000B8',
    bg_grad: 'linear-gradient(180deg, #DDD6FF 0%, #FFF 50%, #FFF 100%)',
  },

  font: {
    family: {
      pretendard: 'Pretendard',
    },

    // Headings
    heaading_sb_24: {
      size: '24px',
      weight: '600',
      lineHeight: '36px',
      letterSpacing: '-1%',
    },
    heading_sb_22: {
      size: '22px',
      weight: '600',
      lineHeight: '32px',
      letterSpacing: '-1%',
    },
    heading_sb_20: {
      size: '20px',
      weight: '600',
      lineHeight: '30px',
      letterSpacing: '-1%',
    },
    // Title
    title_sb_18: {
      size: '18px',
      weight: '400',
      lineHeight: '26px',
      letterSpacing: '-1%',
    },
    title_m_18: {
      size: '18px',
      weight: '500',
      lineHeight: '18px',
      letterSpacing: '-1%',
    },
    title_sb_16: {
      size: '16px',
      weight: '600',
      lineHeight: '16px',
      letterSpacing: '-1%',
    },
    title_m_16: {
      size: '16px',
      weight: '500',
      lineHeight: '16px',
      letterSpacing: '-1%',
    },
    title_sb_15: {
      size: '15px',
      weight: '600',
      lineHeight: '15px',
      letterSpacing: '-1%',
    },

    // Body
    body_r_15: {
      size: '15px',
      weight: '400',
      lineHeight: '15px',
      letterSpacing: '-1%',
    },
    body_m_14: {
      size: '14px',
      weight: '500',
      lineHeight: '20px',
      letterSpacing: '-1%',
    },
    body_r_14: {
      size: '14px',
      weight: '400',
      lineHeight: '20px',
      letterSpacing: '-1%',
    },

    // Caption
    caption_m_12: {
      size: '12px',
      weight: '500',
      lineHeight: '18px',
      letterSpacing: '-1%',
    },
    caption_r_12: {
      size: '12px',
      weight: '400',
      lineHeight: '18px',
      letterSpacing: '-1%',
    },
  },
});
