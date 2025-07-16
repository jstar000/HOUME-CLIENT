import type { BottomSheetAddressResponse } from '../types/apis/bottomSheetAddress.types';
import { HTTPMethod, request } from '@/shared/apis/request';

export const postAddress = async (body: BottomSheetAddressResponse) => {
  return request({
    method: HTTPMethod.POST,
    url: `/api/v1/addresses`,
    body,
  });
};
