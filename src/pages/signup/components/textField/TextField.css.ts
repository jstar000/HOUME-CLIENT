import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const input = recipe({
  base: {
    flex: 1,
    outline: 'none',
    paddingInline: unitVars.unit.gapPadding['200'],
    ...fontVars.font.body_r_14,
    minWidth: 0,
    color: colorVars.color.text.primary,
    selectors: {
      '&::placeholder': {
        color: colorVars.color.text.tertiary,
      },
    },
  },
  variants: {
    isErrorText: {
      false: {},
      true: {
        caretColor: colorVars.color.text.primary,
        color: colorVars.color.text.danger,
      },
    },
  },
});
