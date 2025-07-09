import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const divider = style({
  width: '37.5rem',
  height: '0.8rem',
  backgroundColor: colorVars.color.gray100,
});
