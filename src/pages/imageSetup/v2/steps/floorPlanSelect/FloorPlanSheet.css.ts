import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['300'],
  paddingBottom: unitVars.unit.gapPadding['300'],
});

export const mirrorWrapper = style({
  transition: 'transform 200ms ease',
  width: '100%',
});

export const mirrored = style({
  transform: 'scaleX(-1)',
});

export const viewLabel = style({
  margin: 0,
  color: colorVars.color.text.tertiary,
  ...fontVars.font.body_r_14,
});

export const titleRow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
});

export const titleIcon = style({
  flexShrink: 0,
  width: '1.6rem',
  height: '1.6rem',
});

export const titleMain = style({
  whiteSpace: 'nowrap',
  color: colorVars.color.text.primary,
  ...fontVars.font.title_m_16,
});

export const titleMeta = style({
  whiteSpace: 'nowrap',
  color: colorVars.color.text.tertiary,
  ...fontVars.font.title_r_15,
});
