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
});
