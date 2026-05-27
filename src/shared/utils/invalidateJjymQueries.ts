import { queryKeys } from '@constants/queryKey';

import type { QueryClient, QueryKey } from '@tanstack/react-query';

// 찜 토글과 관련된 쿼리키 무효화하는 함수
export const invalidateJjymRelatedQueries = (
  queryClient: QueryClient,
  includeSavedItemsList = true
) => {
  const relatedKeys: QueryKey[] = [
    queryKeys.product.all,
    queryKeys.styles.all,
    queryKeys.generate.all,
    queryKeys.mypage.images(),
  ];

  if (includeSavedItemsList) {
    relatedKeys.push(queryKeys.mypage.jjymList());
  }

  relatedKeys.forEach((key) => {
    queryClient.invalidateQueries({ queryKey: key });
  });
};
