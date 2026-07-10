/**
 * GA4 이벤트 전송 코어
 *
 * - `trackEvent`: 호출부 params를 콘솔에 그대로 로그 (`undefined` 포함)
 * - Firebase 전송 시에만 `undefined` 키 제거
 * - `trackCallback`: trackEvent 후 기존 onClick 콜백 실행
 */
import { logEvent } from 'firebase/analytics';

import type { GaEventName } from '@shared/analytics/events';
import type {
  AnalyticsParamValue,
  TrackEventParams,
} from '@shared/analytics/params/types';
import { getLoginStatus } from '@shared/analytics/utils/loginStatus';
import { analytics } from '@shared/config/firebase';

export type { LoginStatus, TrackEventParams } from '@shared/analytics/params';

/** Firebase Analytics 실제 전송 여부 (.env) */
const isAnalyticsEnabled =
  import.meta.env.VITE_ENABLE_FIREBASE_ANALYTICS === 'true';

const getPagePath = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  return `${window.location.pathname}${window.location.search}`;
};

const getGlobalEventParams = (): Partial<TrackEventParams> => ({
  page_path: getPagePath(),
  login_status: getLoginStatus(),
  analytics_environment: import.meta.env.MODE,
});

const buildEventParams = (
  params?: TrackEventParams
): Record<string, AnalyticsParamValue> => {
  const merged = { ...getGlobalEventParams(), ...params };

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
 * 모든 이벤트에 `page_path`, `login_status`, `analytics_environment` 자동 주입.
 * 호출부 params가 동일 키를 넘기면 호출부 값이 우선합니다.
 */
export const trackEvent = (
  eventName: GaEventName,
  params?: TrackEventParams
): void => {
  const mergedParams = { ...getGlobalEventParams(), ...params };
  const logParams = mergedParams;
  const eventParams = buildEventParams(mergedParams);

  if (!isAnalyticsEnabled) {
    console.info('[Analytics]', eventName, logParams);
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
