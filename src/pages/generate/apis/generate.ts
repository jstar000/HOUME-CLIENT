import type {
  GenerateImageRequest,
  GenerateImageResponse,
} from '../types/GenerateType';
import { HTTPMethod, request, type RequestConfig } from '@/shared/apis/request';

export const generateImage = async (
  requestData: GenerateImageRequest
): Promise<GenerateImageResponse['data']> => {
  const config: RequestConfig = {
    method: HTTPMethod.POST,
    url: '/api/v1/generated-images/generate',
    body: requestData,
  };

  return await request<GenerateImageResponse['data']>(config);
};
