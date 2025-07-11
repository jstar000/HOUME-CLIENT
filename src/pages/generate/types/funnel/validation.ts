import type { HouseType, RoomType } from './options';

export const HOUSE_INFO_VALIDATION = {
  restrictedValues: {
    houseType: ['APARTMENT', 'ETC'] as HouseType[],
    roomType: ['DUPLEX', 'TWO_ROOM', 'THREE_ROOM_OVER'] as RoomType[],
  },
  messages: {
    houseType:
      '현재 아파트, 그 외 유형은 지원하지 않아요.\n점차 확대될 예정이에요.',
    roomType:
      '현재 투룸, 쓰리룸 이상 유형은 지원하지 않아요.\n점차 확대될 예정이에요.',
  },
} as const;
