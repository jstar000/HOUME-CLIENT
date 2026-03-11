import { style } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { zIndex } from '@styles/tokens/zIndex';
import { colorVars } from '@styles/tokensV2/color.css';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: colorVars.color.gray000,
  width: '100%',
  minHeight: '100vh',
});

export const headerSection = style({
  position: 'sticky',
  zIndex: zIndex.navigation,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colorVars.color.gray000,
  padding: '1.6rem 2rem',
  width: '100%',
  maxWidth: '44rem',
});

export const mainSection = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  width: '100%',
  maxWidth: '44rem',
});

export const contentBlock = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  width: '100%',
});

export const text = style({
  ...fontStyle('body_r_14'),
  textAlign: 'center',
  color: colorVars.color.gray900,
});

export const button = style({
  ...fontStyle('body_m_14'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '12px',
  background: colorVars.color.fill.brand,
  padding: '1.2rem 2rem',
  minWidth: '20rem',
  color: colorVars.color.gray000,
});
