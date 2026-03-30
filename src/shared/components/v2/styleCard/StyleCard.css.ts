import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';
import { unitVars } from '@styles/tokensV2/unit.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
});

export const card = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'flex-start',
    transition: 'transform 100ms ease',
    border: 0,
    cursor: 'pointer',
    overflow: 'hidden',
  },
  variants: {
    size: {
      s: {
        aspectRatio: '164 / 111',
        borderRadius: unitVars.unit.radius['500'],
        padding: unitVars.unit.gapPadding['300'],
        width: '100%',
      },
      L: {
        aspectRatio: '4 / 3',
        borderRadius: unitVars.unit.radius['300'],
        padding: unitVars.unit.gapPadding['400'],
        width: '100%',
      },
    },
    scaleOnPress: {
      true: {
        selectors: {
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    size: 's',
    scaleOnPress: true,
  },
});

export const gradient = recipe({
  base: {
    position: 'absolute',
    zIndex: 0,
    inset: 0,
  },
  variants: {
    size: {
      s: {
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 39.71%, rgba(0, 0, 0, 0) 100%)',
      },
      L: {
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.62) 100%)',
      },
    },
  },
  defaultVariants: {
    size: 's',
  },
});

export const image = style({
  position: 'absolute',
  zIndex: 0,
  inset: 0,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export const starIcon = recipe({
  base: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 0,
  },
  variants: {
    size: {
      s: {
        width: '1.6rem',
        height: '1.6rem',
      },
      L: {
        width: '2rem',
        height: '2rem',
      },
    },
  },
  defaultVariants: {
    size: 's',
  },
});

/** 카드 하단에 두 줄까지 (L 전용) */
export const titleOverlay = style({
  position: 'absolute',
  zIndex: 2,
  right: unitVars.unit.gapPadding['400'],
  bottom: unitVars.unit.gapPadding['400'],
  left: unitVars.unit.gapPadding['400'],
  display: '-webkit-box',
  margin: 0,
  overflow: 'hidden',
  textAlign: 'left',
  textShadow: `0 0.1rem 0.4rem ${colorVars.color.gray999_a50}`,
  textOverflow: 'ellipsis',
  color: colorVars.color.text.inverse,
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  ...fontVars.font.title_m_16,
});

export const title = recipe({
  base: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: colorVars.color.text.secondary,
  },
  variants: {
    size: {
      s: {
        ...fontVars.font.body_r_14,
        padding: unitVars.unit.gapPadding['100'],
      },
    },
  },
  defaultVariants: {
    size: 's',
  },
});
