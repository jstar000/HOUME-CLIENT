/**
 * 무드보드 이미지 API 함수
 *
 * 무드보드 이미지를 가져옵니다.
 *
 * @returns Promise<MoodBoardImageResponse> - 무드보드 이미지 저장 결과 메시지
 *
 * @example
 * ```typescript
 * const result = await getMoodBoardImage();
 * console.log(result.data); // 무드보드 이미지 데이터
 * ```
 */

import axiosInstance from '@shared/apis/axiosInstance';
import type { MoodBoardImageResponse } from '../types/apis/moodBoard';

export const getMoodBoardImage = async (
  limit = 18
): Promise<MoodBoardImageResponse> => {
  try {
    const response = await axiosInstance.get<MoodBoardImageResponse>(
      '/api/v1/moodboard-images',
      {
        params: { limit },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('[moodboard] 요청 실패:', error.response);
    throw error;
  }
};
