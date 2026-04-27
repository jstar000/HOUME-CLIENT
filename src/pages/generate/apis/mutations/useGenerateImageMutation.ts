import { useMutation } from '@tanstack/react-query';

import { useGenerateStore } from '@pages/generate/stores/useGenerateStore';

import type {
  BannerGenerateImageResponse,
  GenerateImageV4Request,
} from '@apis/__generated__/data-contracts';
import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

export const postGenerateImage = async (
  requestData: GenerateImageV4Request
): Promise<BannerGenerateImageResponse> => {
  return request<BannerGenerateImageResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.IMAGE_V4,
    body: requestData,
  });
};

export const useGenerateImageMutation = () => {
  const { setApiCompleted, setNavigationData, resetGenerate } =
    useGenerateStore();

  return useMutation<
    BannerGenerateImageResponse,
    Error,
    GenerateImageV4Request
  >({
    mutationFn: postGenerateImage,
    onSuccess: (data) => {
      resetGenerate();
      setNavigationData(data);
      setApiCompleted(true);
      queryClient.invalidateQueries({ queryKey: queryKeys.generate.image() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.images() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mypage.user() });
    },
  });
};
