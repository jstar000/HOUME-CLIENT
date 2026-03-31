import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const page = style({
  display: 'flex',
  flexDirection: 'column',
});

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: unitVars.unit.gapPadding['700'],
  padding: `${unitVars.unit.gapPadding['300']} ${unitVars.unit.gapPadding['500']} ${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['500']}`,
});

export const bannerCard = style({});

export const questionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  gap: unitVars.unit.gapPadding['400'],
  width: '100%',
});

export const question = style({
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['100']}`,
  ...fontVars.font.title_sb_16,
  color: colorVars.color.text.primary,
});

export const optionList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['200'],
});

export const optionRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['400']}`,
});

export const optionRadio = style({
  boxSizing: 'border-box',
  flexShrink: 0,
  border: `1px solid ${colorVars.color.border.primary}`,
  borderRadius: unitVars.unit.radius['full'],
  backgroundColor: colorVars.color.bg.primary,
  width: '2rem',
  height: '2rem',
});

export const optionLabel = style({
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['100']}`,
  ...fontVars.font.body_r_14,
  color: colorVars.color.text.primary,
});

export const ctaBar = style({
  flexShrink: 0,
  boxShadow: `0 -0.4rem 1.6rem ${colorVars.color.shadow.primary}`,
  backgroundColor: colorVars.color.bg.primary,
  paddingTop: unitVars.unit.gapPadding['200'],
  paddingRight: unitVars.unit.gapPadding['500'],
  paddingBottom: `calc(${unitVars.unit.gapPadding['300']} + env(safe-area-inset-bottom, 0px))`,
  paddingLeft: unitVars.unit.gapPadding['500'],
});
