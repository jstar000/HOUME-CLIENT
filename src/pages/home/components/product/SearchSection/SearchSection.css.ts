import { style } from '@vanilla-extract/css';

import { zIndex } from '@styles/tokens/zIndex';
import { colorVars } from '@styles/tokensV2/color.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const section = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '100%',
});

export const searchHeader = style({
  boxSizing: 'border-box',
  position: 'sticky',
  zIndex: zIndex.sticky - 1,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: colorVars.color.bg.primary,
  padding: `${unitVars.unit.gapPadding['100']} ${unitVars.unit.gapPadding['000']}`,
  width: '100%',
});

export const searchBarContainer = style({
  boxSizing: 'border-box',
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
});

export const filterList = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
});

export const productList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: unitVars.unit.gapPadding['200'],
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
  width: '100%',
});
