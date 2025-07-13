import { recipe } from '@vanilla-extract/recipes';
import { colorVars } from '@styles/tokens/color.css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const CtaButton = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minWidth: '12.1rem',
    maxWidth: '33.5rem',
    height: '5.6rem',
    padding: '1.7rem 0',
    textAlign: 'center',
    alignItems: 'center',
    gap: '0.8rem',
    borderRadius: '99.9rem',
    ...fontStyle('title_m_16'),
    color: colorVars.color.gray000,
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    whiteSpace: 'nowrap',
  },
  variants: {
    state: {
      active: {
        backgroundColor: colorVars.color.primary,
        ':active': {
          backgroundColor: colorVars.color.primary_dark,
        },
      },
      disabled: {
        backgroundColor: colorVars.color.gray300,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    type: {
      default: {},
      kakao: {
        fontFamily: `"Apple SD Gothic Neo", sans-serif`,
        backgroundColor: '#FEE500',
        color: '#000000D9',
        padding: '1.8rem 0',

        ':active': {
          backgroundColor: '#FEE500',
        },
      },
    },
    buttonSize: {
      small: {
        height: '4rem',
      },
      medium: {
        height: '4.4rem',
      },
      large: {},
    },
  },
  defaultVariants: {
    state: 'active',
    type: 'default',
  },
});
