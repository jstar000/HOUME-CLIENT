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
  maxWidth: '37.5rem',
  padding: '0rem 2.4rem 2rem 2.4rem',
  backgroundColor: colorVars.color.gray000,
  borderRadius: '30px 30px 0 0',
  willChange: 'transform',
  transition: 'transform 0.6s ease-in-out ',
  zIndex: zIndex.sheet,
  overflow: 'hidden',
});

export const sheetWrapperExpanded = style({
  transform: 'translate(-50%, 0)',
});

export const sheetWrapperCollapsed = style({
  transform: 'translate(-50%, 100%)',
});

export const imageArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  alignItems: 'center',
  justifyContent: 'center',
});

export const dragHandleContainer = style({
  display: 'flex',
  height: '2.8rem',
  alignItems: 'center',
  justifyContent: 'center',
});

export const infoText = style({
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
});

export const buttonGroup = style({
  display: 'flex',
  gap: '1.2rem',
  marginTop: '3.2rem',
});
