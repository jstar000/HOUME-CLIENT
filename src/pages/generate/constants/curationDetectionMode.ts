export type CurationDetectionMode = 'server' | 'client';

export const CURATION_DETECTION_MODE: CurationDetectionMode =
  import.meta.env.VITE_CURATION_DETECTION_MODE === 'client'
    ? 'client'
    : 'server';

export const IS_CLIENT_DETECTION_ENABLED =
  CURATION_DETECTION_MODE === 'client';

export const getCategoryQueryDetectedObjects = <T>(detectedObjects: T[]) =>
  IS_CLIENT_DETECTION_ENABLED ? detectedObjects : undefined;

export const isCategoryQueryEnabled = (
  imageId: number | null,
  detectedObjectsCount: number
) =>
  imageId !== null &&
  (!IS_CLIENT_DETECTION_ENABLED || detectedObjectsCount > 0);

export const shouldShowDetectionPending = (detectedObjectsCount: number) =>
  IS_CLIENT_DETECTION_ENABLED && detectedObjectsCount === 0;
