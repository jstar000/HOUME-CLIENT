import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 20px',
  alignItems: 'center',
  gap: '4rem',
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  ...fontStyle('title_sb_16'),
  color: colorVars.color.gray800,
  marginBottom: '1.6rem',
});

export const buttonBox = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.7rem',
  marginBottom: '0.4rem',
});
