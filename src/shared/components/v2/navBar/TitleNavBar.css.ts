import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

import { zIndex } from '@/shared/styles/tokens/zIndex';

export const container = style({
  position: 'sticky',
  zIndex: zIndex.navBar,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: colorVars.color.bg.primary,
  paddingRight: unitVars.unit.gapPadding['400'],
  paddingLeft: unitVars.unit.gapPadding['400'],
  width: '100%',
  minWidth: unitVars.unit.dimension.wMin,
  maxWidth: unitVars.unit.dimension.wMax,
  height: '4.8rem',
});

export const leftSlot = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingRight: unitVars.unit.gapPadding['300'],
});

export const rightSlot = style({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingLeft: unitVars.unit.gapPadding['400'],
});

export const label = style({
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['100']}`,
});

export const title = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: 0,
  pointerEvents: 'none',
  maxWidth: '70%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: colorVars.color.text.primary,
  ...fontVars.font.title_m_16,
});
