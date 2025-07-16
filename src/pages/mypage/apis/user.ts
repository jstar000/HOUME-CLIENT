// 마이페이지 유저 API 함수

import type { UserInfoResponse } from '../types/apis/myPage';
import { request, HTTPMethod } from '@/shared/apis/request';

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  return request({
    method: HTTPMethod.GET,
    url: '/api/v1/mypage/user',
  });
};
