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
  width: '300px',
  height: '426px',
  padding: '32px 0 16px 0',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  borderRadius: '20px',
});

export const info = style({
  display: 'flex',
  width: '228px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
});

export const title = style({
  textAlign: 'center',
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
  // wordBreak: 'keep-all',
  overflowWrap: 'break-word',
});

export const creditBox = style({
  display: 'flex',
  height: '36px',
  padding: '0px 16px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '18px',
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
  width: '228px',
  height: '120px',
  background: colorVars.color.gray100,
});

export const buttonBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

export const primaryButton = style({
  display: 'flex',
  width: '180px',
  height: '52px',
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
  padding: '12px 0px',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'underline',
  textDecorationColor: colorVars.color.gray500,
});

export const exitButtonText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray500,
});
