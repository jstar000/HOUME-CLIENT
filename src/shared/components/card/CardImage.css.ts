import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const cardcontainer = recipe({
  base: {
    width: '16rem',
    height: '24rem',
    overflow: 'hidden',
    borderRadius: '1.6rem',
    outline: 'none',
    boxSizing: 'border-box',
    position: 'relative',
    cursor: 'pointer',
    selectors: {
      '&::after': {
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        borderRadius: '1.6rem',
        transition: 'background-color 0.3s ease',
      },
    },
  },
  variants: {
    state: {
      default: {
        ':active': {
          outline: `2px solid ${colorVars.color.primary}`,
        },
      },
      pressed: {
        backgroundColor: colorVars.color.primary,
        outline: 'none',
        selectors: {
          '&::after': {
            backgroundColor: 'rgba(0, 0, 0, 0.30)',
          },
        },
      },
      selected: {
        backgroundColor: colorVars.color.primary,
        outline: `2px solid ${colorVars.color.primary}`,
      },
      disabled: {
        cursor: 'not-allowed',
        outline: 'none',
        selectors: {
          '&::after': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const cardimg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
  boxSizing: 'border-box',
});

export const disabledcardimg = style([
  cardimg,
  {
    opacity: 0.5,
  },
]);

export const checkbox = recipe({
  base: {
    position: 'absolute',
    top: '0.8rem',
    right: '0.8rem',
    width: '2rem',
    height: '2rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    ...fontStyle('body_m_14'),
  },
  variants: {
    state: {
      default: {
        backgroundColor: colorVars.color.gray000,
        border: 'none',
        color: 'transparent',
      },
      pressed: {
        backgroundColor: colorVars.color.gray000,
        border: 'none',
        color: 'transparent',
      },
      selected: {
        backgroundColor: colorVars.color.primary,
        border: 'none',
        color: colorVars.color.gray000,
      },
      disabled: {
        display: 'none',
      },
    },
  },
});
