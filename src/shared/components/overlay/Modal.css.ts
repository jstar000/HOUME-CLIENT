import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const container = style({
  position: 'fixed',
  inset: 0,
  margin: 'auto',
  zIndex: 999,
  display: 'flex',
  flexDirection: 'column',
  width: '30rem',
  height: '42.6rem',
  padding: '3.22rem 0 1.6rem 0',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '3.2rem',
  borderRadius: '2rem',
});

export const info = style({
  display: 'flex',
  width: '24rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.6rem',
});

export const title = style({
  textAlign: 'center',
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
  wordBreak: 'keep-all', // 공백 또는 하이픈에서만 줄바꿈이 일어나도록 설정
});

export const creditBox = style({
  display: 'flex',
  height: '3.6rem',
  padding: '0 1.6rem',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.8rem',
  borderRadius: '6px',
  background: colorVars.color.gray100,
});

export const label = style({
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray600,
});

export const count = style({
  ...fontStyle('title_sb_16'),
  color: colorVars.color.primary,
});

export const creditImg = style({
  width: '22.8rem',
  height: '12rem',
  background: colorVars.color.gray100,
});

export const buttonBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.4rem',
});

export const primaryButton = style({
  display: 'flex',
  width: '18rem',
  height: '5.2rem',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '999px',
  background: colorVars.color.primary,
});

export const primaryText = style({
  ...fontStyle('title_m_16'),
  color: 'white',
});

export const exitButton = style({
  display: 'flex',
  padding: '1.2rem 0',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'underline',
  textDecorationColor: colorVars.color.gray500,
});

export const exitButtonText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray500,
});
