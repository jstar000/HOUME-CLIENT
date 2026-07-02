import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * 디자인 토큰 V2 - Interaction
 *
 * Figma InteractionToken 스코프
 * - duration: 애니메이션 전체 소요 시간
 * - easing: 애니메이션 속도 변화 곡선 (cubic-bezier)
 * - trigger: 인터랙션 시작 조건 (식별자)
 * - action: 인터랙션 결과 동작 (식별자)
 */
export const interactionVars = createGlobalTheme(':root', {
  interaction: {
    duration: {
      instant: '0ms',
      fastest: '150ms',
      fast: '250ms',
      base: '400ms',
      slow: '600ms',
      slower: '800ms',
      slowest: '1200ms',
    },
    easing: {
      'bezier.out': 'cubic-bezier(0, 0.56, 0.33, 1)',
      'bezier.inout': 'cubic-bezier(0.59, 0.14, 0.38, 1)',
      'bezier.back': 'cubic-bezier(0.25, 1.45, 0.65, 1.03)',
    },
    trigger: {
      tap: 'tap',
      whilePressing: 'whilePressing',
      mouseUp: 'mouseUp',
      afterDelay: 'afterDelay',
    },
    action: {
      stateChange: 'stateChange',
      'motion.fadeIn': 'motion.fadeIn',
      'motion.fadeOut': 'motion.fadeOut',
      'motion.slideIn': 'motion.slideIn',
      'motion.slideOut': 'motion.slideOut',
      'motion.move': 'motion.move',
    },
  },
});
