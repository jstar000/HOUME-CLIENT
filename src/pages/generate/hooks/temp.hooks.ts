import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateImage } from '../apis/generate';
import type { GenerateImageRequest } from '../types/GenerateType';

export const useGenerateImageApi = () => {
  const queryClient = useQueryClient();

  const generateImageRequest = useMutation({
    mutationFn: (userInfo: GenerateImageRequest) => generateImage(userInfo),
    onSuccess: (data) => {
      console.log('이미지 생성 요청 결과: ', data);
      queryClient.invalidateQueries({ queryKey: ['generateImage'] });
    },
  });

  return generateImageRequest;
};
