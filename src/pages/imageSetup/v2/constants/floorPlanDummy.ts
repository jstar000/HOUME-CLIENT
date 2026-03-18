import type {
  FilterCategory,
  FloorPlanData,
  RecentFloorPlanData,
} from '../types/floorPlan';

export const DUMMY_FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'residenceType',
    label: '주거 형태',
    options: [
      { id: 'ALL', label: '전체' },
      { id: 'OFFICETEL', label: '오피스텔' },
      { id: 'VILLA', label: '빌라/다세대' },
      { id: 'APARTMENT', label: '아파트' },
      { id: 'ETC', label: '그 외' },
    ],
  },
  {
    id: 'layoutType',
    label: '구조',
    options: [
      { id: 'ALL', label: '전체' },
      { id: 'OPEN_ONE_ROOM', label: '오픈형 원룸' },
      { id: 'SEPARATE_ONE_ROOM', label: '분리형 원룸' },
      { id: 'DUPLEX', label: '복층형' },
      { id: 'TWO_ROOM', label: '투룸' },
      { id: 'THREE_ROOM_PLUS', label: '쓰리룸 이상' },
      { id: 'ETC', label: '그 외' },
    ],
  },
  {
    id: 'areaSize',
    label: '평형',
    options: [
      { id: 'ALL', label: '전체' },
      { id: 'UNDER_4', label: '4평 이하' },
      { id: 'FROM_5_TO_10', label: '5-10평' },
      { id: 'TENS', label: '10평대' },
      { id: 'TWENTIES', label: '20평대' },
      { id: 'OVER_30', label: '30평 이상' },
    ],
  },
];

export const DUMMY_FLOOR_PLANS: FloorPlanData[] = [
  {
    id: 1,
    name: '일자형 원룸',
    imageUrls: [
      'https://placehold.co/343x343?text=1-A',
      'https://placehold.co/343x343?text=1-B',
    ],
    isLatest: true,
  },
  {
    id: 2,
    name: '분리형 원룸',
    imageUrls: ['https://placehold.co/343x343?text=2-A'],
    isLatest: false,
  },
  {
    id: 3,
    name: 'ㄱ자형 투룸',
    imageUrls: [
      'https://placehold.co/343x343?text=3-A',
      'https://placehold.co/343x343?text=3-B',
      'https://placehold.co/343x343?text=3-C',
    ],
    isLatest: false,
  },
  {
    id: 4,
    name: '복층형 쓰리룸',
    imageUrls: ['https://placehold.co/343x343?text=4-A'],
    isLatest: false,
  },
  {
    id: 5,
    name: '오픈형 원룸',
    imageUrls: [
      'https://placehold.co/343x343?text=5-A',
      'https://placehold.co/343x343?text=5-B',
    ],
    isLatest: false,
  },
  {
    id: 6,
    name: '소형 원룸',
    imageUrls: ['https://placehold.co/343x343?text=6-A'],
    isLatest: false,
  },
  {
    id: 7,
    name: '복층형 투룸',
    imageUrls: ['https://placehold.co/343x343?text=7-A'],
    isLatest: false,
  },
  {
    id: 8,
    name: '대형 아파트',
    imageUrls: [
      'https://placehold.co/343x343?text=8-A',
      'https://placehold.co/343x343?text=8-B',
    ],
    isLatest: false,
  },
];

// 최근 생성 도면 (별도 API 응답) — null로 시작, 테스트 시 값 넣어서 확인
export const DUMMY_RECENT_FLOOR_PLAN: RecentFloorPlanData | null = null;
