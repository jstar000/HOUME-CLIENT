import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * 디자인 토큰 V2 - 색상
 *
 * Naming: gray{명도}, gray{명도}_a{투명도%}, purple{명도}
 * - 999 = Black, 000 = White
 * - a50 = 50% opacity, a30 = 30%, a04 = 4%, a80 = 80%
 */
export const colorVarsV2 = createGlobalTheme(':root', {
  colorV2: {
    // Grayscale
    gray999: '#000000',
    gray999_a50: 'rgba(0, 0, 0, 0.5)',
    gray999_a30: 'rgba(0, 0, 0, 0.3)',
    gray999_a04: 'rgba(0, 0, 0, 0.04)',
    gray999_a20: 'rgba(0, 0, 0, 0.2)',
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
    gray000: '#FFFFFF',
    gray000_a80: 'rgba(255, 255, 255, 0.8)',
    gray000_a30: 'rgba(255, 255, 255, 0.3)',

    // Purple (Brand)
    purple700: '#5000B8',
    purple600: '#6F00FF',
    purple500: '#A696FF',
    purple300: '#E8E3FC',
    purple200: '#EFEDFD',

    // Feedback
    error: '#FF0000',
    error_light: '#FFF0F0',

    // Gradient
    bg_grad:
      'linear-gradient(180deg, #A696FF -15.93%, #DDD6FF 7.25%, #FFF 42.03%, #FFF 100%)',
  },
});
