import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';

import { unitVars } from '@/shared/styles/tokensV2/unit.css';

const heightVariantStyles = {
  56: {
    ...fontVars.font.title_m_16,
    padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['500']}`,
    minWidth: '12.1rem',
    width: '33.5rem',
    height: '5.6rem',
  },
  44: {
    ...fontVars.font.title_sb_15,
    padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['400']}`,
    minWidth: '8rem',
    width: 'auto',
    height: '4.4rem',
  },
  40: {
    ...fontVars.font.title_sb_14,
    padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['300']}`,
    minWidth: '8rem',
    width: 'auto',
    height: '4rem',
  },
  32: {
    ...fontVars.font.body_m_13,
    padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['300']}`,
    minWidth: '6rem',
    width: 'auto',
    height: '3.2rem',
  },
  26: {
    ...fontVars.font.caption_r_11,
    padding: unitVars.unit.gapPadding['100'],
    minWidth: '5rem',
    width: 'auto',
    height: '2.6rem',
  },
} as const;

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
    shape: {
      round: {
        borderRadius: unitVars.unit.radius['full'],
      },
      square: {
        borderRadius: unitVars.unit.radius['200'],
      },
    },
    style: {
      fill: {},
      outline: {
        border: `1px solid ${colorVars.color.border.primary}`,
      },
    },
    color: {
      primary: {
        background: colorVars.color.fill.primary,
        color: colorVars.color.text.inverse,
      },
      inverse: {
        background: colorVars.color.fill.inverse,
        color: colorVars.color.text.primary,
      },
    },
    height: heightVariantStyles,
    hasIcon: {
      true: {},
      false: {},
    },
  },
  /**
   * 버튼 디자인 조합 (총 6종만 사용)
   * 1. round / fill / 56 / primary
   * 2. round / outline / 56 / primary
   * 3. round / fill / 44 / inverse
   * 4. round / fill / 40 / primary
   * 5. square / outline / 32 / inverse
   * 6. round / fill / 26 / inverse
   */
  compoundVariants: [
    {
      variants: { style: 'fill', color: 'primary' },
      style: {
        background: colorVars.color.fill.primary,
        color: colorVars.color.text.inverse,
      },
    },
    {
      variants: { style: 'fill', color: 'inverse' },
      style: {
        background: colorVars.color.fill.inverse,
        color: colorVars.color.text.primary,
      },
    },
    {
      variants: { style: 'outline', color: 'inverse' },
      style: {
        border: `1px solid ${colorVars.color.border.primary}`,
        background: colorVars.color.fill.inverse,
        color: colorVars.color.text.primary,
      },
    },
  ],
  defaultVariants: {
    shape: 'round',
    style: 'fill',
    color: 'primary',
    height: 56,
    hasIcon: false,
  },
});

/** wrapper: pressed scale는 globalStyle로 자식 button에 적용 (VE는 & 자식 선택자 불가) */
export const buttonWrapper = style({
  display: 'inline-flex',
  transformOrigin: 'center center',
});

globalStyle(`${buttonWrapper} button[data-height="56"]:active`, {
  transform: 'scale(0.98)',
});
globalStyle(
  `${buttonWrapper} button[data-height="44"]:active, ${buttonWrapper} button[data-height="40"]:active, ${buttonWrapper} button[data-height="32"]:active, ${buttonWrapper} button[data-height="26"]:active`,
  {
    transform: 'scale(0.95)',
  }
);

export const iconSlot = style({
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.6rem',
  height: '1.6rem',
  color: 'currentColor',
});

globalStyle(`${iconSlot} svg`, {
  fill: 'currentColor',
  stroke: 'currentColor',
});

export const iconSvg = style({
  width: '1.4rem',
  height: '1.4rem',
});
