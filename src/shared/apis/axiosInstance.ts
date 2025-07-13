import axios, { AxiosError } from 'axios';
import { ERROR_CODES } from '../constants/apiErrorCode';
import type { AxiosRequestConfig } from 'axios';
import type { BaseResponse } from '../types/apis';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 시 accessToken 자동 삽입
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    console.log('[axiosInstance] 요청에 accessToken 추가됨');
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 시 accessToken 만료 에러 감지 및 재발급 처리
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<BaseResponse<null>>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    console.error('[axiosInstance] 응답 에러 발생:', error.response?.data);

    if (
      error?.response?.data?.code === ERROR_CODES.ACCESS_TOKEN_EXPIRED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 만료된 액세스토큰 빼고 리프레시 토큰 쿠키로 재발급 요청
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/reissue`,
          null,
          {
            withCredentials: true,
            // Authorization 헤더 아예 제거해서 만료 토큰 보내지 X
            headers: {},
          }
        );

        const newAccessToken = res.headers['access-token'];
        if (!newAccessToken) throw new Error('새 액세스 토큰이 없습니다.');

        console.log('[axiosInstance] 액세스 토큰 재발급 성공:', newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);

        // 새로운 액세스 토큰 넣어서 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('[axiosInstance] 토큰 재발급 실패:', refreshError);
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        // 인터셉터에서는 직접 네비게이션하지 않고 에러를 던짐
        // 컴포넌트에서 에러를 처리하여 네비게이션 처리
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
