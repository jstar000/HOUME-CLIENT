import { recipe } from '@vanilla-extract/recipes';
import { colorVars } from '@styles/tokens/color.css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const likeButton = recipe({
  base: {
    width: '12.8rem',
    height: '3.6rem',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.8rem',
    borderRadius: '0.6rem',
    ...fontStyle('body_m_14'),
    color: colorVars.color.gray800,
    backgroundColor: colorVars.color.gray100,
    transition: 'all 0.2s ease-in-out',
    border: 'none',
  },
  variants: {
    selected: {
      active: {
        ':active': {
          backgroundColor: colorVars.color.primary_light2,
          color: colorVars.color.primary,
        },
      },
      disabled: {
        backgroundColor: colorVars.color.gray300,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  defaultVariants: {
    selected: 'active',
  },
});
