import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const container = style({
  display: 'flex',
  width: '100%',
  minWidth: '33.5rem',
  minHeight: '33.2rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: '1.6rem',
  overflow: 'hidden',
  backgroundColor: colorVars.color.gray000,
});

export const imgbox = style({
  width: '100%',
  minWidth: '33.5rem',
  height: '22rem',
  overflow: 'hidden',
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  display: 'block',
  boxSizing: 'border-box',
});

export const textbox = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '2.4rem',
  gap: '2rem',
});

export const title = style({
  ...fontStyle('title_m_16'),
});
