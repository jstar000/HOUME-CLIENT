import { recipe } from '@vanilla-extract/recipes';

import { transition } from '@styles/tokensV2/interaction/interaction.utils';

import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const likeButton = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'center center',
    transition: transition('transform', 'fastest', 'bezier.out'),
    border: 'none',
    borderRadius: unitVars.unit.radius.full,
    width: '6.8rem',
    height: '6.8rem',

    selectors: {
      '&:not(:disabled):active': {
        transform: 'scale(0.9)',
      },
    },
  },
  variants: {
    name: {
      like: { backgroundColor: colorVars.color.fill.primary },
      dislike: { backgroundColor: colorVars.color.fill.dimSecondary },
    },
  },
});
