// 마이페이지 관련 타입

// 유저 정보 타입
export interface UserInfoResponse {
  code: number;
  msg: string;
  name: string;
  creditCount: number;
}

// 이미지 생성 이력 제공 타입
export interface ImageHistoryResponse {
  code: number;
  msg: string;
  generatedImageUrl: string;
  tasteTag: string;
  equilibrium: string;
  houseForm: string;
}
