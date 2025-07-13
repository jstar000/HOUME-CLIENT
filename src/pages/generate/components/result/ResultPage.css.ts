import { colorVars } from '@styles/tokens/color.css';
import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { zIndex } from '@/shared/styles/tokens/zIndex';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '66.7rem',
});

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  padding: '1.6rem 2rem 0 2rem',
  marginBottom: '1.2rem',
  width: '100%',
});

export const infoSection = style({
  backgroundColor: colorVars.color.primary_light3,
  padding: '1.2rem 1.6rem',
  borderRadius: '12px',
});

export const infoText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray900,
});

export const resultSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  marginBottom: '2.4rem',
});

export const imgArea = style({
  width: '33.5rem',
  height: '22rem',
  backgroundColor: colorVars.color.gray300,
  borderRadius: '16px',
});

export const buttonGroup = style({
  display: 'flex',
  gap: '1.1rem',
  justifyContent: 'center',
});

export const curationSection = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '4rem',
  backgroundColor: colorVars.color.gray100,
  marginBottom: '4rem',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  textAlign: 'center',
});

export const headerText = style({
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
});

export const bodyText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
});

export const blurSection = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ctaButtonOverlay = style({
  position: 'absolute',
  top: '31.7rem',
  zIndex: zIndex.blurButton,
  width: '12.1rem',
  height: '4rem',
});
