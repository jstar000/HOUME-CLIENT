import { style } from '@vanilla-extract/css';

import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  width: '100%',
  minWidth: unitVars.unit.dimension.wMin,
  maxWidth: unitVars.unit.dimension.wMax,
});
