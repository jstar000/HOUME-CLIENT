import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const contentWrapper = style({
  backgroundColor: colorVars.color.gray000,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: '2.4rem',
});
