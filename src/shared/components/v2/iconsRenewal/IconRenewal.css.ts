import { styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const iconSize = styleVariants({
  '12': { width: '12px', height: '12px' },
  '14': { width: '14px', height: '14px' },
  '16': { width: '16px', height: '16px' },
  '20': { width: '20px', height: '20px' },
  '24': { width: '24px', height: '24px' },
  '32': { width: '32px', height: '32px' },
  '40': { width: '40px', height: '40px' },
});

export const btnIcon = recipe({
  base: {
    padding: unitVars.unit.gapPadding[100],
  },
  variants: {
    disabled: {
      true: { opacity: 0.2, cursor: 'not-allowed' },
    },
    status: {
      DEFAULT: {},
      PRESSED: { transform: 'scale(0.95)' },
    },
    size: {
      S: {},
      M: { padding: unitVars.unit.gapPadding[200] },
      L: {},
      XL: {},
    },
  },
});
