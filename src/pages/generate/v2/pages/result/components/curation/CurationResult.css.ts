import { style } from '@vanilla-extract/css';

import { unitVars } from '@styles/tokensV2/unit.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const mainArea = style({
  display: 'flex',
  flexDirection: 'column',
  padding: unitVars.unit.gapPadding['500'],
  width: '100%',
});

/** 하단: 가구 큐레이션 ↔ 이미지 선호도 조사 분기 */
export const bottomSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
