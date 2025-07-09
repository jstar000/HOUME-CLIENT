import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';
import { colorVars } from '@styles/tokens/color.css';
import { fontVars } from '@styles/tokens/font.css';
import '@styles/reset.css.ts';
import '@styles/fontFace.css';

// 레이아웃 관련 CSS 변수
export const layoutVars = createGlobalTheme(':root', {
  minWidth: '375px',
  maxWidth: '430px',
  height: '100dvh',
});

// Root 요소 스타일
globalStyle('#root', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

// HTML 요소 스타일
globalStyle('html', {
  scrollbarWidth: 'none', // Firefox
  height: '100%',
});

// Webkit 기반 브라우저의 스크롤바 숨김
globalStyle('html::-webkit-scrollbar', {
  display: 'none',
});

// Body 요소 스타일
globalStyle('body', {
  fontFamily: fontVars.family.pretendard,
  backgroundColor: colorVars.color.gray050,
  color: colorVars.color.gray999,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  overflowWrap: 'break-word',
  height: '100%',
  minWidth: layoutVars.minWidth,
  maxWidth: layoutVars.maxWidth,
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  scrollBehavior: 'smooth',
  boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.25)',
  scrollbarWidth: 'none', // Firefox
});

// Body의 스크롤바 숨김
globalStyle('body::-webkit-scrollbar', {
  display: 'none',
});
