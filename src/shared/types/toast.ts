import { Slide } from 'react-toastify';

import type { ToastContainerProps } from 'react-toastify';
import type { ToasterProps } from 'sonner';

export const TOAST_TYPE_V2 = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  ACTION: 'action',
} as const;

// 1) 키 타입
export type ToastTypeKey = keyof typeof TOAST_TYPE_V2;

// 2) 값 타입
export type ToastType = (typeof TOAST_TYPE_V2)[ToastTypeKey];

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

/*
모두 교체될 때까지 유지
*/
// react-toastify의 ToastContainer 기본 설정 (일단 삭제 안함)
export const TOAST_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
} as const;

export const toastStyle = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  width: 'auto',
};

export const toastConfig: ToastContainerProps = {
  position: 'bottom-center' as const,
  closeButton: false,
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  limit: 1,
  toastStyle: {
    ...toastStyle,
  },
  transition: Slide,
};
