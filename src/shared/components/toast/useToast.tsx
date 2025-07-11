import React from 'react';
import { type Id, toast, type ToastOptions } from 'react-toastify';
import { toastStyle, type ToastType } from '@/shared/types/toast';
import Toast from '@/shared/components/toast/Toast';

interface UseToastParams {
  text: string;
  type?: ToastType;
  options?: ToastOptions;
  ariaLabel?: string;
}

export const useToast = () => {
  const toastId = React.useRef<Id | null>(null);

  const notify = React.useCallback(
    ({
      text,
      type = 'success',
      options,
      ariaLabel = 'toast alarm',
    }: UseToastParams) => {
      // 1) 현재 toastId에 해당하는 toast가 떠있는지 확인, 떠있다면 해당 toast를 dismiss
      if (toastId.current !== null && toast.isActive(toastId.current)) {
        toast.dismiss(toastId.current);
      }

      // 2) 새 토스트를 띄우고, 반환된 ID를 저장
      toastId.current = toast(<Toast text={text} type={type} />, {
        ...options,
        ariaLabel: ariaLabel,
        style: {
          ...toastStyle,
          ...options?.style,
        },
      });
    },
    []
  );

  return { notify };
};
