// 무드보드 이미지 관련 타입
export interface MoodBoardImageResponse {
  code: number;
  msg: string;
  data: {
    moodBoardResponseList: {
      id: number;
      imageUrl: string;
      fileExtension: string;
    }[];
  };
}
