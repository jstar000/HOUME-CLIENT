import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const body = style({
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray500,
});
