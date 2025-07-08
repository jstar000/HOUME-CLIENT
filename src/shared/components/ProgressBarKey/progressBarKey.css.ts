import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colorVars } from '@shared/styles/tokens/color.css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '3.6rem',
});

export const track = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  height: '0.4rem',
  backgroundColor: colorVars.color.primary_light2,
  transform: 'translateY(-50%)',
  borderRadius: '9999px',
});

export const stepsWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  height: '100%',
});

export const step = style({
  width: '19.4rem',
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
});
