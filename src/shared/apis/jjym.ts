import type { SaveItemsRequest, SaveItemsResponse } from '@shared/types/jjym';

import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';

// 가구 찜하기 API
export const postJjym = async (
  jjymData: SaveItemsRequest
): Promise<SaveItemsResponse> => {
  return request<SaveItemsResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.JJYM(jjymData.recommendFurnitureId),
  });
};
