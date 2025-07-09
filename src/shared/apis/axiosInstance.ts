import axios, { AxiosError } from 'axios';
import type { BaseResponse } from '../types/apis';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
    const originalRequest: any = error.config;

    if (error?.response?.data?.code === 40002 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('리프레시 토큰 없음');

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          {
            params: { refreshToken },
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;
        console.log('[axiosInstance] 액세스 토큰 재발급 성공:', newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
