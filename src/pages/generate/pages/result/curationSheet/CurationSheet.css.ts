import { style, styleVariants } from '@vanilla-extract/css';

import { fontStyle } from '@styles/fontStyle';
import { animationTokens } from '@styles/tokens/animation.css';
import { colorVars } from '@styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  backgroundColor: colorVars.color.gray000,
  padding: '2rem 2rem 0',
  width: '100%',
  minHeight: 0,
  overflow: 'hidden',
});

export const title = style({
  ...fontStyle('title_m_16'),
  color: colorVars.color.gray900,
});

export const filterSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  marginTop: '0.8rem',
  backgroundColor: colorVars.color.gray000,
  padding: '0.8rem 0',

  overflowX: 'auto',
  scrollbarWidth: 'none',

  '::-webkit-scrollbar': {
    display: 'none',
  },
  whiteSpace: 'nowrap', // Firefox
  msOverflowStyle: 'none', // IE and Edge
});

// 카테고리 칩 스켈레톤 공통 스타일 정의
export const filterSkeletonChip = style({
  flexShrink: 0,
  borderRadius: '999px',
  background: `linear-gradient(
    90deg,
    ${colorVars.color.gray200} 0%,
    ${colorVars.color.gray100} 50%,
    ${colorVars.color.gray200} 100%
  )`,
  backgroundSize: '200% 100%',
  height: '3.6rem',
  animation: `${animationTokens.skeletonWave} 1.6s ease-in-out infinite`,
});

// 스켈레톤 칩의 가변 너비를 프리셋으로 제공
export const filterSkeletonChipWidth = styleVariants({
  short: { width: '5.6rem' },
  medium: { width: '6.8rem' },
  long: { width: '8.8rem' },
  wide: { width: '10.4rem' },
});

export const content = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginTop: '0.8rem',
  minHeight: 0,
  overflowY: 'auto',
  overscrollBehavior: 'contain',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE and Edge
});

export const gridbox = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(16.4rem, 1fr))',
  rowGap: 0,
  columnGap: '0.7rem',
  width: '100%',
  height: 'fit-content',
});

export const statusContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  paddingBottom: '4.5rem',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  color: colorVars.color.gray500,
});

export const statusMessage = style({
  ...fontStyle('body_m_14'),
  color: colorVars.color.gray600,
});

export const statusMessageShimmer = style({
  ...fontStyle('body_m_14'),
  background: `linear-gradient(
    90deg,
    ${colorVars.color.gray600} 0%,
    ${colorVars.color.gray400} 50%,
    ${colorVars.color.gray600} 100%
  )`,
  backgroundClip: 'text',
  backgroundSize: '200% 100%',
  animation: `${animationTokens.skeletonWave} 2s linear infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const statusSubMessage = style({
  // 상태 안내 보조 메시지에 캡션_regular 12 적용
  ...fontStyle('caption_r_12'),
  color: colorVars.color.gray400,
});

export const statusButton = style({
  marginTop: '0.4rem',
  border: '1px solid',
  borderRadius: '999px',
  borderColor: colorVars.color.gray300,
  backgroundColor: colorVars.color.gray000,
  padding: '0.8rem 1.6rem',
  // 상태 안내 버튼 텍스트에 캡션_medium 12 적용
  ...fontStyle('caption_m_12'),
  color: colorVars.color.gray600,
});

export const loadingDots = style({
  display: 'inline-flex',
  gap: '0.3rem',
  marginLeft: '0.4rem',
});

export const dot = style({
  borderRadius: '50%',
  backgroundColor: colorVars.color.gray500,
  width: '0.4rem',
  height: '0.4rem',
  animation: `${animationTokens.dotsBounce} 1.4s ease-in-out infinite`,

  selectors: {
    '&:nth-child(1)': { animationDelay: '0s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.4s' },
  },
});
