import { useEffect, useRef } from 'react';

import type { GaEventName } from '@shared/analytics/events';
import type { AnalyticsScreenName } from '@shared/analytics/params/global';
import type { TrackEventParams } from '@shared/analytics/params/types';
import { trackEvent } from '@shared/analytics/track';
import { getPreviousScreenName } from '@shared/analytics/utils/screenName';

type PageViewParams = Omit<
  TrackEventParams,
  'screen_name' | 'previous_screen_name'
>;

interface UseAnalyticsPageViewOptions {
  /** false면 page_view 미전송 (데이터 로딩 대기 등) */
  enabled?: boolean;
}

/**
 * page_view 1회 전송 (마운트 시)
 * - `previous_screen_name`: `useScreenNavigation`이 갱신한 직전 화면
 */
export const useAnalyticsPageView = (
  eventName: GaEventName,
  screenName: AnalyticsScreenName,
  params?: PageViewParams,
  options?: UseAnalyticsPageViewOptions
): void => {
  const paramsRef = useRef(params);
  paramsRef.current = params;

  useEffect(() => {
    if (options?.enabled === false) return;

    trackEvent(eventName, {
      ...paramsRef.current,
      screen_name: screenName,
      previous_screen_name: getPreviousScreenName(),
    });
    // page_view는 screen/event 기준 1회 — params 객체 identity 변경으로 재전송하지 않음
  }, [eventName, screenName, options?.enabled]);
};
