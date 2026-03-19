import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

const base = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 100ms ease',
  border: 0,
  borderRadius: unitVars.unit.radius['600'],
  width: '100%',
  height: '4.8rem',
  ...fontVars.font.title_m_16,
  selectors: {
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
});

export const primary = style([
  base,
  {
    backgroundColor: colorVars.color.fill.strong,
    color: colorVars.color.text.inverse,
  },
]);

export const secondary = style([
  base,
  {
    backgroundColor: colorVars.color.fill.tertiary,
    color: colorVars.color.text.primary,
  },
]);
