import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getResultData,
  getStackData,
  postCreditLog,
  postFurnitureLog,
  postPreference,
} from '../apis/generate';
import { QUERY_KEY } from '@/shared/constants/queryKey';

export const useStackData = (page: number, options: { enabled: boolean }) => {
  return useQuery({
    queryKey: [QUERY_KEY.GENERATE_LOADING, page],
    queryFn: () => getStackData(page),
    ...options,
  });
};

export const useResultData = (imageId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GENERATE_RESULT, imageId],
    queryFn: () => getResultData(imageId),
  });
};

// 결과 이미지 선호도 전송용 (POST)
export const usePreferenceMutation = (p0: number) => {
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
