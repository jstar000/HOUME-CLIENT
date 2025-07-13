import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../apis/kakaoLogin';
import type { LoginApiResponse } from '../types/auth';

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginApiResponse, Error, string>({
    mutationFn: kakaoLogin,
    onSuccess: (response) => {
      console.log('[useKakaoLogin] 로그인 성공:', response.data);

      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', response.accessToken);

      // 홈페이지로 이동
      navigate('/');
    },
    onError: (error) => {
      console.error('[useKakaoLogin] 로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
