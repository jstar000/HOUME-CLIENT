// 카카오 로그인 관련 타입
export interface KakaoLoginResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

// 로그아웃 관련 타입
export interface LogoutResponse {
  message: string;
}

// 로그인 API 응답 타입
export interface LoginApiResponse {
  data: KakaoLoginResponse;
  accessToken: string;
}
