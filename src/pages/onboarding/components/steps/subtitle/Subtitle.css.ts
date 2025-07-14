import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const subTextBox = style({
  display: 'flex',
  gap: '0,4rem',
});

export const subtitle = style({
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray700,
});

export const caption = style({
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray500,
});
