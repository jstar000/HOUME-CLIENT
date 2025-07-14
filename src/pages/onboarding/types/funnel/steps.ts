import type {
  HouseType,
  RoomType,
  RoomSize,
  PrimaryUsage,
  BedType,
  OtherFurnitures,
} from './options';

// Funnel Step 정의
export type ImageGenerateSteps = {
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
    otherFurnitures?: OtherFurnitures[];
  };
};

export type CompletedHouseInfo = Required<ImageGenerateSteps['HouseInfo']>;
export type CompletedHouseStructure = Required<
  ImageGenerateSteps['HouseStructure']
>;
export type CompletedInteriorTaste = Required<
  ImageGenerateSteps['InteriorTaste']
>;
// MainActivity(STEP4)의 '기타가구'는 필수 입력란이 아니므로 추후 수정 예정
export type CompletedMainActivity = Required<
  ImageGenerateSteps['MainActivity']
>;
