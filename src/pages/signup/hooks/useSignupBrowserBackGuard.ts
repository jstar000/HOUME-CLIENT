import { useEffect, useRef } from 'react';

const SIGNUP_HISTORY_GUARD_STATE = { signupHistoryGuard: true } as const;

interface UseSignupBrowserBackGuardOptions {
  enabled: boolean;
  /** 브라우저 뒤로가기·스와이프 제스처가 감지됐을 때 (아직 페이지 이탈 전) */
  onBrowserBack: () => void;
}

/**
 * OAuth 리다이렉트 체인(kauth.kakao.com 등)이 history에 남을 때
 * 브라우저 뒤로가기가 SPA 밖으로 나가 React Router blocker가 동작하지 않는 문제를 막음.
 *
 * pushState 트랩 + popstate로 동일 URL에 머무른 채 뒤로가기 시도를 감지한다.
 */
export const useSignupBrowserBackGuard = ({
  enabled,
  onBrowserBack,
}: UseSignupBrowserBackGuardOptions) => {
  const onBrowserBackRef = useRef(onBrowserBack);
  onBrowserBackRef.current = onBrowserBack;

  useEffect(() => {
    if (!enabled) return;

    const pushGuardState = () => {
      window.history.pushState(SIGNUP_HISTORY_GUARD_STATE, '');
    };

    pushGuardState();

    const handlePopState = () => {
      pushGuardState();
      onBrowserBackRef.current();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [enabled]);
};
