import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const captionBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.8rem 1.2rem',
  borderRadius: '0.6rem',
  backgroundColor: colorVars.color.gray000,
  border: `1px solid ${colorVars.color.gray200}`,
  boxSizing: 'border-box',
  maxWidth: '33.5rem',
});

export const strongText = style({
  ...fontStyle('caption_sb_12'),
  color: colorVars.color.gray900,
});

export const normalText = style({
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray500,
});

export const highlight = style({
  ...fontStyle('caption_m_12'),
  color: colorVars.color.gray000,
  backgroundColor: colorVars.color.gray800,
  padding: '0 0.4rem',
  borderRadius: '0.3rem',
});
