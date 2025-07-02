import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('html, body', {
  fontFamily: vars.font.family.pretendard,
  backgroundColor: vars.color.gray050,
  color: vars.color.gray999,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  overflowWrap: 'break-word',
  minHeight: '100%',
});
