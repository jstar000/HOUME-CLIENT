import { style } from '@vanilla-extract/css';

import { unitVars } from '@styles/tokensV2/unit.css';

export const section = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: unitVars.unit.dimension.wMin,
  height: '28rem',
  overflow: 'hidden',
});
