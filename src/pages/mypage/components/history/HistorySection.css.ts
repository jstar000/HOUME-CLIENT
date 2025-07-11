import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem',
  padding: '2.4rem 2rem',
  minWidth: '37.5rem',
  backgroundColor: colorVars.color.gray100,
});
