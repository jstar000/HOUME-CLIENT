export type PrefetchPriority = 'immediate' | 'background';

export interface DetectionPrefetchOptions {
  priority?: PrefetchPriority;
}

export interface PrefetchTask {
  imageId: number;
  imageUrl: string;
}
