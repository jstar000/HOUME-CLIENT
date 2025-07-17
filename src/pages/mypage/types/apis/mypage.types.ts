// 마이페이지 사용자 정보 조회 API
export interface MyPageUserData {
  name: string;
  CreditCount: number;
}

export interface MyPageUserResponse {
  code: number;
  msg: string;
  data: MyPageUserData;
}

// 마이페이지 이미지 생성 이력 조회 API
export interface MyPageImageHistory {
  generatedImageUrl: string;
  tasteTag: string;
  equilibrium: string;
  houseForm: string;
}

export interface MyPageImagesData {
  histories: MyPageImageHistory[];
}

export interface MyPageImagesResponse {
  code: number;
  msg: string;
  data: MyPageImagesData;
}

// 마이페이지 이미지 상세 조회 API
export interface MyPageImageDetailData {
  equilibrium: string;
  houseForm: string;
  tasteTag: string;
  name: string;
  generatedImageUrl: string;
}

export interface MyPageImageDetailResponse {
  code: number;
  msg: string;
  data: MyPageImageDetailData;
}
