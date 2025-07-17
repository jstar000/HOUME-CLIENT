import type { BaseResponse } from '@shared/types/apis';

// 마이페이지 사용자 정보 조회 API
export interface MyPageUserData {
  name: string;
  creditCount: number; // 서버: CreditCount → 클라이언트: creditCount (camelCase)
}

export type MyPageUserResponse = BaseResponse<MyPageUserData>;

// 마이페이지 이미지 생성 이력 조회 API
export interface MyPageImageHistory {
  imageUrl: string; // 서버: generatedImageUrl → 클라이언트: imageUrl (GenerateType과 통일)
  tagName: string; // 서버: tasteTag → 클라이언트: tagName (GenerateType과 통일)
  equilibrium: string;
  houseForm: string;
  imageId: number;
}

export interface MyPageImagesData {
  histories: MyPageImageHistory[];
}

export type MyPageImagesResponse = BaseResponse<MyPageImagesData>;

// 마이페이지 이미지 상세 조회 API
export interface MyPageImageDetailData {
  equilibrium: string;
  houseForm: string;
  tagName: string; // 서버: tasteTag → 클라이언트: tagName (GenerateType과 통일)
  name: string;
  imageUrl: string; // 서버: generatedImageUrl → 클라이언트: imageUrl (GenerateType과 통일)
}

export type MyPageImageDetailResponse = BaseResponse<MyPageImageDetailData>;
