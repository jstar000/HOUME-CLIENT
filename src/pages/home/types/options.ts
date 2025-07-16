export const INTERIOR_OPTIONS = [
  '휴식형',
  '재택근무형',
  '홈카페형',
  '영화감상형',
] as const;

export type InteriorOption = (typeof INTERIOR_OPTIONS)[number];
