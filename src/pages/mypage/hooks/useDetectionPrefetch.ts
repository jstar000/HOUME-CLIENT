import { useCallback } from 'react';

type PrefetchPriority = 'immediate' | 'background';

export interface DetectionPrefetchOptions {
  priority?: PrefetchPriority;
}

/**
 * 감지 프리패치 훅
 * - 클라이언트 객체 추론 비활성화로 no-op 유지
 */
export const useDetectionPrefetch = () => {
  const prefetchDetection = useCallback(
    (
      _imageId: number,
      _imageUrl: string,
      _options?: DetectionPrefetchOptions
    ) => {
      // no-op by design
    },
    []
  );

  return { prefetchDetection };
};
