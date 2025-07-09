// Step1
export const HOUSE_INFO_OPTIONS = {
  HOUSE_TYPE: {
    OFFICE: 'office',
    VILLA: 'villa',
    APARTMENT: 'apartment',
    OTHER: 'other',
  },
  ROOM_TYPE: {
    OPEN_ONE: 'openOne',
    SEPARATE_ONE: 'separateOne',
    DUPLEX: 'duplex',
    TWO: 'two',
    THREE_ABOVE: 'threeAbove',
  },
  ROOM_SIZE: {
    FIVE_OR_LESS: 'fiveOrLess',
    SIX_TO_TEN: 'sixToTen',
    TEN_TO_FIFTEEN: 'tenToFifteen',
    SIXTEEN_ABOVE: 'sixteenAbove',
  },
} as const;

// Step2
export const MAIN_ACTIVITY_OPTIONS = {
  PRIMARY_USAGE: {
    RESTING: 'resting',
    WORK_OFFICE: 'workOffice',
    HOME_CAFE: 'homeCafe',
    MOVIE: 'movie',
  },
  BED_TYPE: {
    SINGLE: 'single',
    SUPER_SINGLE: 'superSingle',
    DOUBLE: 'double',
    QUEEN_ABOVE: 'queenAbove',
  },
  CLOSET_TYPE: {
    HANGER: 'hanger',
    FURNITURE: 'furniture',
  },
  OTHER_FURNITURES: {
    DESK: 'desk',
    MOVABLE_TV: 'movableTV',
    DRAWER: 'drawer',
    TABLE_CHAIR: 'tableChair',
  },
} as const;

// HOUSE_INFO_OPTIONS 개별 타입 추출
export type HouseType =
  (typeof HOUSE_INFO_OPTIONS.HOUSE_TYPE)[keyof typeof HOUSE_INFO_OPTIONS.HOUSE_TYPE];
export type RoomType =
  (typeof HOUSE_INFO_OPTIONS.ROOM_TYPE)[keyof typeof HOUSE_INFO_OPTIONS.ROOM_TYPE];
export type RoomSize =
  (typeof HOUSE_INFO_OPTIONS.ROOM_SIZE)[keyof typeof HOUSE_INFO_OPTIONS.ROOM_SIZE];

// MAIN_ACTIVITY_OPTIONS 개별 타입 추출
export type PrimaryUsage =
  (typeof MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE)[keyof typeof MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE];
export type BedType =
  (typeof MAIN_ACTIVITY_OPTIONS.BED_TYPE)[keyof typeof MAIN_ACTIVITY_OPTIONS.BED_TYPE];
export type ClosetType =
  (typeof MAIN_ACTIVITY_OPTIONS.CLOSET_TYPE)[keyof typeof MAIN_ACTIVITY_OPTIONS.CLOSET_TYPE];
export type OtherFurnitures =
  (typeof MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES)[keyof typeof MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES];

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
