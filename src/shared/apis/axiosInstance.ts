import axios, { AxiosError } from 'axios';
import { RESPONSE_MESSAGE } from '@shared/constants/response';
import type { BaseResponse } from '@shared/types/apis';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error: AxiosError<BaseResponse<null>>) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message;

      const displayMessage =
        RESPONSE_MESSAGE[status] ||
        message ||
        '알 수 없는 오류가 발생했습니다.';

      console.error(`[${status}] ${displayMessage}`);
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
