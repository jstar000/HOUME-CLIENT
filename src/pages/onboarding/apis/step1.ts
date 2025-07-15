import type {
  SelectHouseInfoRequest,
  SelectHouseInfoResponse,
} from '../types/apis/step1api.types';
import { HTTPMethod, request, type RequestConfig } from '@/shared/apis/request';

export const selectHouseInfo = async (
  requestData: SelectHouseInfoRequest
): Promise<SelectHouseInfoResponse> => {
  const config: RequestConfig = {
    method: HTTPMethod.POST,
    url: '/api/v1/housing-selections',
    body: requestData,
  };

  return await request<SelectHouseInfoResponse>(config);
};
