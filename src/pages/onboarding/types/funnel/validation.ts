import type { HouseType, OtherFurnitures, RoomType } from './options';

export const HOUSE_INFO_VALIDATION = {
  restrictedValues: {
    houseType: ['APARTMENT', 'ETC'] as HouseType[],
    roomType: ['TWO_ROOM', 'THREE_ROOM_OVER'] as RoomType[],
  },
  messages: {
    houseType:
      '현재 아파트, 그 외 유형은 지원하지 않아요.\n점차 확대될 예정이에요.',
    roomType:
      '현재 투룸, 쓰리룸 이상 유형은 지원하지 않아요.\n점차 확대될 예정이에요.',
  },
} as const;

export const MAIN_ACTIVITY_VALIDATION = {
  combinationRules: {
    RESTING: {
      requiredFurnitures: ['SOFA'] as OtherFurnitures[],
    },
    WORK_OFFICE: {
      requiredFurnitures: ['DESK'] as OtherFurnitures[],
    },
    HOME_CAFE: {
      requiredFurnitures: ['TABLE_CHAIRS'] as OtherFurnitures[],
    },
    HOME_THEATER: {
      requiredFurnitures: ['MOVABLE_TV'] as OtherFurnitures[],
    },
  },
};
