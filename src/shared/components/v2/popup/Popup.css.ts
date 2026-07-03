import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colorVars } from '@styles/tokensV2/color.css';
import {
  interactionDurationMs,
  interactionEasing,
  type InteractionSpec,
} from '@styles/tokensV2/interaction/interaction.utils';

import { zIndex } from '@/shared/styles/tokens/zIndex';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

const popupFadeInInteraction = {
  trigger: 'tap',
  action: 'motion.fadeIn',
  duration: 'fast',
  easing: 'bezier.back',
  property: 'opacity',
} as const satisfies InteractionSpec;

const popupFadeInMs = interactionDurationMs(popupFadeInInteraction);
const popupFadeInEasing = interactionEasing(popupFadeInInteraction);

const backdropFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const containerFadeIn = keyframes({
  from: {
    transform: 'translate(-50%, -50%) scale(0.9)',
    opacity: 0,
  },
  to: {
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: 1,
  },
});

export const viewportLayer = style({
  position: 'fixed',
  zIndex: zIndex.popup,
  top: 0,
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  minWidth: unitVars.unit.dimension.wMin,
  maxWidth: unitVars.unit.dimension.wMax,
  overflow: 'hidden',
  overscrollBehavior: 'none',
});

export const backdrop = style({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.2)',
  animation: `${backdropFadeIn} ${popupFadeInMs}ms ${popupFadeInEasing} forwards`,
});

export const container = style({
  position: 'absolute',
  zIndex: zIndex.popup + 1,
  top: '50%',
  left: '50%',
  transformOrigin: 'center center',
  borderRadius: unitVars.unit.radius['700'],
  backgroundColor: colorVars.color.gray000,
  width: '24rem',
  overflow: 'hidden',
  animation: `${containerFadeIn} ${popupFadeInMs}ms ${popupFadeInEasing} forwards`,
});

export const closeButton = style({
  position: 'absolute',
  zIndex: zIndex.sticky,
  top: '0rem',
  right: '0rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: unitVars.unit.gapPadding['300'],
});

export const contentArea = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  variants: {
    btnStyle: {
      text: {
        padding: unitVars.unit.gapPadding['700'],
      },
      solid: {
        // padding: `${unitVars.unit.gapPadding['000']} ${unitVars.unit.gapPadding['500']} ${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['500']}`,
        // 디자인 논의 후 제거 혹은 수정 예정
        padding: unitVars.unit.gapPadding['000'],
      },
    },
  },
  defaultVariants: {
    btnStyle: 'solid',
  },
});

export const slotBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: unitVars.unit.gapPadding['400'],
  minHeight: '7.2rem',
  textAlign: 'center',
});

export const body = style({
  width: '100%',
  textAlign: 'center',
});

export const buttonArea = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    btnStyle: {
      text: {
        borderTop: '0.1rem solid ' + colorVars.color.border.tertiary,
        width: '100%',
        height: '5.2rem',
      },
      solid: {
        alignItems: 'center',
        gap: '0.8rem',
        padding: `${unitVars.unit.gapPadding['200']} ${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['400']} ${unitVars.unit.gapPadding['400']}`,
        width: '100%',
      },
    },
  },
  defaultVariants: {
    btnStyle: 'solid',
  },
});

export const sideIconButton = style({
  flexShrink: 0,
});

export const primaryButtonWrap = style({
  display: 'flex',
  flex: '1 1 0',
  minWidth: 0,
});

export const textButton = recipe({
  base: {
    display: 'flex',
    flex: '1 1 0',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    padding: '1.2rem 0',
  },
  variants: {
    role: {
      weak: {
        ...fontVars.font.body_r_14,
        color: colorVars.color.text.tertiary,
        selectors: {
          '&:not(:only-child)': {
            borderRight: '1px solid ' + colorVars.color.border.tertiary,
          },
        },
      },
      strong: {
        ...fontVars.font.body_m_14,
        color: colorVars.color.text.primary,
      },
    },
    layout: {
      single: {
        flex: '1 1 auto',
        width: '100%',
      },
      paired: {},
    },
  },
  defaultVariants: {
    role: 'strong',
    layout: 'paired',
  },
});
