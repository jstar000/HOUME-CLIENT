import { recipe } from '@vanilla-extract/recipes';

export const btnIcon = recipe({
  variants: {
    disabled: {
      true: { opacity: 0.2, cursor: 'not-allowed' },
    },
    status: {
      DEFAULT: {},
      PRESSED: { scale: 0.95 },
    },
  },
});
