import { IS_CLIENT_DETECTION_ENABLED } from '@pages/generate/constants/curationDetectionMode';

import { isIOSLikeDevice } from '@shared/utils/platform';

import { useDetectionPrefetchClient } from './useDetectionPrefetch.client';
import { useDetectionPrefetchServer } from './useDetectionPrefetch.server';

const SHOULD_ENABLE_CLIENT_PREFETCH =
  IS_CLIENT_DETECTION_ENABLED && !isIOSLikeDevice();

export const useDetectionPrefetch = SHOULD_ENABLE_CLIENT_PREFETCH
  ? useDetectionPrefetchClient
  : useDetectionPrefetchServer;
