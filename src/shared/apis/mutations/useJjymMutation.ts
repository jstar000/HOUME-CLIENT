import { useMutation } from '@tanstack/react-query';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import type { SaveItemsRequest, SaveItemsResponse } from '@shared/types/jjym';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { queryKeys } from '@constants/queryKey';

import type { AxiosError } from 'axios';

export const postJjym = async (
  jjymData: SaveItemsRequest
): Promise<SaveItemsResponse> => {
  return request<SaveItemsResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.JJYM_V2(jjymData.rawProductId),
  });
};

export const useJjymMutation = () => {
  const toggleSaveProduct = useSavedItemsStore((s) => s.toggleSaveProduct);

  return useMutation<SaveItemsResponse, AxiosError, number>({
    mutationKey: ['jjym'],
    mutationFn: (rawProductId) => postJjym({ rawProductId }),

    onMutate: async (rawProductId) => {
      toggleSaveProduct(rawProductId);
      return { rawProductId };
    },

    onSuccess: (data, rawProductId) => {
      const isSavedNow = useSavedItemsStore
        .getState()
        .savedProductIds.has(rawProductId);

      if (isSavedNow !== data.favorited) {
        toggleSaveProduct(rawProductId);
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.jjym.list() });
    },

    onError: (error, rawProductId) => {
      toggleSaveProduct(rawProductId);
      if (import.meta.env.DEV)
        console.log('찜하기 토글 변경 중 에러 발생', error);
    },
  });
};
