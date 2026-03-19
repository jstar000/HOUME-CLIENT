import { style } from '@vanilla-extract/css';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';

import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: unitVars.unit.gapPadding['100'],
  border: 'none',
  borderRadius: unitVars.unit.radius['full'],
  background: `rgba(255, 255, 255, 0.10)`,
  cursor: 'pointer',
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['400']}`,
  ...fontVars.font.title_sb_15,
  width: 'auto',
  minWidth: '6.4rem',
  height: '4.4rem',
  whiteSpace: 'nowrap',
  color: colorVars.color.text.inverse,
  selectors: {
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
});

export const buttonWrapper = style({
  display: 'inline-flex',
});
