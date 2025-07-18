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
  touchAction: 'pan-y',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
});

export const backdropVisible = style({
  opacity: 1,
  visibility: 'visible',
});

export const sheetWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 100%)',
  width: '100%',
  maxWidth: '44rem',
  padding: '0rem 2.4rem 2rem 2.4rem',
  backgroundColor: colorVars.color.gray000,
  borderRadius: '30px 30px 0 0',
  willChange: 'transform',
  transition: 'transform 0.3s ease-in-out',
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

// 열기
export const sheetWrapperExpanded = style({
  transform: 'translate(-50%, 0)',
});

// 닫기
export const sheetWrapperCollapsed = style({
  transform: 'translate(-50%, 100%)',
});

export const contentWapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
});

export const dragHandleContainer = style({
  display: 'flex',
  height: '2.8rem',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2rem',
});

export const infoTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1.2rem',
  marginBottom: '3.2rem',
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
  width: '100%',
  alignItems: 'center',
});

export const fieldContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
});

export const title = style({
  ...fontStyle('title_sb_15'),
  color: colorVars.color.gray800,
  minWidth: '5.6rem',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});
