import type {
  ImageGenerateRequest,
  ImageGenerateResponse,
} from '@/pages/onboarding/apis/step4';
import { HTTPMethod, request, type RequestConfig } from '@/shared/apis/request';

export const generateImage = async (
  requestData: ImageGenerateRequest
): Promise<ImageGenerateResponse['data']> => {
  const config: RequestConfig = {
    method: HTTPMethod.POST,
    url: '/api/v1/generated-images/generate',
    body: requestData,
  };

  return await request<ImageGenerateResponse['data']>(config);
};
