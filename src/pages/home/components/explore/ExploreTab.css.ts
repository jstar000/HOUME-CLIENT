import { style } from '@vanilla-extract/css';

import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: unitVars.unit.dimension.wMin,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['800'],
  padding: unitVars.unit.gapPadding['500'],
  width: '100%',
});
