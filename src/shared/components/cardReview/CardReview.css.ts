import { style } from '@vanilla-extract/css';
import { colorVars } from '@/shared/styles/tokens/color.css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const cardReview = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '31.5rem',
  padding: '3.2rem',
  gap: '1.6rem',
  borderRadius: '1.6rem',
  background: colorVars.color.gray000,
});

//제목 텍스트
export const title = style({
  ...fontStyle('title_sb_15'),
  color: colorVars.color.primary,
});

// 본문 내용 텍스트
export const body = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray700,
  alignSelf: 'stretch',
});

// 사용자 이름 텍스트
export const username = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray500,
  textAlign: 'right',
  alignSelf: 'stretch',
});
