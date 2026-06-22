/** 노션 scroll 이벤트 공통 `scroll_depth` 값 */
export const SCROLL_DEPTH_THRESHOLDS = [0, 25, 50, 75, 100] as const;

export type ScrollDepth = (typeof SCROLL_DEPTH_THRESHOLDS)[number];

export const scrollDepthParams = (depth: ScrollDepth) => ({
  scroll_depth: depth,
});

const isScrollDepth = (value: number): value is ScrollDepth =>
  SCROLL_DEPTH_THRESHOLDS.includes(value as ScrollDepth);

/** 스크롤 진행률(0~100)에 도달한 depth 목록 (오름차순) */
export const getScrollDepthsUpTo = (percent: number): ScrollDepth[] =>
  SCROLL_DEPTH_THRESHOLDS.filter((depth) => percent >= depth);

/** 스크롤 컨테이너 기준 현재 depth (가장 높은 임계값) */
export const getScrollDepthFromElement = (
  element: HTMLElement
): ScrollDepth => {
  const maxScroll = element.scrollHeight - element.clientHeight;

  if (maxScroll <= 0) {
    return 0;
  }

  const percent = (element.scrollTop / maxScroll) * 100;
  const depths = getScrollDepthsUpTo(percent);

  return depths[depths.length - 1] ?? 0;
};

/** window 스크롤 기준 현재 depth */
export const getScrollDepthFromWindow = (): ScrollDepth => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  if (maxScroll <= 0) {
    return 0;
  }

  const percent = (window.scrollY / maxScroll) * 100;
  const depths = getScrollDepthsUpTo(percent);

  return depths[depths.length - 1] ?? 0;
};

/**
 * depth별 1회만 콜백 실행 (중복 scroll 이벤트 방지)
 *
 * @example
 * tracker.trackReached(50, (depth) => {
 *   trackEvent(event, { ...scrollDepthParams(depth), screen_name: 'home' });
 * });
 */
export const createScrollDepthTracker = () => {
  const fired = new Set<ScrollDepth>();

  return {
    trackReached: (depth: number, onReach: (depth: ScrollDepth) => void) => {
      if (!isScrollDepth(depth) || fired.has(depth)) {
        return;
      }

      fired.add(depth);
      onReach(depth);
    },
    trackFromPercent: (
      percent: number,
      onReach: (depth: ScrollDepth) => void
    ) => {
      getScrollDepthsUpTo(percent).forEach((depth) => {
        if (!fired.has(depth)) {
          fired.add(depth);
          onReach(depth);
        }
      });
    },
    trackFromElement: (
      element: HTMLElement,
      onReach: (depth: ScrollDepth) => void
    ) => {
      const maxScroll = element.scrollHeight - element.clientHeight;
      const percent =
        maxScroll <= 0 ? 0 : (element.scrollTop / maxScroll) * 100;

      getScrollDepthsUpTo(percent).forEach((depth) => {
        if (!fired.has(depth)) {
          fired.add(depth);
          onReach(depth);
        }
      });
    },
    reset: () => {
      fired.clear();
    },
  };
};
