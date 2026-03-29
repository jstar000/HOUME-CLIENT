import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
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
});

/** TextButton 레이아웃만 보정 (타이포·컬러·인터랙션은 TextButton 기본) */
export const backButton = style({
  paddingTop: unitVars.unit.gapPadding['000'],
  paddingRight: unitVars.unit.gapPadding['100'],
  paddingBottom: unitVars.unit.gapPadding['000'],
  paddingLeft: unitVars.unit.gapPadding['000'],
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
