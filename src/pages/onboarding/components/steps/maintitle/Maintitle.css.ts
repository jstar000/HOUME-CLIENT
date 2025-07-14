import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const mainTextBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const title = style({
  ...fontStyle('title_sb_16'),
  color: colorVars.color.gray800,
});

export const body = style({
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray500,
});
