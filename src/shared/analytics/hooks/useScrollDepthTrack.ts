import { useEffect, useRef } from 'react';

import type { GaEventName } from '@shared/analytics/events';
import type { AnalyticsScreenName } from '@shared/analytics/params/global';
import {
  createScrollDepthTracker,
  scrollDepthParams,
} from '@shared/analytics/params/scrollDepth';
import type { TrackEventParams } from '@shared/analytics/params/types';
import { trackEvent } from '@shared/analytics/track';

type ScrollTrackParams = Omit<TrackEventParams, 'screen_name' | 'scroll_depth'>;

interface UseScrollDepthTrackOptions {
  /** 스크롤 컨테이너 (미지정 시 window) */
  getScrollElement?: () => HTMLElement | null;
  extraParams?: ScrollTrackParams;
}

/**
 * scroll_depth 임계값(0/25/50/75/100) 도달 시 이벤트 1회씩 전송
 */
export const useScrollDepthTrack = (
  eventName: GaEventName,
  screenName: AnalyticsScreenName,
  options?: UseScrollDepthTrackOptions
): void => {
  const trackerRef = useRef(createScrollDepthTracker());
  const extraParamsRef = useRef(options?.extraParams);
  extraParamsRef.current = options?.extraParams;
  const getScrollElementRef = useRef(options?.getScrollElement);
  getScrollElementRef.current = options?.getScrollElement;

  useEffect(() => {
    const tracker = trackerRef.current;
    tracker.reset();

    const fireDepthEvents = () => {
      const element = getScrollElementRef.current?.() ?? null;

      if (element) {
        tracker.trackFromElement(element, (depth) => {
          trackEvent(eventName, {
            ...extraParamsRef.current,
            screen_name: screenName,
            ...scrollDepthParams(depth),
          });
        });
        return;
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = maxScroll <= 0 ? 0 : (window.scrollY / maxScroll) * 100;

      tracker.trackFromPercent(percent, (depth) => {
        trackEvent(eventName, {
          ...extraParamsRef.current,
          screen_name: screenName,
          ...scrollDepthParams(depth),
        });
      });
    };

    fireDepthEvents();
    window.addEventListener('scroll', fireDepthEvents, { passive: true });

    return () => {
      window.removeEventListener('scroll', fireDepthEvents);
      tracker.reset();
    };
  }, [eventName, screenName]);
};
