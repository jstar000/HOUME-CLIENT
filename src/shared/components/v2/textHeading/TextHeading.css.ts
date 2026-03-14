import { recipe } from '@vanilla-extract/recipes';

import { fontVars } from '@styles/tokensV2/font.css';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: unitVars.unit.gapPadding['000'],
    width: '100%',
  },
  variants: {
    type: {
      MAIN: { gap: unitVars.unit.gapPadding['200'] },
      SUB: { gap: unitVars.unit.gapPadding['050'] },
      'POPUP/MODAL': {
        alignItems: 'center',
        gap: unitVars.unit.gapPadding['200'],
      },
      BOTTOMSHEET: { gap: unitVars.unit.gapPadding['100'] },
    },
  },
});

export const title = recipe({
  base: {
    color: colorVars.color.text.primary,
  },
  variants: {
    type: {
      MAIN: { ...fontVars.font.title_sb_20 },
      SUB: {
        ...fontVars.font.title_sb_16,
        color: colorVars.color.text.secondary,
      },
      'POPUP/MODAL': { ...fontVars.font.title_sb_18 },
      BOTTOMSHEET: { ...fontVars.font.title_sb_18 },
    },
  },
});

export const caption = recipe({
  base: {
    ...fontVars.font.body_r_14,
    color: colorVars.color.text.secondary,
  },

  variants: {
    type: {
      MAIN: {},
      SUB: {
        ...fontVars.font.body_r_13,
        color: colorVars.color.text.tertiary,
      },
      'POPUP/MODAL': {},
      BOTTOMSHEET: {},
    },
  },
});
