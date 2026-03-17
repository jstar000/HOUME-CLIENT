import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: unitVars.unit.gapPadding[200],
    transition: 'transform 0.2s ease-in-out',
    borderRadius: unitVars.unit.radius.full,
    backgroundColor: colorVars.color.fill.tertiary,
    padding: unitVars.unit.gapPadding[200],
    width: '100%',
    height: '4.4rem',
  },
  variants: {
    state: {
      default: {},
      pressed: { transform: 'scale(0.98)' },
      focused: {},
      typing: {},
      typed: {},
    },
  },
});

export const textField = recipe({
  base: {
    flex: 1,
    // boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: colorVars.color.fill.tertiary,
    width: '100%',
    ...fontVars.font.body_r_14,
    maxWidth: '27.5rem',
    color: colorVars.color.text.tertiary,
  },
  variants: {
    state: {
      default: {},
      pressed: {},
      focused: {},
      typing: {
        color: colorVars.color.text.primary,
      },
      typed: {
        color: colorVars.color.text.primary,
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
