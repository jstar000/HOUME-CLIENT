import { useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import { useUserStore } from '@store/useUserStore';

import { setLoginRedirect } from '@utils/loginRedirect';

/**
 * 로그인 게이트 진입 관리 훅
 * - 로그인 상태면 action 실행
 * - 비로그인이면 현재 경로를 저장하고 로그인 페이지로 이동 (로그인 성공 후 consumeLoginRedirect로 복귀)
 */
export const useLoginGate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const requireLogin = useCallback(
    (action: () => void) => {
      const isLoggedIn = !!useUserStore.getState().accessToken;

      if (!isLoggedIn) {
        setLoginRedirect(location.pathname + location.search);
        navigate(ROUTES.LOGIN);
        return;
      }

      action();
    },
    [navigate, location.pathname, location.search]
  );

  return { requireLogin };
};
