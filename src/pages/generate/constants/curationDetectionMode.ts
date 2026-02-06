export type CurationDetectionMode = 'server' | 'client';

const DEFAULT_DETECTION_MODE: CurationDetectionMode = 'server';

const normalizeMode = (
  rawMode: string | undefined
): CurationDetectionMode => {
  if (rawMode?.trim().toLowerCase() === 'client') {
    return 'client';
  }
  return DEFAULT_DETECTION_MODE;
};

export const CURATION_DETECTION_MODE = normalizeMode(
  import.meta.env.VITE_CURATION_DETECTION_MODE
);

export const IS_CLIENT_DETECTION_MODE =
  CURATION_DETECTION_MODE === 'client';
