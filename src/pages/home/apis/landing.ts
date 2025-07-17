import { HTTPMethod, request } from '@/shared/apis/request';

export const getHistoryData = async () => {
  return request({
    method: HTTPMethod.GET,
    url: `/api/v1/check-has-generated-image`,
  });
};
