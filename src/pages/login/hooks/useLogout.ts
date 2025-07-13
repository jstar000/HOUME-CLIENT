import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../apis/logout';
import type { LogoutResponse } from '../types/auth';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      console.log('[useLogout] 로그아웃 성공');

      // 로컬 스토리지에서 액세스 토큰 제거
      localStorage.removeItem('accessToken');

      // 로그인 페이지로 이동
      navigate('/login');
    },
    onError: (error) => {
      console.error('[useLogout] 로그아웃 실패:', error);

      // 에러가 발생해도 로컬 토큰은 제거하고 로그인 페이지로 이동
      localStorage.removeItem('accessToken');
      navigate('/login');
    },
  });
};
