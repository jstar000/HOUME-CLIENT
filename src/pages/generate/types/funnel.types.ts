const opt = (key: string, label: string) => ({ value: key, label: label });

// Step 1
export const HOUSE_INFO_OPTIONS = {
  HOUSING_TYPES: {
    OFFICETEL: opt('OFFICETEL', '오피스텔'),
    VILLA: opt('VILLA', '빌라/오피스텔'),
    APARTMENT: opt('APARTMENT', '아파트'),
    OTHER: opt('OTHER', '그 외'),
  },
  ROOM_TYPES: {
    OPEN_ONE_ROOM: opt('OPEN_ONE_ROOM', '오픈형 원룸'),
    SEPARATE_ONE_ROOM: opt('SEPARATE_ONE_ROOM', '분리형 원룸'),
    DUPLEX: opt('DUPLEX', '복층형'),
    TWO_ROOM: opt('TWO_ROOM', '투룸'),
    THREE_ROOM_OVER: opt('THREE_ROOM_OVER', '쓰리룸+'),
  },
  AREA_TYPES: {
    UNDER_5: opt('UNDER_5', '5평 이하'),
    BETWEEN_6_10: opt('BETWEEN_6_10', '6-10평'),
    BETWEEN_11_15: opt('BETWEEN_11_15', '11-15평'),
    OVER_16: opt('OVER_16', '16평 이상'),
  },
} as const;

// Step 4
export const MAIN_ACTIVITY_OPTIONS = {
  PRIMARY_USAGE: {
    RESTING: opt('RESTING', '휴식'),
    WORK_OFFICE: opt('WORK_OFFICE', '업무/사무'),
    HOME_CAFE: opt('HOME_CAFE', '홈카페'),
    MOVIE: opt('MOVIE', '영화감상'),
  },
  BED_TYPE: {
    SINGLE: opt('SINGLE', '싱글'),
    SUPER_SINGLE: opt('SUPER_SINGLE', '슈퍼싱글'),
    DOUBLE: opt('DOUBLE', '더블'),
    QUEEN_ABOVE: opt('QUEEN_ABOVE', '퀸 이상'),
  },
  CLOSET_TYPE: {
    HANGER: opt('HANGER', '행거'),
    FURNITURE: opt('FURNITURE', '가구'),
  },
  OTHER_FURNITURES: {
    DESK: opt('DESK', '책상'),
    MOVABLE_TV: opt('MOVABLE_TV', '이동식 TV'),
    DRAWER: opt('DRAWER', '서랍'),
    TABLE_CHAIR: opt('TABLE_CHAIR', '테이블/의자'),
  },
} as const;

// HOUSE_INFO_OPTIONS 개별 타입 추출
export type HouseType =
  (typeof HOUSE_INFO_OPTIONS.HOUSING_TYPES)[keyof typeof HOUSE_INFO_OPTIONS.HOUSING_TYPES]['value'];
export type RoomType =
  (typeof HOUSE_INFO_OPTIONS.ROOM_TYPES)[keyof typeof HOUSE_INFO_OPTIONS.ROOM_TYPES]['value'];
export type RoomSize =
  (typeof HOUSE_INFO_OPTIONS.AREA_TYPES)[keyof typeof HOUSE_INFO_OPTIONS.AREA_TYPES]['value'];

// MAIN_ACTIVITY_OPTIONS 개별 타입 추출
export type PrimaryUsage =
  (typeof MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE)[keyof typeof MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE]['value'];
export type BedType =
  (typeof MAIN_ACTIVITY_OPTIONS.BED_TYPE)[keyof typeof MAIN_ACTIVITY_OPTIONS.BED_TYPE]['value'];
export type ClosetType =
  (typeof MAIN_ACTIVITY_OPTIONS.CLOSET_TYPE)[keyof typeof MAIN_ACTIVITY_OPTIONS.CLOSET_TYPE]['value'];
export type OtherFurnitures =
  (typeof MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES)[keyof typeof MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES]['value'];

// 각 단계별 완성된 데이터 타입
// Required<>: 모든 속성을 필수로 만드는 TS utility type
export type CompleteHouseInfo = Required<ImgGenerateSteps['HouseInfo']>;
export type CompleteHouseStructure = Required<
  ImgGenerateSteps['HouseStructure']
>;
export type CompleteInteriorTaste = Required<ImgGenerateSteps['InteriorTaste']>;
export type CompleteMainActivity = Required<ImgGenerateSteps['MainActivity']>;

// Funnel Step 정의
export type ImgGenerateSteps = {
  HouseInfo: {
    houseType?: HouseType;
    roomType?: RoomType;
    roomSize?: RoomSize;
  };
  HouseStructure: {
    houseType: HouseType;
    roomType: RoomType;
    roomSize: RoomSize;
    selectedHouseStructure?: number[];
  };
  InteriorTaste: {
    houseType: HouseType;
    roomType: RoomType;
    roomSize: RoomSize;
    selectedHouseStructure: number[];
    selectedInteriorTaste?: number[];
  };
  MainActivity: {
    houseType: HouseType;
    roomType: RoomType;
    roomSize: RoomSize;
    selectedHouseStructure: number[];
    selectedInteriorTaste: number[];
    primaryUsage?: PrimaryUsage;
    bedType?: BedType;
    closetType?: ClosetType;
    otherFurnitures?: OtherFurnitures[];
  };
};
