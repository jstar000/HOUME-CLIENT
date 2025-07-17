import { useQuery } from '@tanstack/react-query';
import { getUserInfo, getImageHistory } from '../apis/user';
import { QUERY_KEY } from '@/shared/constants/queryKey';

export const useUserData = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: getUserInfo,
  });
};

export const useImageHistory = () => {
  return useQuery({
    queryKey: [QUERY_KEY.IMAGE_HISTORY],
    queryFn: getImageHistory,
  });
};
