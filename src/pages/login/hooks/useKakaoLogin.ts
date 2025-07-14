/**
 * 카카오 로그인 React Query 훅
 *
 * 카카오 OAuth 로그인을 처리하는 TanStack Query mutation 훅입니다.
 * 로그인 성공 시 액세스 토큰을 로컬 스토리지에 저장하고 홈페이지로 이동합니다.
 *
 * @returns useMutation - 로그인 상태와 함수를 반환
 *
 * @example
 * ```typescript
 * const { mutate: login, isPending, isError } = useKakaoLogin();
 *
 * // 카카오 인가 코드로 로그인
 * login('authorization_code');
 *
 * if (isPending) return <div>로그인 중...</div>;
 * if (isError) return <div>로그인 실패</div>;
 * ```
 */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getKakaoLogin } from '../apis/kakaoLogin';
import type { LoginApiResponse } from '../types/auth';
import { ROUTES } from '@/routes/paths';

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginApiResponse, Error, string>({
    mutationFn: getKakaoLogin, // 카카오 로그인 API 호출 함수
    // 로그인 성공 시 실행되는 함수
    onSuccess: (response) => {
      // console.log('[useKakaoLogin] 로그인 성공:', response.data);

      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', response.accessToken);

      // 홈페이지로 이동
      navigate(ROUTES.HOME);
    },
    // 로그인 실패 시 실행되는 함수
    onError: (error) => {
      console.error('[useKakaoLogin] 로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
