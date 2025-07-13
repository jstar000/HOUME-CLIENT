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

// 이미지 영역 컨테이너
export const imageContainer = style({
  position: 'relative',
  width: '33.5rem',
  height: '33.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// 현재 이미지 영역
export const currentImageArea = style({
  position: 'absolute',
  width: '33.5rem',
  height: '33.5rem',
  overflow: 'hidden',
  transition: 'transform 0.6s ease, opacity 0.6s ease',
  transform: 'translateY(0)',
  opacity: 1,
});

export const currentImageAreaOut = style({
  transform: 'translateY(-20px)',
  opacity: 0,
});

// 다음 이미지 영역
export const nextImageArea = style({
  position: 'absolute',
  width: '30.5rem',
  height: '30.5rem',
  borderRadius: '16px',
  overflow: 'hidden',
  transition:
    'transform 0.6s ease, opacity 0.6s ease, width 0.6s ease, height 0.6s ease',
  transform: 'translateY(30px)',
  opacity: 0,
});

export const nextImageAreaActive = style({
  width: '33.5rem',
  height: '33.5rem',
  transform: 'translateY(0)',
  opacity: 1,
});

// 이미지 스타일
export const imageStyle = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '16px',
});
