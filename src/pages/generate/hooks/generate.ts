import { useMutation, useQuery } from '@tanstack/react-query';
import { getResultData, getStackData, postPreference } from '../apis/generate';
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
export const usePreferenceMutation = () => {
  return useMutation({
    mutationFn: ({ imageId, isLike }: { imageId: number; isLike: boolean }) =>
      postPreference(imageId, isLike),
  });
};
