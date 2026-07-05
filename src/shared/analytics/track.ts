/**
 * GA4 이벤트 전송 코어
 *
 * - `trackEvent`: 이벤트 1건 전송 (공통 파라미터 자동 주입)
 * - `trackCallback`: trackEvent 후 기존 onClick 콜백 실행
 */
import { logEvent } from 'firebase/analytics';

import { useUserStore } from '@store/useUserStore';

import type { GaEventName } from '@shared/analytics/events';
import {
  LOGIN_STATUS,
  type LoginStatus,
} from '@shared/analytics/params/global';
import type {
  AnalyticsParamValue,
  TrackEventParams,
} from '@shared/analytics/params/types';
import { analytics } from '@shared/config/firebase';

export type { LoginStatus, TrackEventParams } from '@shared/analytics/params';

/** VITE_ANALYTICS_ENV 값 (local / staging / production) */
export type AnalyticsEnvironment = 'local' | 'staging' | 'production';

/** Firebase Analytics 실제 전송 여부 (.env) */
const isAnalyticsEnabled =
  import.meta.env.VITE_ENABLE_FIREBASE_ANALYTICS === 'true';

/** analytics_environment 파라미터용 — 미설정 시 local */
const getAnalyticsEnvironment = (): AnalyticsEnvironment => {
  const env = import.meta.env.VITE_ANALYTICS_ENV;

  if (env === 'staging' || env === 'production' || env === 'local') {
    return env;
  }

  return 'local';
};

/** login_status 파라미터용 — zustand accessToken 기준 */
const getLoginStatus = (): LoginStatus => {
  const { accessToken } = useUserStore.getState();
  return accessToken ? LOGIN_STATUS.LOGGED_IN : LOGIN_STATUS.LOGGED_OUT;
};

/** page_path 파라미터용 */
const getPagePath = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.pathname;
};

/** 공통 파라미터 + 호출부 params 병합 (undefined 키 제거) */
const buildEventParams = (
  params?: TrackEventParams
): Record<string, AnalyticsParamValue> => {
  const merged: Record<string, AnalyticsParamValue | undefined> = {
    page_path: getPagePath(),
    login_status: getLoginStatus(),
    analytics_environment: getAnalyticsEnvironment(),
    ...params,
  };

  return Object.fromEntries(
    Object.entries(merged).filter(([, value]) => value !== undefined)
  ) as Record<string, AnalyticsParamValue>;
};

/**
 * GA4 이벤트 전송
 *
 * - `VITE_ENABLE_FIREBASE_ANALYTICS=true` → Firebase Analytics 전송
 * - `false` → 콘솔 로그만 (로컬 개발용)
 *
 * 공통 파라미터(`page_path`, `login_status`, `analytics_environment`)는 자동 주입됩니다.
 */
export const trackEvent = (
  eventName: GaEventName,
  params?: TrackEventParams
): void => {
  const eventParams = buildEventParams(params);

  if (!isAnalyticsEnabled) {
    console.info(
      `[Analytics:${getAnalyticsEnvironment()}]`,
      eventName,
      eventParams
    );
    return;
  }

  if (!analytics) {
    console.warn('[Analytics] analytics 인스턴스가 초기화되지 않았습니다.');
    return;
  }

  try {
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error('[Analytics] trackEvent error:', error);
  }
};

/**
 * `screen_name` 포함 trackEvent 후 기존 핸들러 실행
 *
 * @example
 * onClick={trackCallback(GA_EVENTS.component.TOP_NAV_LOGIN_CLICK, 'topNav', onLoginClick)}
 */
export const trackCallback = (
  eventName: GaEventName,
  screenName: string,
  callback?: () => void,
  params?: Omit<TrackEventParams, 'screen_name'>
) => {
  return () => {
    trackEvent(eventName, { screen_name: screenName, ...params });
    callback?.();
  };
};
