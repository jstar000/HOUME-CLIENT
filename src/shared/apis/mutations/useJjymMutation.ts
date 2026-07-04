import { useRef } from 'react';

import { useMutation } from '@tanstack/react-query';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import { GA_EVENTS } from '@shared/analytics/events';
import { getProductCardParams } from '@shared/analytics/params/builders/productCard';
import type { LoginEntryRoute } from '@shared/analytics/params/gate';
import { resolveScreenName } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import type { SaveItemsRequest, SaveItemsResponse } from '@shared/types/jjym';
import { TOAST_TYPE, TOASTER_ID } from '@shared/types/toast';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { useToast } from '@components/v2/toast/useToast';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { TOAST_ACTION_LABEL, TOAST_MESSAGE } from '@constants/toastMessage';

import { useLoginGate } from '@hooks/useLoginGate';

import { invalidateJjymRelatedQueries } from '@utils/invalidateJjymQueries';

import type { AxiosError } from 'axios';

type JjymSavedToast = 'move' | 'stored' | 'none';

interface UseJjymMutationOptions {
  savedToastType?: JjymSavedToast;
  onSavedAction?: () => void;
  invalidateSavedItemsList?: boolean; // 찜 목록 무효화 여부
  loginEntryRoute?: LoginEntryRoute;
}

export const postJjym = async (
  jjymData: SaveItemsRequest
): Promise<SaveItemsResponse> => {
  return request<SaveItemsResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.JJYM_V2(jjymData.rawProductId),
  });
};

const TOAST_OPTIONS = { toasterId: TOASTER_ID.BOTTOM_4 };

const getSavedToastContent = (type: JjymSavedToast) => {
  if (type === 'stored') {
    return {
      text: TOAST_MESSAGE.SAVED_ITEM_STORED,
      actionLabel: TOAST_ACTION_LABEL.VIEW,
    };
  }

  return {
    text: TOAST_MESSAGE.SAVED_ITEM_STORED,
    actionLabel: TOAST_ACTION_LABEL.VIEW,
  };
};

const getSaveToastParams = (rawProductId: number, productName?: string) => ({
  screen_name: resolveScreenName(
    window.location.pathname + window.location.search
  ),
  ...getProductCardParams({ productId: rawProductId, name: productName }),
});

export const useJjymMutation = (options?: UseJjymMutationOptions) => {
  const toggleSaveProduct = useSavedItemsStore((s) => s.toggleSaveProduct);
  const { notify } = useToast();
  const { requireLogin } = useLoginGate();
  const pendingProductNamesRef = useRef<Map<number, string | undefined>>(
    new Map()
  );
  const savedToastType = options?.savedToastType ?? 'move';
  const shouldInvalidateSavedItemsList =
    options?.invalidateSavedItemsList !== false;

  const syncSavedStateWithServer = async (rawProductId: number) => {
    const response = await postJjym({ rawProductId });
    const isSavedNow = useSavedItemsStore
      .getState()
      .savedProductIds.has(rawProductId);

    if (isSavedNow !== response.favorited) {
      toggleSaveProduct(rawProductId);
    }

    await invalidateJjymRelatedQueries(
      queryClient,
      shouldInvalidateSavedItemsList
    );
  };

  const mutation = useMutation<SaveItemsResponse, AxiosError, number>({
    mutationKey: ['jjym'],
    mutationFn: (rawProductId) => postJjym({ rawProductId }),

    onMutate: async (rawProductId) => {
      toggleSaveProduct(rawProductId);
      return { rawProductId };
    },

    onSuccess: async (data, rawProductId) => {
      const productName = pendingProductNamesRef.current.get(rawProductId);
      pendingProductNamesRef.current.delete(rawProductId);
      const isSavedNow = useSavedItemsStore
        .getState()
        .savedProductIds.has(rawProductId);

      if (isSavedNow !== data.favorited) {
        toggleSaveProduct(rawProductId);
      }

      if (data.favorited) {
        if (savedToastType === 'none') {
          await invalidateJjymRelatedQueries(
            queryClient,
            shouldInvalidateSavedItemsList
          );
          return;
        }

        const toastContent = getSavedToastContent(savedToastType);
        const toastParams = getSaveToastParams(rawProductId, productName);

        trackEvent(GA_EVENTS.component.TOAST_SAVE_VIEW, toastParams);

        notify({
          text: toastContent.text,
          type: TOAST_TYPE.ACTION,
          actionLabel: toastContent.actionLabel,
          onClick: () => {
            trackEvent(
              GA_EVENTS.component.SAVE_TOAST_TO_SEE_CLICK,
              toastParams
            );
            options?.onSavedAction?.();
          },
          options: TOAST_OPTIONS,
        });
      } else {
        const toastParams = getSaveToastParams(rawProductId, productName);

        notify({
          text: TOAST_MESSAGE.SAVED_ITEM_REMOVED,
          type: TOAST_TYPE.ACTION,
          actionLabel: TOAST_ACTION_LABEL.UNDO,
          onClick: () => {
            trackEvent(
              GA_EVENTS.component.SAVE_TOAST_CANCEL_CLICK,
              toastParams
            );
            toggleSaveProduct(rawProductId);

            void syncSavedStateWithServer(rawProductId).catch(() => {
              toggleSaveProduct(rawProductId);
            });
          },
          options: TOAST_OPTIONS,
        });
      }

      await invalidateJjymRelatedQueries(
        queryClient,
        shouldInvalidateSavedItemsList
      );
    },

    onError: (_error, rawProductId) => {
      pendingProductNamesRef.current.delete(rawProductId);
      toggleSaveProduct(rawProductId);
    },
  });

  // 찜 토글 전 로그인 게이트: 비로그인이면 mutate 미실행 → onMutate 낙관적 업데이트도 일어나지 않음
  type JjymMutateOptions = Parameters<typeof mutation.mutate>[1] & {
    loginEntryRoute?: LoginEntryRoute;
    productName?: string;
  };

  const mutate = (rawProductId: number, mutateOptions?: JjymMutateOptions) => {
    const { loginEntryRoute, productName, ...restOptions } =
      mutateOptions ?? {};
    pendingProductNamesRef.current.set(rawProductId, productName);

    requireLogin(
      () => mutation.mutate(rawProductId, restOptions),
      loginEntryRoute ?? options?.loginEntryRoute
    );
  };

  return { ...mutation, mutate };
};
