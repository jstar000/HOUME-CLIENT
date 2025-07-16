/* 회원가입 TanStack Query 훅 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patchSignup } from '../apis/signup';
import type { SignupRequest, SignupResponse } from '../types/apis/signup';
import { ROUTES } from '@/routes/paths';

export const usePatchSignup = () => {
  const navigate = useNavigate();

  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: patchSignup,
    retry: 3,
    // 회원가입 성공 시 실행되는 함수
    onSuccess: (response) => {
      console.log('[usePatchSignup] 회원가입 성공:', response);
      // 회원가입 완료 페이지 이동
      navigate(ROUTES.SIGNUPCOMPLETE);
    },
    // 회원가입 실패 시 실행되는 함수
    onError: (error) => {
      console.error('[usePatchSignup] 회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
