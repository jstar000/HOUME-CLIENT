import { style } from '@vanilla-extract/css';

import { zIndex } from '@styles/tokens/zIndex';

import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['800'],
  marginBottom: '9.6rem',
  padding: unitVars.unit.gapPadding['500'],
  width: '100%',
});

export const headingWrapper = style({
  display: 'flex',
  width: '100%',
});

// TODO: 디자인 나오면 CTA 버튼 v2로 바꾸기!! (4/8 update)
export const buttonWrapper = style({
  position: 'fixed',
  zIndex: zIndex.button,
  right: 0,
  bottom: '2rem', // CtaButton 최대 너비 설정
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  padding: '0 2rem',
  width: '100%',
  maxWidth: '44rem',
});
