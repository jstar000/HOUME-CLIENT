import { useQuery } from '@tanstack/react-query';
import { getMoodBoardImage } from '../apis/MoodBoardImage';
import type { MoodBoardImageResponse } from '../types/apis/moodBoard';

/**
 * 무드보드 이미지를 가져오는 커스텀 훅입니다.
 *
 * @param {number} [cursor=0] - 페이징을 위한 커서 값 (현재 미사용)
 * @param {number} [limit=18] - 한 번에 가져올 이미지 개수
 * @returns {import('@tanstack/react-query').UseQueryResult<MoodBoardImageResponse, Error>} React Query의 쿼리 결과 객체
 *
 * @example
 * const { data, isLoading, error } = useMoodBoardImage(0, 10);
 */
export const useMoodBoardImage = (cursor: number = 0, limit: number = 18) => {
  return useQuery<MoodBoardImageResponse, Error>({
    queryKey: ['moodBoardImages', cursor, limit],
    queryFn: () => getMoodBoardImage(limit),
  });
};
