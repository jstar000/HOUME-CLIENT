import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

const PRODUCT_BOTTOM_SHEET_COLLAPSED_HEIGHT = '24rem';

export const container = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  paddingBottom: PRODUCT_BOTTOM_SHEET_COLLAPSED_HEIGHT,
  width: '100%',
  minWidth: unitVars.unit.dimension.wMin,
  maxWidth: unitVars.unit.dimension.wMax,
});

export const filterSheetTitle = style({
  color: colorVars.color.text.primary,
  ...fontVars.font.title_m_16,
});
