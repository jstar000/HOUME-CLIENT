import { unitVars } from '../styles/tokensV2/unit.css';

import type { ToasterProps } from 'sonner';

export const TOAST_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  ACTION: 'action',
} as const;

// 1) 키 타입
export type ToastTypeKey = keyof typeof TOAST_TYPE;

// 2) 값 타입
export type ToastType = (typeof TOAST_TYPE)[ToastTypeKey];

// toast 위치 키
export const TOASTER_ID = {
  TOP: 'top',
  BOTTOM_8: 'bottom-8',
  BOTTOM_4: 'bottom-4',
} as const;

export type ToasterId = (typeof TOASTER_ID)[keyof typeof TOASTER_ID];

// sonner의 Toaster 기본 설정
export const TOASTER_DEFAULTS = {
  visibleToasts: 1,
  closeButton: false,
  duration: 2000,
  expand: false, // hover시 확장
} satisfies Pick<
  ToasterProps,
  'visibleToasts' | 'closeButton' | 'duration' | 'expand'
>;
