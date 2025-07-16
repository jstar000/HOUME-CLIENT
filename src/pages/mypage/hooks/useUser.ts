import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../apis/user';

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
};
