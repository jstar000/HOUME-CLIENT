export interface MoodBoardImageItem {
  id: number;
  imageUrl: string;
  fileExtension: string;
}

export interface MoodBoardImageResponse {
  code: number;
  msg: string;
  data: {
    moodBoardResponseList: MoodBoardImageItem[];
  };
}
