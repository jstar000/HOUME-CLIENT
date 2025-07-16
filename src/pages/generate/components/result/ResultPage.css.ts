import { colorVars } from '@styles/tokens/color.css';
import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { zIndex } from '@/shared/styles/tokens/zIndex';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '66.7rem',
  width: '100%',
});

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2.4rem',
  padding: '1.6rem 2rem 0 2rem',
  marginBottom: '1.2rem',
  width: '100%',
});

export const infoSection = style({
  backgroundColor: colorVars.color.primary_light3,
  padding: '1.2rem 1.6rem',
  borderRadius: '12px',
  width: '33.5rem',
});

export const infoText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray900,
});

export const resultSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  marginBottom: '2.4rem',
});

export const imgArea = style({
  width: '33.5rem',
  height: '22rem',
  borderRadius: '16px',
  objectFit: 'cover', // 비율 유지하며 영역 완전히 채움(이미지 잘릴 수 있음)
  objectPosition: 'center', // 이미지 중앙 부분 표시
});

export const buttonGroup = style({
  display: 'flex',
  gap: '1.1rem',
  justifyContent: 'center',
});

export const curationSection = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '4rem',
  backgroundColor: colorVars.color.gray100,
  width: '100%',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  textAlign: 'center',
});

export const headerText = style({
  ...fontStyle('heading_sb_18'),
  color: colorVars.color.gray900,
});

export const bodyText = style({
  ...fontStyle('body_r_14'),
  color: colorVars.color.gray600,
});

export const premiumContentSection = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const unlockSection = style({
  position: 'absolute',
  top: '42%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: zIndex.blurButton,
  width: '12.1rem',
  height: '4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.2rem',
});
