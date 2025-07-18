import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const wrapper = style({
  width: '100%',
  height: '2.8rem',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colorVars.color.gray300,
  touchAction: 'none', // 터치 스크롤 방지
  cursor: 'grab',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent', // iOS 터치 하이라이트 제거
  WebkitTouchCallout: 'none', // iOS 콜아웃 메뉴 방지
  position: 'relative',
  zIndex: 1, // 다른 요소보다 위에 위치
});
