import type {
  HouseType,
  RoomType,
  RoomSize,
  PrimaryUsage,
  BedType,
  ClosetType,
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
    closetType?: ClosetType;
    otherFurnitures?: OtherFurnitures[];
  };
};

// ImageGenerateSteps와 직접적으로 연관된 타입들이며, 퍼널 단계와 관련된 모든 타입이 한 곳에 모이므로 응집성 높아짐,
// 아래 타입들은 ImageGenerateSteps를 기반으로 생성되는 파생 타입이므로 의존성도 있음 -> steps 파일 하나에 모두 선언
// Required<>: 모든 속성을 필수로 만드는 TS utility type
export type CompleteHouseInfo = Required<ImageGenerateSteps['HouseInfo']>;
export type CompleteHouseStructure = Required<
  ImageGenerateSteps['HouseStructure']
>;
export type CompleteInteriorTaste = Required<
  ImageGenerateSteps['InteriorTaste']
>;
// MainActivity(STEP4)의 '기타가구'는 필수 입력란이 아니므로 추후 수정 예정
export type CompleteMainActivity = Required<ImageGenerateSteps['MainActivity']>;
