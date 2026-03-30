import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const page = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colorVars.color.bg.primary,
  minHeight: '100vh',
});

export const body = style({
  boxSizing: 'border-box',
  flex: 1,
  paddingTop: unitVars.unit.gapPadding['000'],
  paddingRight: unitVars.unit.gapPadding['500'],
  paddingBottom: unitVars.unit.gapPadding['400'],
  paddingLeft: unitVars.unit.gapPadding['500'],
  overflow: 'auto',
});

export const hero = style({
  position: 'relative',
  marginBottom: unitVars.unit.gapPadding['400'],
  borderRadius: unitVars.unit.radius['200'],
  overflow: 'hidden',
});

export const heroPlaceholder = style({
  aspectRatio: '4 / 3',
  backgroundColor: colorVars.color.gray100,
  backgroundImage: `
    linear-gradient(45deg, ${colorVars.color.gray200} 25%, transparent 25%),
    linear-gradient(-45deg, ${colorVars.color.gray200} 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, ${colorVars.color.gray200} 75%),
    linear-gradient(-45deg, transparent 75%, ${colorVars.color.gray200} 75%)
  `,
  backgroundPosition: '0 0, 0 0.8rem, 0.8rem -0.8rem, -0.8rem 0',
  backgroundSize: '1.6rem 1.6rem',
  width: '100%',
});

export const heroOverlay = style({
  position: 'absolute',
  top: unitVars.unit.gapPadding['300'],
  left: unitVars.unit.gapPadding['300'],
  display: 'flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
  pointerEvents: 'none',
  maxWidth: '85%',
});

export const heroTagline = style({
  margin: 0,
  textShadow: `0 0.1rem 0.4rem ${colorVars.color.gray999_a50}`,
  color: colorVars.color.text.inverse,
  ...fontVars.font.title_m_16,
});

export const question = style({
  margin: 0,
  marginBottom: unitVars.unit.gapPadding['300'],
  color: colorVars.color.text.primary,
  ...fontVars.font.title_sb_18,
});

export const optionList = style({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  borderTop: `1px solid ${colorVars.color.border.secondary}`,
  padding: 0,
  listStyle: 'none',
});

export const optionRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['200'],
  borderBottom: `1px solid ${colorVars.color.border.secondary}`,
  paddingTop: unitVars.unit.gapPadding['300'],
  paddingBottom: unitVars.unit.gapPadding['300'],
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
  color: colorVars.color.text.primary,
  ...fontVars.font.title_r_15,
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
