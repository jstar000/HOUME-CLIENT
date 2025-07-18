import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  checkGenerateImageStatus,
  generateImage,
  getResultData,
  getStackData,
  postCreditLog,
  postFurnitureLog,
  postHateStack,
  postLikeStack,
  postPreference,
} from '../apis/generate';
import { useGenerateStore } from '../stores/useGenerateStore';
import type { GenerateImageRequest } from '../types/GenerateType';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/apis/queryClient';
import { useFunnelStore } from '@/pages/onboarding/stores/useFunnelStore';

export const useStackData = (page: number, options: { enabled: boolean }) => {
  return useQuery({
    queryKey: [QUERY_KEY.GENERATE_LOADING, page],
    queryFn: () => getStackData(page),
    staleTime: 2 * 60 * 1000,
    retry: 2,
    ...options,
  });
};

export const useResultData = (
  imageId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QUERY_KEY.GENERATE_RESULT, imageId],
    queryFn: () => getResultData(imageId),
    ...options,
  });
};

// 캐러셀 이미지 좋아요/별로예요
export const useLikeStackMutation = () => {
  return useMutation({
    mutationFn: postLikeStack,
  });
};

export const useHateStackMutation = () => {
  return useMutation({
    mutationFn: postHateStack,
  });
};

// 결과 이미지 선호도 전송용 (POST)
export const usePreferenceMutation = () => {
  return useMutation({
    mutationFn: ({ imageId, isLike }: { imageId: number; isLike: boolean }) =>
      postPreference(imageId, isLike),
  });
};

// 가구 추천 받기 버튼 클릭 로그
export const useFurnitureLogMutation = () => {
  return useMutation({
    mutationFn: postFurnitureLog,
  });
};

// 결제 모달 버튼 클릭 로그 확인
export const useCreditLogMutation = () => {
  return useMutation({
    mutationFn: postCreditLog,
  });
};

// 이미지 생성 api
export const useGenerateImageApi = () => {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { resetFunnel } = useFunnelStore();
  const { setApiCompleted, resetGenerate } = useGenerateStore();

  const generateImageRequest = useMutation({
    mutationFn: (userInfo: GenerateImageRequest) => {
      console.log('🚀 이미지 제작 시작:', new Date().toLocaleTimeString());
      return generateImage(userInfo);
    },
    onSuccess: (data) => {
      console.log('✅ 이미지 제작 완료:', new Date().toLocaleTimeString());
      resetGenerate();

      // API 완료 신호를 Zustand store에 저장
      setApiCompleted(true);

      // 즉시 결과 페이지로 이동
      navigate('/generate/result', {
        state: {
          result: data,
        },
        replace: true,
      });
      resetFunnel(); // 성공 시에도 초기화

      queryClient.invalidateQueries({ queryKey: ['generateImage'] });
    },
  });

  return generateImageRequest;
};

// 이미지 생성 폴백
export const useGenerateImageStatusCheck = (
  houseId: number,
  shouldStart: boolean
) => {
  const navigate = useNavigate();
  const { resetFunnel } = useFunnelStore();
  const { resetGenerate, setApiCompleted } = useGenerateStore();

  const query = useQuery({
    queryKey: ['generateImageStatus', houseId],
    queryFn: () => checkGenerateImageStatus(houseId),
    enabled: shouldStart,
    refetchInterval: 7000, // 5초
    refetchIntervalInBackground: true,
    retry: (failureCount) => {
      // 최대 10번 재시도
      if (failureCount >= 9) {
        console.error('최대 재시도 횟수 초과');
        return false;
      }
      console.log(`상태 체크 재시도 ${failureCount + 1}/10`);
      return true;
    },
  });

  // 성공 시 처리, useGenerateImageStatusCheck 커스텀 훅이 LoadingPage에서 호출되면 useEffect()가 계속 상태 체크
  useEffect(() => {
    if (query.isSuccess && query.data) {
      resetGenerate();

      // API 완료 신호를 Zustand store에 저장
      setApiCompleted(true);

      console.log('상태 체크 성공:', query.data);
      // 성공 시 결과 페이지로 이동
      navigate('/generate/result', {
        state: {
          result: query.data,
        },
        replace: true,
      });
      resetFunnel();
      queryClient.invalidateQueries({ queryKey: ['generateImage'] });
    }
  }, [query.isSuccess, query.data, navigate, resetFunnel]);

  // 에러 시 처리
  useEffect(() => {
    if (query.isError) {
      navigate('/onboarding');
      console.log('fallback api 이미지 생성 실패');
    }
  }, [query.isError, query.error]);

  return query;
};
