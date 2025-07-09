export const TOAST_TYPE = {
  Success: 'success',
  Warning: 'warning',
} as const;

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];
