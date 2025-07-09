import type { ToastContainerProps } from 'react-toastify';

export const TOAST_TYPE = {
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

export const toastStyle = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
};

export const toastConfig: ToastContainerProps = {
  position: 'bottom-center' as const,
  closeButton: false,
  autoClose: 2000,
  hideProgressBar: true,
  newestOnTop: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  toastStyle: {
    ...toastStyle,
  },
};
