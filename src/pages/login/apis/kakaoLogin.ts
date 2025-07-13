import axiosInstance from '@shared/apis/axiosInstance';
import type { BaseResponse } from '@shared/types/apis';
import type { KakaoLoginResponse, LoginApiResponse } from '../types/auth';

export const kakaoLogin = async (code: string): Promise<LoginApiResponse> => {
  console.log('[kakaoLogin] 인가 코드:', code);

  const response = await axiosInstance.get<BaseResponse<KakaoLoginResponse>>(
    `/oauth/kakao/callback?code=${code}`
  );

  console.log('[kakaoLogin] 응답 헤더:', response.headers);
  console.log('[kakaoLogin] 응답 데이터:', response.data);

  const accessToken = response.headers['access-token'];
  if (!accessToken) {
    console.error('[kakaoLogin] 액세스 토큰이 헤더에 없습니다.');
    console.error(
      '[kakaoLogin] 사용 가능한 헤더:',
      Object.keys(response.headers)
    );
    throw new Error('액세스 토큰이 없습니다.');
  }

  return {
    data: response.data.data,
    accessToken,
  };
};
