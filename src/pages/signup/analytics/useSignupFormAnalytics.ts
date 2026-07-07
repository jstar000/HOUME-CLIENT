import { useCallback, useEffect, useRef } from 'react';

import {
  getSignupStep,
  trackSignupBrowserBackClick,
  trackSignupBrowserBackSwipe,
  trackSignupErrorBirthIncorrectView,
  trackSignupErrorBirthUnder14View,
  trackSignupErrorNickNumView,
  trackSignupErrorNickSignView,
} from '@pages/signup/analytics/signupFormAnalytics';

import { GA_EVENTS } from '@shared/analytics/events';
import { useAnalyticsPageView } from '@shared/analytics/hooks';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { getLoginSocialParams } from '@shared/analytics/utils/loginEntryRoute';

/** iOS 뒤로가기 제스처 휴리스틱 — 화면 왼쪽 가장자리에서 오른쪽으로 스와이프 */
const SWIPE_START_MAX_X = 50;
const SWIPE_MIN_DELTA_X = 80;
const SWIPE_MAX_DELTA_Y = 50;

interface UseSignupFormAnalyticsOptions {
  enabled: boolean;
  isNameSectionValid: boolean;
  isNameSubmitted: boolean;
  isBirthSectionValid: boolean;
  isNameFormatInvalid: boolean;
  isNameLengthInvalid: boolean;
  yearFormatError: boolean;
  yearAgeError: boolean;
  monthFieldError: boolean;
  dayFieldError: boolean;
}

/**
 * 회원가입 폼 GA — page_view, 에러 view, 브라우저 뒤로가기(click/swipe) 전송.
 * `signupStep`·`trackBrowserBackPop`은 SignupPage history guard에 연결.
 */
export const useSignupFormAnalytics = ({
  enabled,
  isNameSectionValid,
  isNameSubmitted,
  isBirthSectionValid,
  isNameFormatInvalid,
  isNameLengthInvalid,
  yearFormatError,
  yearAgeError,
  monthFieldError,
  dayFieldError,
}: UseSignupFormAnalyticsOptions) => {
  /** touchend 직후 POP이 오면 swipe, 아니면 click으로 분기 */
  const backGestureRef = useRef<'click' | 'swipe' | null>(null);
  /** blocker 재평가·revert popstate 등으로 POP 트래킹이 중복 호출되는 것 방지 */
  const lastPopTrackAtRef = useRef(0);
  /** 동일 에러 메시지 view 이벤트 중복 전송 방지 */
  const trackedErrorsRef = useRef(new Set<string>());

  const signupStep = getSignupStep({
    isNameSectionValid,
    isNameSubmitted,
    isBirthSectionValid,
  });
  const signupStepRef = useRef(signupStep);
  signupStepRef.current = signupStep;

  useAnalyticsPageView(
    GA_EVENTS.signupForm.PAGE_VIEW,
    SCREEN_NAME.SIGNUP_FORM,
    getLoginSocialParams(),
    { enabled }
  );

  useEffect(() => {
    if (!enabled) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;

      // iOS 네이티브 뒤로가기 제스처는 touchend 전에 POP이 발생할 수 있음
      if (touch.clientX <= SWIPE_START_MAX_X) {
        backGestureRef.current = 'swipe';
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX;
      const deltaY = Math.abs(touch.clientY - touchStartY);

      if (
        touchStartX <= SWIPE_START_MAX_X &&
        deltaX >= SWIPE_MIN_DELTA_X &&
        deltaY <= SWIPE_MAX_DELTA_Y
      ) {
        backGestureRef.current = 'swipe';
        return;
      }

      if (backGestureRef.current === 'swipe' && deltaX < SWIPE_MIN_DELTA_X) {
        backGestureRef.current = null;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !isNameFormatInvalid) return;
    if (trackedErrorsRef.current.has('nickSign')) return;

    trackedErrorsRef.current.add('nickSign');
    trackSignupErrorNickSignView();
  }, [enabled, isNameFormatInvalid]);

  useEffect(() => {
    if (!enabled || !isNameLengthInvalid) return;
    if (trackedErrorsRef.current.has('nickNum')) return;

    trackedErrorsRef.current.add('nickNum');
    trackSignupErrorNickNumView();
  }, [enabled, isNameLengthInvalid]);

  useEffect(() => {
    if (!enabled || !yearAgeError) return;
    if (trackedErrorsRef.current.has('birthUnder14')) return;

    trackedErrorsRef.current.add('birthUnder14');
    trackSignupErrorBirthUnder14View();
  }, [enabled, yearAgeError]);

  // 만 14세 미만 에러가 우선 — 동시에 birthIncorrect view는 보내지 않음
  useEffect(() => {
    if (!enabled || yearAgeError) return;

    const hasBirthFormatError =
      yearFormatError || monthFieldError || dayFieldError;
    if (!hasBirthFormatError) return;
    if (trackedErrorsRef.current.has('birthIncorrect')) return;

    trackedErrorsRef.current.add('birthIncorrect');
    trackSignupErrorBirthIncorrectView();
  }, [dayFieldError, enabled, monthFieldError, yearAgeError, yearFormatError]);

  /** history guard에서 브라우저 뒤로가기·스와이프 시도 시 호출 */
  const trackBrowserBackPop = useCallback(() => {
    const now = Date.now();
    if (now - lastPopTrackAtRef.current < 100) return;
    lastPopTrackAtRef.current = now;

    const gesture = backGestureRef.current ?? 'click';
    backGestureRef.current = null;
    const step = signupStepRef.current;

    if (gesture === 'swipe') {
      trackSignupBrowserBackSwipe(step);
      return;
    }

    trackSignupBrowserBackClick(step);
  }, []);

  return {
    signupStep,
    trackBrowserBackPop,
  };
};
