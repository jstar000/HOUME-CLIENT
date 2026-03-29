import { style } from '@vanilla-extract/css';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: unitVars.unit.gapPadding['200'],
  padding: unitVars.unit.gapPadding['000'],
  width: '100%',
});

export const textContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const headingTexxt = style({
  display: 'flex',
  ...fontVars.font.title_sb_15,
  padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['100']}`,
  color: colorVars.color.text.primary,
});

export const imgContainer = style({
  aspectRatio: '166 / 111',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  transition: 'transform 100ms ease',
  border: 0,
  borderRadius: unitVars.unit.radius['300'],
  width: '100%',
  height: '22.4rem',
  overflow: 'hidden',
});

export const cardImg = style({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const listCardContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: unitVars.unit.gapPadding['200'],
  padding: `${unitVars.unit.gapPadding['100']} ${unitVars.unit.gapPadding['000']}`,
  width: '100%',

  overflowX: 'auto',
  scrollbarWidth: 'none',
  whiteSpace: 'nowrap',
  msOverflowStyle: 'none',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
