import { keyframes, style } from '@vanilla-extract/css';

import {
  interactionDurationMs,
  interactionEasing,
  type InteractionSpec,
} from '@styles/tokensV2/interaction/interaction.utils';

import { zIndex } from '@/shared/styles/tokens/zIndex';
import { colorVars } from '@/shared/styles/tokensV2/color.css';
import { fontVars } from '@/shared/styles/tokensV2/font.css';
import { unitVars } from '@/shared/styles/tokensV2/unit.css';

const tooltipFadeInInteraction = {
  trigger: 'afterDelay',
  action: 'motion.fadeIn',
  duration: 'base',
  easing: 'bezier.back',
  property: 'opacity',
} as const satisfies InteractionSpec;

const tooltipFadeInKeyframes = keyframes({
  from: {
    transform: 'translateX(-50%) scale(0.8)',
    opacity: 0,
  },
  to: {
    transform: 'translateX(-50%) scale(1)',
    opacity: 1,
  },
});

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const tooltip = style({
  position: 'absolute',
  zIndex: zIndex.button,
  bottom: 'calc(100% + 1.56rem)',
  left: '50%',
  transformOrigin: 'center center',
  animation: `${tooltipFadeInKeyframes} ${interactionDurationMs(tooltipFadeInInteraction)}ms ${interactionEasing(tooltipFadeInInteraction)} forwards`,
});

export const tooltipContent = style({
  display: 'flex',
  alignItems: 'center',
  borderRadius: unitVars.unit.radius.full,
  background: colorVars.color.fill.secondary,
  padding: `${unitVars.unit.gapPadding['100']} ${unitVars.unit.gapPadding['200']}`,
  width: '100%',
  minWidth: 'max-content',
  maxWidth: '27.7rem',
  whiteSpace: 'nowrap',
});

export const message = style({
  display: 'inline-flex',
  ...fontVars.font.caption_r_12,
  padding: unitVars.unit.gapPadding['100'],
  color: colorVars.color.text.inverse,
});

export const arrow = style({
  position: 'absolute',
  bottom: '-0.78rem',
  left: '50%',
  transform: 'translateX(-50%)',
  color: colorVars.color.fill.secondary,
});

export const arrowIcon = style({
  display: 'block',
  width: '100%',
  height: '100%',
});

export const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});
