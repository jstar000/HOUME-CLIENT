import type {
  FilterCategory,
  FloorPlanData,
  RecentFloorPlanData,
} from '../types/floorPlan';

export const DUMMY_FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: 'houseType',
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
    id: 'structure',
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
    id: 'areaType',
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
    name: 'A타입 · 8평',
    houseType: { id: 'OFFICETEL', label: '오피스텔' },
    structure: { id: 'OPEN_ONE_ROOM', label: '오픈형 원룸' },
    areaType: { id: 'FROM_5_TO_10', label: '5-10평' },
    thumbnailUrl: 'https://placehold.co/164x164?text=A-8',
    views: [
      {
        viewId: 1,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=A-8-front',
      },
    ],
  },
  {
    id: 2,
    name: 'B타입 · 12평',
    houseType: { id: 'OFFICETEL', label: '오피스텔' },
    structure: { id: 'SEPARATE_ONE_ROOM', label: '분리형 원룸' },
    areaType: { id: 'TENS', label: '10평대' },
    thumbnailUrl: 'https://placehold.co/164x164?text=B-12',
    views: [
      {
        viewId: 2,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=B-12-front',
      },
      {
        viewId: 3,
        viewLabel: '왼쪽',
        imageUrl: 'https://placehold.co/343x343?text=B-12-left',
      },
    ],
  },
  {
    id: 3,
    name: 'C타입 · 15평',
    houseType: { id: 'VILLA', label: '빌라/다세대' },
    structure: { id: 'TWO_ROOM', label: '투룸' },
    areaType: { id: 'TENS', label: '10평대' },
    thumbnailUrl: 'https://placehold.co/164x164?text=C-15',
    views: [
      {
        viewId: 4,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=C-15-front',
      },
    ],
  },
  {
    id: 4,
    name: 'D타입 · 22평',
    houseType: { id: 'APARTMENT', label: '아파트' },
    structure: { id: 'THREE_ROOM_PLUS', label: '쓰리룸 이상' },
    areaType: { id: 'TWENTIES', label: '20평대' },
    thumbnailUrl: 'https://placehold.co/164x164?text=D-22',
    views: [
      {
        viewId: 5,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=D-22-front',
      },
      {
        viewId: 6,
        viewLabel: '왼쪽',
        imageUrl: 'https://placehold.co/343x343?text=D-22-left',
      },
      {
        viewId: 7,
        viewLabel: '오른쪽',
        imageUrl: 'https://placehold.co/343x343?text=D-22-right',
      },
    ],
  },
  {
    id: 5,
    name: 'E타입 · 6평',
    houseType: { id: 'OFFICETEL', label: '오피스텔' },
    structure: { id: 'OPEN_ONE_ROOM', label: '오픈형 원룸' },
    areaType: { id: 'FROM_5_TO_10', label: '5-10평' },
    thumbnailUrl: 'https://placehold.co/164x164?text=E-6',
    views: [
      {
        viewId: 8,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=E-6-front',
      },
    ],
  },
  {
    id: 6,
    name: 'F타입 · 3평',
    houseType: { id: 'ETC', label: '그 외' },
    structure: { id: 'OPEN_ONE_ROOM', label: '오픈형 원룸' },
    areaType: { id: 'UNDER_4', label: '4평 이하' },
    thumbnailUrl: 'https://placehold.co/164x164?text=F-3',
    views: [
      {
        viewId: 9,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=F-3-front',
      },
    ],
  },
  {
    id: 7,
    name: 'G타입 · 18평',
    houseType: { id: 'VILLA', label: '빌라/다세대' },
    structure: { id: 'DUPLEX', label: '복층형' },
    areaType: { id: 'TENS', label: '10평대' },
    thumbnailUrl: 'https://placehold.co/164x164?text=G-18',
    views: [
      {
        viewId: 10,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=G-18-front',
      },
      {
        viewId: 11,
        viewLabel: '오른쪽',
        imageUrl: 'https://placehold.co/343x343?text=G-18-right',
      },
    ],
  },
  {
    id: 8,
    name: 'H타입 · 35평',
    houseType: { id: 'APARTMENT', label: '아파트' },
    structure: { id: 'THREE_ROOM_PLUS', label: '쓰리룸 이상' },
    areaType: { id: 'OVER_30', label: '30평 이상' },
    thumbnailUrl: 'https://placehold.co/164x164?text=H-35',
    views: [
      {
        viewId: 12,
        viewLabel: '정면',
        imageUrl: 'https://placehold.co/343x343?text=H-35-front',
      },
    ],
  },
];

// null로 시작 — 테스트 시 값 넣어서 확인
export const DUMMY_RECENT_FLOOR_PLAN: RecentFloorPlanData | null = null;
