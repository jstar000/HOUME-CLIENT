import { style } from '@vanilla-extract/css';
import { colorVars } from '@styles/tokens/color.css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { zIndex } from '@/shared/styles/tokens/zIndex';

export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: zIndex.backdrop,
  opacity: 0,
  visibility: 'hidden',
  touchAction: 'none',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
});

export const backdropVisible = style({
  opacity: 1,
  visibility: 'visible',
  pointerEvents: 'auto',
});

export const sheetWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 100%)',
  width: '100%',
  maxWidth: '43rem',
  padding: '0rem 2.4rem 2rem 2.4rem',
  backgroundColor: colorVars.color.gray000,
  borderRadius: '30px 30px 0 0',
  willChange: 'transform',
  transition: 'transform 0.6s ease-in-out ',
  zIndex: zIndex.sheet,
  overflow: 'hidden',
  userSelect: 'none', // 텍스트 선택 방지

  // 드래그 중일 때만 transition 비활성화
  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

export const sheetWrapperExpanded = style({
  transform: 'translate(-50%, 0)',
});

export const sheetWrapperCollapsed = style({
  transform: 'translate(-50%, 100%)',
});

export const contentWapper = style({
  display: 'flex',
  flexDirection: 'column',
  pointerEvents: 'none',
  alignItems: 'center',
  maxWidth: '37.5rem',
  margin: '0 auto',
});

export const dragHandleContainer = style({
  display: 'flex',
  height: '2.8rem',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2rem',
  pointerEvents: 'auto', // 드래그 핸들은 클릭 가능하게
});

export const infoTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '33.5rem',
  gap: '1.2rem',
  marginBottom: '3.2rem',
  pointerEvents: 'auto',
});

export const infoText = style({
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
});

export const descriptionText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
});

export const fieldWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginBottom: '4.8rem',
  pointerEvents: 'auto',
  width: '100%', // 전체 너비 사용
  alignItems: 'center', // 가운데 정렬
});

export const fieldContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%', // 전체 너비 사용
  justifyContent: 'center', // 가운데 정렬
});

export const title = style({
  ...fontStyle('title_sb_15'),
  color: colorVars.color.gray800,
  width: '5.6rem',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  pointerEvents: 'auto',
});
