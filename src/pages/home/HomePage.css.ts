import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const page = style({
  background: colorVars.color.bg_grad,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const gradFrame = style({
  width: '100%',
  background: colorVars.color.bg_grad,
  height: '61.2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const introSection = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.6rem 2rem 0 2rem',
});

export const contents = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 2rem',
  background: colorVars.color.gray000,
});
