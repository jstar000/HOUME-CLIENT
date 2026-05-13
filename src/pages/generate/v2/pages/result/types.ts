// 결과 페이지(ResultPage)에서 자식 컴포넌트(CurationResult, ListResult, GeneratedImg)에 전달하는 이미지 메타 정보
// /meta API 응답(GeneratedImageMetaResponse)과 사실상 동형
export interface ResultImageMeta {
  imageId: number;
  imageUrl: string;
  isMirror: boolean;
}
