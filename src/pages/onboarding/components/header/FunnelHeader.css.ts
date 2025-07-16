import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';
import { zIndex } from '@/shared/styles/tokens/zIndex';

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1.5rem',
    padding: '1.2rem 2rem 2rem 2rem',
  },
  variants: {
    size: {
      short: {
        minHeight: '13.5rem',
      },
      long: {
        minHeight: '15.6rem',
      },
    },
  },
});

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const imgWrapper = style({
  width: '14.4rem',
});

export const progressWrapper = style({
  position: 'relative',
  zIndex: zIndex.text,
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  position: 'relative',
  zIndex: zIndex.text,
});

export const title = style({
  ...fontStyle('heading_sb_20'),
  color: colorVars.color.gray900,
});

export const detail = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
  whiteSpace: 'pre-line', // 문자열에 개행(\n)이 있을 때만 줄바꿈함s
});
