import { http, HttpResponse } from 'msw';

// request()는 response.data.data를 반환하므로 BaseResponse<T> 형태로 감싸야 함
// BaseResponse: { code: number; message: string; data: T }
export const handlers = [
  http.get('*/api/v1/housing-options', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        houseTypes: [
          { code: 'APARTMENT', label: '아파트' },
          { code: 'OFFICETEL', label: '오피스텔' },
        ],
        roomTypes: [
          { code: 'ONE_ROOM', label: '원룸' },
          { code: 'TWO_ROOM', label: '투룸' },
        ],
        areaTypes: [
          { code: 'AREA_10', label: '10평대' },
          { code: 'AREA_20', label: '20평대' },
        ],
      },
    });
  }),
];
