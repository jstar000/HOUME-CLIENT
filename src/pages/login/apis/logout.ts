/**
 * 로그아웃 API 함수
 *
 * 현재 로그인된 사용자의 세션을 종료합니다.
 * 서버에 로그아웃 요청을 보내고, 성공 시 로컬 스토리지의 액세스 토큰을 제거합니다.
 *
 * @returns Promise<LogoutResponse> - 로그아웃 결과 메시지
 *
 * @example
 * ```typescript
 * const result = await logout();
 * console.log(result.message); // "로그아웃되었습니다"
 * ```
 */
import { request } from '@shared/apis/request';
import type { LogoutResponse } from '../types/auth';

// Request 함수를 사용해서 서버에 로그아웃 요청
export const postLogout = async (): Promise<LogoutResponse> => {
  console.log('[logout] 로그아웃 요청 시작');

  try {
    const response = await request<LogoutResponse>({
      method: 'POST',
      url: '/logout',
    });

    console.log('[logout] 응답 성공:', response);
    return response;
  } catch (error: any) {
    console.error('[logout] 요청 실패:', error.response?.data);
    console.error('[logout] 상태 코드:', error.response?.status);
    throw error;
  }
};
