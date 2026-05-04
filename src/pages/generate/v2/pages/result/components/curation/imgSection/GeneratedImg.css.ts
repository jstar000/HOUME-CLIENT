import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const sliderArea = style({
  position: 'relative',
  width: '100%',
  height: '26rem',
  overflow: 'hidden',
});

globalStyle(`${sliderArea} .swiper`, {
  height: '100%',
});

globalStyle(`${sliderArea} .swiper-wrapper`, {
  height: '100%',
});

export const swiperSlide = style({
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
});

export const imgArea = recipe({
  base: {
    objectFit: 'cover',
    objectPosition: 'center center',
    width: '100%',
    height: '100%',
  },
  variants: {
    mirrored: {
      true: {
        transform: 'scaleX(-1)',
      },
      false: {
        transform: 'none',
      },
    },
  },
  defaultVariants: {
    mirrored: false,
  },
});

export const slideNum = style({
  position: 'absolute',
  zIndex: 1,
  top: '1.2rem',
  right: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.1rem',
  borderRadius: '99.9rem',
  backgroundColor: colorVars.color.gray999_30,
  width: '3.4rem',
  height: '2rem',
  ...fontStyle('caption_r_11'),
  color: colorVars.color.gray000,
});

export const slideNumSkeleton = style({
  border: `1px solid ${colorVars.color.gray200}`,
  borderRadius: 'inherit',
  boxShadow: `inset 0 0 0 1px ${colorVars.color.gray100}`,
  background: `linear-gradient(
    90deg,
    ${colorVars.color.gray200} 0%,
    ${colorVars.color.gray100} 50%,
    ${colorVars.color.gray200} 100%
  )`,
  backgroundSize: '200% 100%',
  width: '100%',
  height: '100%',
  animation: `${animationTokens.skeletonWave} 1.6s ease-in-out infinite`,
});

export const slidePrevBtn = style({
  position: 'absolute',
  zIndex: 1,
  bottom: '50%',
  left: '0.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  width: '3.6rem',
  height: '3.6rem',
});

export const slideNextBtn = style({
  position: 'absolute',
  zIndex: 1,
  right: '0.6rem',
  bottom: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  width: '3.6rem',
  height: '3.6rem',
});

export const slideNavIconFrame = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '1.2rem',
  backgroundColor: colorVars.color.gray999_30,
  width: '2.4rem',
  height: '2.4rem',

  selectors: {
    [`${slidePrevBtn}:active &`]: {
      backgroundColor: colorVars.color.gray999_50,
    },
    [`${slideNextBtn}:active &`]: {
      backgroundColor: colorVars.color.gray999_50,
    },
    [`${slidePrevBtn}:disabled &`]: {
      backgroundColor: colorVars.color.gray999_04,
    },
    [`${slideNextBtn}:disabled &`]: {
      backgroundColor: colorVars.color.gray999_04,
    },
  },
});

globalStyle(`${slideNavIconFrame} > svg`, {
  width: '1.2rem',
  height: '1.2rem',
});

export const lockedPreviewImg = style({
  objectFit: 'cover',
  objectPosition: 'center center',
  width: '100%',
  height: '100%',
});

export const lockWrapper = style({
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  transform: 'translate(-50%, -50%)',
  width: '23.2rem',
});

export const lockTextBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: colorVars.color.gray900,
  ...fontStyle('body_m_14'),
});

globalStyle(`${lockTextBox} p`, {
  margin: 0,
});

export const moreBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '99.9rem',
  backgroundColor: colorVars.color.gray999,
  width: '11.6rem',
  height: '4.4rem',
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray000,
});
