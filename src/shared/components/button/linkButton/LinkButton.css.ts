import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fontStyle } from '@/shared/styles/fontStyle';

import { colorVars } from '@styles/tokens/color.css';

export const linkButton = recipe({
  base: {
    height: '3rem',
    padding: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '999px',

    transition: 'all 0.2s ease-in-out',
    border: `1px solid ${colorVars.color.gray300}`,
    backgroundColor: colorVars.color.gray000,

    ':active': {
      backgroundColor: colorVars.color.gray000,
    },
  },
  variants: {
    type: {
      withText: {
        width: '6.1rem',
        height: '2.6rem',
        padding: '0.3rem 0.5rem',
        gap: 0,
        whiteSpace: 'nowrap',
        ...fontStyle('caption_r_11'),
        color: colorVars.color.gray700,
        selectors: {
          '& svg': {
            width: '1.4rem',
            height: '1.4rem',
            flex: '0 0 1.6rem',
            padding: '0.1rem',
          },
        },
      },
      onlyIcon: {
        width: '3rem',
      },
    },
  },
  defaultVariants: {
    type: 'withText',
  },
});

export const linkLabel = style({
  width: '3.3rem',
  lineHeight: '1.1rem',
  textAlign: 'center',
  flex: '0 0 3.3rem',
});
