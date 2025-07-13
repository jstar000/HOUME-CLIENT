import { request } from '@shared/apis/request';
import type { LogoutResponse } from '../types/auth';

export const logout = async (): Promise<LogoutResponse> => {
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
