import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const page = style({
  background: colorVars.color.bg_grad,
  width: '100%',
  height: '61.2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const contents = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.6rem 2rem 0 2rem',
});
