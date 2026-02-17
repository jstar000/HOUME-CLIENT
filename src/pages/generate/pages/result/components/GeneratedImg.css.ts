import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// import { zIndex } from '@styles/tokens/zIndex';
import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  aspectRatio: '3 / 2',
  position: 'relative',
  width: '100%',
  minHeight: '26rem',
  overflow: 'hidden',
});

export const swiperSlide = style({
  position: 'relative',
  overflow: 'hidden',
});

export const imgArea = recipe({
  base: {
    aspectRatio: '3 / 2',
    objectFit: 'cover',
    objectPosition: 'center', // 비율 유지하며 영역 완전히 채움
    width: '100%', // 이미지 중앙 부분 표시
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
  left: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '99.9rem',
  backgroundColor: colorVars.color.gray999_30,
  width: '3.6rem',
  height: '3.6rem',

  ':active': {
    backgroundColor: colorVars.color.gray999_50,
  },

  ':disabled': {
    backgroundColor: colorVars.color.gray999_04,
  },
});

export const slideNextBtn = style({
  position: 'absolute',
  zIndex: 1,
  right: '1.2rem',
  bottom: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '99.9rem',
  backgroundColor: colorVars.color.gray999_30,
  width: '3.6rem',
  height: '3.6rem',

  ':active': {
    backgroundColor: colorVars.color.gray999_50,
  },

  ':disabled': {
    backgroundColor: colorVars.color.gray999_04,
  },
});

export const imgAreaBlurred = recipe({
  base: {
    aspectRatio: '3 / 2',
    filter: 'blur(15px)',
    backgroundColor: 'lightgray',
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
  },
  variants: {
    mirrored: {
      true: {
        transform: 'scaleX(-1) scale(1.1)',
      },
      false: {
        transform: 'scale(1.1)',
      },
    },
  },
  defaultVariants: {
    mirrored: false,
  },
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
  gap: '1.6rem',
  transform: 'translate(-50%, -50%)',
  filter: 'none',
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
