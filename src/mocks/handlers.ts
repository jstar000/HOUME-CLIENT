/**
 * MSW가 사용할 가짜 API 응답 정의
 */

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

  // POST /api/v2/generated-images/generate/gemini — 단일 이미지 (B안)
  http.post('*/api/v2/generated-images/generate/gemini', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        imageId: 1,
        imageUrl: 'https://example.com/image.jpg',
        isMirror: false,
        equilibrium: 'BALANCE',
        houseForm: 'APARTMENT',
        tagName: '모던',
        name: '하우미 이미지',
      },
    });
  }),

  // POST /api/v3/generated-images/generate/gemini — 다중 이미지 (A안)
  http.post('*/api/v3/generated-images/generate/gemini', () => {
    return HttpResponse.json({
      code: 200,
      message: 'OK',
      data: {
        imageInfoResponses: [
          {
            imageId: 1,
            imageUrl: 'https://example.com/image1.jpg',
            isMirror: false,
            equilibrium: 'BALANCE',
            houseForm: 'APARTMENT',
            tagName: '모던',
            name: '하우미 이미지 1',
          },
        ],
      },
    });
  }),
];
