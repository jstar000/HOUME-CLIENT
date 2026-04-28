import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const dateRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: unitVars.unit.gapPadding['200'],
  width: '100%',
});

export const inputContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '6.3rem',
});

export const fieldBox = recipe({
  base: {
    position: 'relative',
  },
  variants: {
    size: {
      year: { width: '3.5rem' },
      month: { width: '2.2rem' },
      day: { width: '2rem' },
    },
  },
});

export const fakePlaceholder = recipe({
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    color: colorVars.color.text.tertiary,
    ...fontVars.font.body_r_14,
  },
  variants: {
    isErrorText: {
      false: {},
      true: {
        color: colorVars.color.text.danger,
      },
    },
  },
});

export const dateInput = recipe({
  base: {
    outline: 'none',
    background: 'transparent',
    width: '100%',
    minWidth: 0,
    textAlign: 'left',
    color: colorVars.color.text.primary,
    ...fontVars.font.body_r_14,

    selectors: {
      '&::placeholder': {
        color: 'transparent',
      },
    },
  },
  variants: {
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
    },
    isErrorText: {
      false: {},
      true: {
        caretColor: colorVars.color.text.primary,
        color: colorVars.color.text.danger,
      },
    },
  },
});

export const divider = style({
  flexShrink: 0,
  width: '0.1rem',
  height: '1.2rem',
  color: colorVars.color.border.primary,
});
