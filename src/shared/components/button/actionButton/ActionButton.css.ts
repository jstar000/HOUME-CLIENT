import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';

import { unitVars } from '@/shared/styles/tokensV2/unit.css';

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: unitVars.unit.gapPadding['000'],
    transformOrigin: 'center center',
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  variants: {
    kind: {
      /** 1. round / fill / 56 / primary */
      cta: {
        borderRadius: unitVars.unit.radius['full'],
        background: colorVars.color.fill.primary,
        padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['500']}`,
        width: '33.5rem',
        height: '5.6rem',
        color: colorVars.color.text.inverse,
        ...fontVars.font.title_m_16,
        ':active': { transform: 'scale(0.98)' },
      },
      /** 2. round / outline / 56 / primary */
      ctaOutline: {
        border: `1px solid ${colorVars.color.border.primary}`,
        borderRadius: unitVars.unit.radius['full'],
        background: 'transparent',
        padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['500']}`,
        width: '33.5rem',
        height: '5.6rem',
        color: colorVars.color.text.primary,
        ...fontVars.font.title_m_16,
        ':active': { transform: 'scale(0.98)' },
      },
      /** 3. round / fill / 44 / inverse */
      pillLight: {
        borderRadius: unitVars.unit.radius['full'],
        background: colorVars.color.fill.inverse,
        padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['400']}`,
        width: 'auto',
        height: '4.4rem',
        color: colorVars.color.text.primary,
        ...fontVars.font.title_sb_15,
        ':active': { transform: 'scale(0.95)' },
      },
      /** 4. round / fill / 40 / primary */
      pillDark: {
        borderRadius: unitVars.unit.radius['full'],
        background: colorVars.color.fill.primary,
        padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['300']}`,
        width: 'auto',
        height: '4rem',
        color: colorVars.color.text.inverse,
        ...fontVars.font.title_sb_14,
        ':active': { transform: 'scale(0.95)' },
      },
      /** 5. square / outline / 32 / inverse */
      labelSquare: {
        border: `1px solid ${colorVars.color.border.primary}`,
        borderRadius: unitVars.unit.radius['200'],
        background: colorVars.color.fill.inverse,
        padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['300']}`,
        width: 'auto',
        height: '3.2rem',
        color: colorVars.color.text.primary,
        ...fontVars.font.body_m_13,
        ':active': { transform: 'scale(0.95)' },
      },
      /** 6. round / fill / 26 / inverse */
      labelRound: {
        borderRadius: unitVars.unit.radius['full'],
        background: colorVars.color.fill.inverse,
        padding: unitVars.unit.gapPadding['100'],
        width: 'auto',
        height: '2.6rem',
        color: colorVars.color.text.primary,
        ...fontVars.font.caption_r_11,
        ':active': { transform: 'scale(0.95)' },
      },
      /** 7. ghost */
      pillGhost: {
        borderRadius: unitVars.unit.radius['full'],
        background: 'rgba(255, 255, 255, 0.1)',
        padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['400']}`,
        width: 'auto',
        height: '4.4rem',
        textAlign: 'center',
        color: colorVars.color.text.inverse,
        ...fontVars.font.title_sb_15,
        ':active': { transform: 'scale(0.95)' },
      },
    },
  },
  defaultVariants: {
    kind: 'cta',
  },
});

export const buttonWrapper = style({
  display: 'inline-flex',
});

export const iconSlot = style({
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  color: 'currentColor',
});
