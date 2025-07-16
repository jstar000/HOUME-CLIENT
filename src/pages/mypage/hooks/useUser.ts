import { useQuery } from '@tanstack/react-query';
import { getUserInfo, getImageHistory } from '../apis/user';

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
};

export const useImageHistory = () => {
  return useQuery({
    queryKey: ['ImagesHistory'],
    queryFn: getImageHistory,
  });
};
