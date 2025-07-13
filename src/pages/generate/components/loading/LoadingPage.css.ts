import { colorVars } from '@styles/tokens/color.css';
import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.6rem 2rem 2rem 2rem',
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

// progress bar
export const progressBack = style({
  width: '26.5rem',
  height: '0.4rem',
  backgroundColor: colorVars.color.gray200,
  borderRadius: '999px',
  overflow: 'hidden',
});

export const progressBar = style({
  height: '100%',
  backgroundColor: colorVars.color.primary,
  transition: 'width 0.2s ease-out',
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

export const buttonGroup = style({
  display: 'flex',
  gap: '0.7rem',
  justifyContent: 'center',
});

// 스택 UI
export const stackContainer = style({
  position: 'relative',
  width: '33.5rem',
  height: '33.5rem',
  borderRadius: '16px',
  overflow: 'hidden',
});

export const stackImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '16px',
  transition: 'transform 0.4s linear, opacity 0.3s ease',
});

// 현재 이미지 상태
export const currentActive = style({
  transform: 'translateY(0)',
  opacity: 1,
});

export const currentOut = style({
  transform: 'translateY(-40px)',
  opacity: 0,
});

// 다음 이미지 상태
export const nextDefault = style({
  transform: 'translateY(50px) scale(0.91)',
  opacity: 0,
});

export const nextActive = style({
  transform: 'translateY(0) scale(1)',
  opacity: 1,
});
