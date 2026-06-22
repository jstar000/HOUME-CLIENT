import { logEvent } from 'firebase/analytics';

import { useUserStore } from '@store/useUserStore';

import type { GaEventName } from '@shared/analytics/events';
import type { ScrollDepth } from '@shared/analytics/params/scrollDepth';
import { analytics } from '@shared/config/firebase';

export type AnalyticsEnvironment = 'local' | 'staging' | 'production';

export type LoginStatus = 'logged_in' | 'logged_out';

type AnalyticsParamValue = string | number | boolean;

export type TrackEventParams = {
  screen_name?: string;
  login_entry_route?: string;
  image_entry_route?: string;
  scroll_depth?: ScrollDepth;
  section_name?: string;
  trigger_context?: string;
  [key: string]: AnalyticsParamValue | undefined;
};

const isAnalyticsEnabled =
  import.meta.env.VITE_ENABLE_FIREBASE_ANALYTICS === 'true';

const getAnalyticsEnvironment = (): AnalyticsEnvironment => {
  const env = import.meta.env.VITE_ANALYTICS_ENV;

  if (env === 'staging' || env === 'production' || env === 'local') {
    return env;
  }

  return 'local';
};

const getLoginStatus = (): LoginStatus => {
  const { accessToken } = useUserStore.getState();
  return accessToken ? 'logged_in' : 'logged_out';
};

const getPagePath = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.pathname;
};

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
    return;
  }

  try {
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error('[Analytics] trackEvent error:', error);
  }
};
