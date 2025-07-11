import { colorVars } from '@styles/tokens/color.css';
import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.6rem 2rem 2rem 2rem',
  marginTop: '1.6rem',
  backgroundColor: 'white',
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  justifyContent: 'center',
  marginBottom: '2.4rem',
});

export const progressBarBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
  width: '30.5rem',
  padding: '1.6rem 2rem 1.2rem 2rem',
  borderRadius: '12px',
  backgroundColor: colorVars.color.gray050,
});

export const loadText = style({
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray500,
  textAlign: 'center',
});

export const infoText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray900,
  textAlign: 'center',
});

export const carouselSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5.2rem',
});

export const imageArea = style({
  width: '33.5rem',
  height: '33.5rem',
  borderRadius: '16px',
  backgroundColor: colorVars.color.gray400,
});

export const buttonGroup = style({
  display: 'flex',
  gap: '0.7rem',
  justifyContent: 'center',
});
