import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: unitVars.unit.gapPadding['400'],
  width: '100%',
});

export const headerRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const sectionTitle = style({
  ...fontVars.font.title_sb_16,
  padding: `0 ${unitVars.unit.gapPadding['100']}`,
  color: colorVars.color.text.primary,
});

export const moreButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['050'],
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
  ...fontVars.font.body_r_14,
  color: colorVars.color.text.tertiary,
});

export const moreButtonIcon = style({
  flexShrink: 0,
});

export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: unitVars.unit.gapPadding['200'],
  width: '100%',
});
