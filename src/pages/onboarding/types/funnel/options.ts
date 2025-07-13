const opt = (key: string, label: string) => ({ code: key, label: label });

// Step 1
export const HOUSE_INFO_OPTIONS = {
  HOUSING_TYPES: {
    OFFICETEL: opt('OFFICETEL', '오피스텔'),
    VILLA: opt('VILLA', '빌라/오피스텔'),
    APARTMENT: opt('APARTMENT', '아파트'),
    ETC: opt('ETC', '그 외'),
  },
  ROOM_TYPES: {
    OPEN_ONE_ROOM: opt('OPEN_ONE_ROOM', '오픈형 원룸'),
    SEPARATED_ONE_ROOM: opt('SEPARATED_ONE_ROOM', '분리형 원룸'),
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
    RESTING: opt('RELAXING', '휴식형'),
    WORK_OFFICE: opt('REMOTE_WORK', '재택근무형'),
    HOME_CAFE: opt('HOME_THEATER', '영화 감상형'),
    MOVIE: opt('HOME_CAFE', '홈카페형'),
  },
  BED_TYPE: {
    SINGLE: opt('SINGLE', '싱글'),
    SUPER_SINGLE: opt('SUPER_SINGLE', '슈퍼싱글'),
    DOUBLE: opt('DOUBLE', '더블'),
    QUEEN_ABOVE: opt('QUEEN_OVER', '퀸 이상'),
  },
  CLOSET_TYPE: {
    HANGER: opt('HANGER', '행거'),
    FURNITURE: opt('FURNITURE', '가구'),
  },
  OTHER_FURNITURES: {
    DESK: opt('DESK', '책상'),
    CLOSET: opt('CLOSET', '옷장'),
    TABLE_CHAIRS: opt('TABLE_CHAIRS', '식탁, 의자'),
    SOFA: opt('SOFA', '소파'),
    DRAWER: opt('DRAWER', '수납장'),
    MOVABLE_TV: opt('MOVABLE_TV', '이동식 TV'),
  },
} as const;

// HOUSE_INFO_OPTIONS 개별 타입 추출
/*
ex)
HouseType = "OFFICETEL" | "VILLA" | "APARTMENT" | "ETC" (4개 리터럴 타입)
houseType?: HouseType -> houseType은 HouseType | undefined
*/
export type HouseType =
  (typeof HOUSE_INFO_OPTIONS.HOUSING_TYPES)[keyof typeof HOUSE_INFO_OPTIONS.HOUSING_TYPES]['code'];
export type RoomType =
  (typeof HOUSE_INFO_OPTIONS.ROOM_TYPES)[keyof typeof HOUSE_INFO_OPTIONS.ROOM_TYPES]['code'];
export type RoomSize =
  (typeof HOUSE_INFO_OPTIONS.AREA_TYPES)[keyof typeof HOUSE_INFO_OPTIONS.AREA_TYPES]['code'];

// MAIN_ACTIVITY_OPTIONS 개별 타입 추출
export type PrimaryUsage =
  (typeof MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE)[keyof typeof MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE]['code'];
export type BedType =
  (typeof MAIN_ACTIVITY_OPTIONS.BED_TYPE)[keyof typeof MAIN_ACTIVITY_OPTIONS.BED_TYPE]['code'];
export type ClosetType =
  (typeof MAIN_ACTIVITY_OPTIONS.CLOSET_TYPE)[keyof typeof MAIN_ACTIVITY_OPTIONS.CLOSET_TYPE]['code'];
export type OtherFurnitures =
  (typeof MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES)[keyof typeof MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES]['code'];
