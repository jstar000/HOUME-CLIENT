import { style, styleVariants } from '@vanilla-extract/css';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: unitVars.unit.radius.full,
  backgroundColor: colorVars.color.fill.weak,
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['200']}`,
  height: '3.6rem',
});

export const textWrapper = style({
  padding: unitVars.unit.gapPadding['100'],
});

export const text = styleVariants({
  primary: {
    ...fontVars.font.title_sb_16,
    color: colorVars.color.text.primary,
  },
  default: {
    ...fontVars.font.title_m_16,
    color: colorVars.color.text.tertiary,
  },
});
