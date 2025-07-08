import { recipe } from '@vanilla-extract/recipes';
import { colorVars } from '@styles/tokens/color.css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const CtaButton = recipe({
  base: {
    width: '28rem',
    height: '5.9rem',
    padding: '1.7rem 11rem',
    textAlign: 'center',
    alignItems: 'center',
    gap: '2rem',
    borderRadius: '99.9rem',
    ...fontStyle('title_m_16'),
    color: colorVars.color.gray000,
    transition: 'all 0.2s ease-in-out',
    border: 'none',
  },
  variants: {
    state: {
      active: {
        backgroundColor: colorVars.color.primary,
        ':active': {
          backgroundColor: colorVars.color.primary_dark,
        },
      },
      disabled: {
        backgroundColor: colorVars.color.gray300,
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {
    state: 'active',
  },
});
