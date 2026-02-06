import { useCallback } from 'react';

type PrefetchPriority = 'immediate' | 'background';

interface DetectionPrefetchOptions {
  priority?: PrefetchPriority;
}

export const useDetectionPrefetchServer = () => {
  const prefetchDetection = useCallback(
    (
      _imageId: number,
      _imageUrl: string,
      _options?: DetectionPrefetchOptions
    ) => {},
    []
  );

  return { prefetchDetection };
};
