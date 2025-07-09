import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const container = style({
  display: 'flex',
  width: '100%',
  height: '4.8rem',
  paddingRight: '1.6rem',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  ...fontStyle('title_m_16'),
  background: colorVars.color.gray000,
  color: colorVars.color.gray900,
});

export const leftdiv = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '4.8rem',
  height: '4.8rem',
  padding: '1.2rem',
});

export const rightdiv = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '4.8rem',
  height: '4.8rem',
  padding: '1.2rem 0',
  textAlign: 'center',
  color: colorVars.color.gray900,
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
});

export const CtaButton = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    width: '28rem',
    height: '5.9rem',
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
  },
  defaultVariants: {
    state: 'active',
    type: 'default',
  },
});
