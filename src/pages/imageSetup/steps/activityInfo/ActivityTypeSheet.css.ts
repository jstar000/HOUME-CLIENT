import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['500'],
  width: '100%',
});

export const radioList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['100'],
  width: '100%',
});

export const radioItem = style({
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 120ms ease',
  border: 'none',
  borderRadius: unitVars.unit.radius.full,
  backgroundColor: colorVars.color.fill.inverse,
  cursor: 'pointer',
  padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['400']}`,
  width: '100%',
  minWidth: '6.4rem',
  height: '4.4rem',
  font: 'inherit',
  selectors: {
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
});

export const radioItemSelected = style({
  backgroundColor: colorVars.color.fill.weak,
});

export const radioContents = style({
  display: 'flex',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['100'],
});

export const radioLabel = style({
  ...fontVars.font.body_r_14,
  color: colorVars.color.text.primary,
});

export const divider = style({
  borderRadius: '50%',
  backgroundColor: colorVars.color.text.tertiary,
  width: '0.6rem',
  height: '0.6rem',
});

export const requiredLabel = style({
  ...fontVars.font.body_r_14,
  color: colorVars.color.text.tertiary,
});
