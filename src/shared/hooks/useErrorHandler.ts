import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ErrorType, PageContext } from '@/shared/types/error';
import { useToast } from '@/shared/components/toast/useToast';
import { ROUTES } from '@/routes/paths';
import { ERROR_MESSAGES } from '@/shared/types/error';

/**
 * 중앙화된 에러 핸들러 훅
 *
 * @param context 현재 페이지 컨텍스트
 * @returns handleError 함수
 */
export const useErrorHandler = (context: PageContext) => {
  const navigate = useNavigate();
  const { notify } = useToast();

  /**
   * 컨텍스트와 에러 타입에 따른 리다이렉트 경로 반환
   */
  const getRedirectPath = useCallback(
    (context: PageContext, type: ErrorType): string => {
      const redirectMap: Record<
        PageContext,
        Partial<Record<ErrorType, string>>
      > = {
        home: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
        },
        onboarding: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
          auth: ROUTES.LOGIN,
        },
        generate: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
          auth: ROUTES.LOGIN,
        },
        mypage: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
          auth: ROUTES.LOGIN,
        },
        login: {
          loading: ROUTES.HOME,
          api: ROUTES.HOME,
          network: ROUTES.HOME,
        },
      };

      return redirectMap[context]?.[type] || ROUTES.HOME;
    },
    []
  );

  /**
   * 에러 처리 함수
   *
   * @param error 발생한 에러 객체
   * @param type 에러 타입
   * @param customMessage 커스텀 에러 메시지 (선택적)
   */
  const handleError = useCallback(
    (error: Error | unknown, type: ErrorType, customMessage?: string) => {
      // 에러 로깅
      console.error(`[${context}] ${type} error:`, error);

      // 토스트 알림
      const message = customMessage || ERROR_MESSAGES[type];
      notify({
        text: message,
        type: 'warning',
      });

      // 리다이렉트
      const redirectPath = getRedirectPath(context, type);

      // 약간의 지연을 두어 사용자가 토스트를 볼 수 있도록 함
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    },
    [context, navigate, notify, getRedirectPath]
  );

  return { handleError };
};
