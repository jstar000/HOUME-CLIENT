import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '3.6rem',
});

export const stepsWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  height: '100%',
  selectors: {
    '&:focus-within': {
      outline: `2px solid ${colorVars.color.primary}`,
      outlineOffset: '2px',
      borderRadius: '4px',
    },
  },
});

export const step = style({
  width: '100%',
  maxWidth: '19.4rem',
  height: '2rem',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const icon = recipe({
  base: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  variants: {
    variant: {
      active: {
        opacity: 1,
      },
      inactive: {
        opacity: 0.3,
      },
    },
  },
  defaultVariants: {
    variant: 'inactive',
  },
});
