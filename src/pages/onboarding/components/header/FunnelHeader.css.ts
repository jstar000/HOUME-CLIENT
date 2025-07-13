import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1.5rem',
  padding: '1.2rem 2rem 2rem 2rem',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const title = style({
  ...fontStyle('heading_sb_20'),
  color: colorVars.color.gray900,
});

export const detail = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
  whiteSpace: 'pre-line', // 문자열에 개행(\n)이 있을 때만 줄바꿈함
});
