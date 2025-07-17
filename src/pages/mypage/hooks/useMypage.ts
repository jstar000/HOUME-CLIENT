import { useQuery } from '@tanstack/react-query';
import {
  getMyPageUser,
  getMyPageImages,
  getMyPageImageDetail,
} from '../apis/mypage';
import { QUERY_KEY } from '@/shared/constants/queryKey';

/**
 * 마이페이지 사용자 정보 조회 훅
 */
export const useMyPageUser = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [QUERY_KEY.MYPAGE_USER],
    queryFn: getMyPageUser,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    ...options,
  });
};

/**
 * 마이페이지 이미지 생성 이력 조회 훅
 */
export const useMyPageImages = () => {
  return useQuery({
    queryKey: [QUERY_KEY.MYPAGE_IMAGES],
    queryFn: getMyPageImages,
    staleTime: 2 * 60 * 1000, // 2분간 캐시 유지
  });
};

/**
 * 마이페이지 이미지 상세 조회 훅
 */
export const useMyPageImageDetail = (
  imageId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QUERY_KEY.MYPAGE_IMAGE_DETAIL, imageId],
    queryFn: () => getMyPageImageDetail(imageId),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    ...options,
  });
};
