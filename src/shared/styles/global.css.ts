import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';
import { colorVars } from '@styles/tokens/color.css';
import { fontVars } from '@styles/tokens/font.css';
import '@styles/reset.css.ts';
import '@styles/fontFace.css';

/**
 * 프로젝트 글로벌 스타일 설정
 * reset.css.ts의 기본 초기화 위에 프로젝트 특화 스타일을 정의합니다.
 *
 * 주요 기능:
 * - 반응형 레이아웃 설정 (모바일 중심)
 * - 스크롤바 커스터마이징
 * - 앱 컨테이너 스타일링
 */

/* ===== 레이아웃 CSS 변수 정의 ===== */
/**
 * 반응형 레이아웃을 위한 전역 CSS 변수
 * 모바일 앱과 같은 고정 너비 레이아웃 구현
 *
 * @property minWidth - 최소 너비 (iPhone SE 기준)
 * @property maxWidth - 최대 너비 (대형 모바일 기준)
 * @property height - 뷰포트 높이 (동적 뷰포트 단위 사용)
 */
export const layoutVars = createGlobalTheme(':root', {
  minWidth: '375px',
  maxWidth: '430px',
  height: '100dvh',
});

/* ===== 앱 루트 컨테이너 ===== */
/**
 * React 앱의 최상위 컨테이너 설정
 * 전체 높이를 차지하며 수직 플렉스 레이아웃 적용
 * 하위 컴포넌트들이 플렉스 아이템으로 배치됨
 */
globalStyle('#root', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

/* ===== HTML 루트 설정 ===== */
/**
 * HTML 요소의 추가 설정
 * - 전체 높이 사용으로 body까지 높이 상속
 * - 스크롤바 숨김으로 모바일 앱 같은 UI 구현
 */
globalStyle('html', {
  height: '100%',
  scrollbarWidth: 'none', // Firefox 스크롤바 숨김
});

/**
 * Webkit 기반 브라우저 스크롤바 숨김
 * Chrome, Safari, Edge 등에서 적용
 */
globalStyle('html::-webkit-scrollbar', {
  display: 'none',
});

/* ===== Body 프로젝트 스타일 ===== */
/**
 * 앱의 메인 컨테이너 역할을 하는 body 스타일
 *
 * 타이포그래피:
 * - Pretendard 폰트 적용
 * - 폰트 스무딩으로 선명한 텍스트 렌더링
 * - 긴 단어 자동 줄바꿈
 *
 * 레이아웃:
 * - 모바일 중심 고정 너비 (375px ~ 430px)
 * - 가운데 정렬로 데스크톱에서도 모바일 뷰 유지
 * - 플렉스 컨테이너로 하위 요소 배치 관리
 *
 * 시각적 효과:
 * - 배경색과 텍스트 색상 설정
 * - 그림자 효과로 앱 영역 구분 (데스크톱에서 효과적)
 * - 부드러운 스크롤 애니메이션
 */
globalStyle('body', {
  // 타이포그래피
  fontFamily: fontVars.family.pretendard,
  color: colorVars.color.gray999,
  WebkitFontSmoothing: 'antialiased', // macOS/iOS 폰트 렌더링 최적화
  MozOsxFontSmoothing: 'grayscale', // Firefox 폰트 렌더링 최적화
  overflowWrap: 'break-word', // 긴 단어 자동 줄바꿈

  // 레이아웃
  minHeight: '100%',
  minWidth: layoutVars.minWidth, // 최소 너비 제한
  maxWidth: layoutVars.maxWidth, // 최대 너비 제한
  marginLeft: 'auto', // 가로 중앙 정렬
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',

  // 시각적 효과
  backgroundColor: colorVars.color.gray000,
  boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.25)', // 앱 영역 그림자
  scrollBehavior: 'smooth', // 부드러운 스크롤
  scrollbarWidth: 'none', // Firefox 스크롤바 숨김
});

/**
 * Body의 Webkit 스크롤바 숨김
 * 모바일 앱 같은 깔끔한 UI 구현
 */
globalStyle('body::-webkit-scrollbar', {
  display: 'none',
});
