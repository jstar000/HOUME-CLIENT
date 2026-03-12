import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import { fontVars } from '@styles/tokensV2/font.css';

import { unitVars } from '@/shared/styles/tokensV2/unit.css';

const heightStyles: Record<
  '56' | '44' | '40' | '32' | '26',
  {
    height: string;
    padding: string;
    font: typeof fontVars.font.title_m_16;
    pressedScale: string;
  }
> = {
  56: {
    height: '56px',
    padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['500']}`,
    font: fontVars.font.title_m_16,
    pressedScale: '0.98',
  },
  44: {
    height: '44px',
    padding: '0 2rem',
    font: fontVars.font.body_m_14,
    pressedScale: '0.95',
  },
  40: {
    height: '40px',
    padding: '0 1.6rem',
    font: fontVars.font.body_m_14,
    pressedScale: '0.95',
  },
  32: {
    height: '32px',
    padding: '0 1.2rem',
    font: fontVars.font.caption_m_12,
    pressedScale: '0.95',
  },
  26: {
    height: '26px',
    padding: '0 1rem',
    font: fontVars.font.caption_r_11,
    pressedScale: '0.95',
  },
};

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
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
      fill: {
        background: colorVars.color.fill.primary,
      },
      outline: {
        border: `1px solid ${colorVars.color.border.primary}`,
        background: colorVars.color.fill.inverse,
      },
    },
    color: {
      primary: {},
      inverse: {},
    },
    height: {
      56: {
        ...heightStyles['56'].font,
        padding: heightStyles['56'].padding,
        minWidth: '12.1rem',
        height: heightStyles['56'].height,
      },
      44: {
        ...heightStyles['44'].font,
        padding: heightStyles['44'].padding,
        minWidth: '8rem',
        height: heightStyles['44'].height,
      },
      40: {
        ...heightStyles['40'].font,
        padding: heightStyles['40'].padding,
        minWidth: '8rem',
        height: heightStyles['40'].height,
      },
      32: {
        ...heightStyles['32'].font,
        padding: heightStyles['32'].padding,
        minWidth: '6rem',
        height: heightStyles['32'].height,
      },
      26: {
        ...heightStyles['26'].font,
        padding: heightStyles['26'].padding,
        minWidth: '5rem',
        height: heightStyles['26'].height,
      },
    },
    hasIcon: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { style: 'fill', color: 'primary' },
      style: {
        background: colorVars.color.gray900,
        color: colorVars.color.gray000,
        ':active': {
          background: colorVars.color.gray800,
        },
      },
    },
    {
      variants: { style: 'fill', color: 'inverse' },
      style: {
        background: colorVars.color.gray000,
        color: colorVars.color.gray900,
        ':active': {
          background: colorVars.color.gray050,
        },
      },
    },
    {
      variants: { style: 'outline', color: 'primary' },
      style: {
        border: `1px solid ${colorVars.color.gray900}`,
        color: colorVars.color.gray900,
        ':active': {
          borderColor: colorVars.color.gray800,
          background: colorVars.color.gray050,
        },
      },
    },
    {
      variants: { style: 'outline', color: 'inverse' },
      style: {
        border: `1px solid ${colorVars.color.gray300}`,
        color: colorVars.color.gray900,
        ':active': {
          background: colorVars.color.gray050,
        },
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
