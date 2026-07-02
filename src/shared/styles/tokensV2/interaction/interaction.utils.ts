import { interactionVars } from '@styles/tokensV2/interaction/interaction.css';

export type InteractionDuration =
  keyof typeof interactionVars.interaction.duration;

export type InteractionEasing = keyof typeof interactionVars.interaction.easing;

export type InteractionTrigger =
  keyof typeof interactionVars.interaction.trigger;

export type InteractionAction = keyof typeof interactionVars.interaction.action;

/**
 * CSS transition 단일 속성 문자열 생성
 *
 * @example
 * transition('opacity', 'base', 'bezier.out')
 * // => 'opacity 400ms cubic-bezier(0, 0.56, 0.33, 1)'
 *
 * @example
 * [transition('opacity'), transition('transform')].join(', ')
 */
export const transition = (
  property: string,
  duration: InteractionDuration = 'base',
  easing: InteractionEasing = 'bezier.out'
): string =>
  `${property} ${interactionVars.interaction.duration[duration]} ${interactionVars.interaction.easing[easing]}`;
