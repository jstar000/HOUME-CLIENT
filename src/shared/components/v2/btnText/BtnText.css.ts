import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: unitVars.unit.gapPadding['000'],
    transition: 'transform 100ms ease',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    selectors: {
      '&:active': {
        transform: 'scale(0.95)',
      },
    },
  },
  variants: {
    color: {
      primary: {
        color: colorVars.color.text.primary,
      },
      secondary: {
        // 위계 구분 표현으로 secondary 사용, 실제 폰트 컬러는 tertiary
        color: colorVars.color.text.tertiary,
      },
      inverse: {
        color: colorVars.color.text.inverse,
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const text = recipe({
  base: {
    padding: `${unitVars.unit.gapPadding['000']} 0.38rem`,
    textAlign: 'center',
    lineHeight: '150%',
    letterSpacing: '-0.0266rem',
    fontFamily: fontVars.font.family.pretendard,
    fontWeight: 400,
    fontStyle: 'normal',
  },
  variants: {
    size: {
      s: {
        fontSize: '1.33rem',
      },
      m: {
        fontSize: '1.425rem',
      },
    },
  },
});

export const iconSlot = recipe({
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    size: {
      s: { width: '1.52rem', height: '1.52rem' },
      m: { width: '1.9rem', height: '1.9rem' },
    },
  },
});
