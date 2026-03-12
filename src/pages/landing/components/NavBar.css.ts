import { style } from '@vanilla-extract/css';

import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${unitVars.unit.gapPadding['000']}`,
  width: '100%',
  height: '4.8rem',
});

export const leftDiv = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: unitVars.unit.gapPadding['200'],
  padding: `0 ${unitVars.unit.gapPadding['500']}`,
});

export const rightDiv = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `0 ${unitVars.unit.gapPadding['200']}`,
  width: '8rem',
  minHeight: '4.8rem',
});
