import { style } from '@vanilla-extract/css';
import { fontStyle } from '@/shared/styles/fontStyle';
import { colorVars } from '@/shared/styles/tokens/color.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const landingImage = style({
  width: '37.5rem',
  height: '8rem',
  marginBottom: '4rem',
  backgroundColor: colorVars.color.gray100,
});

export const headingText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.4rem',
  width: '33.5rem',
  height: '6rem',
  textAlign: 'center',
  marginBottom: '4rem',
  ...fontStyle('heading_sb_18'),
});

export const stepLandImage = style({
  width: '37.5rem',
  height: '22rem',
  backgroundColor: colorVars.color.gray100,
  marginBottom: '4rem',
});

export const imageGap = style({
  marginTop: '2rem',
});

export const resultLandingImage = style([
  landingImage,
  {
    marginTop: '12rem',
  },
]);

export const resultLandImage = style([
  stepLandImage,
  {
    marginTop: '4rem',
    marginBottom: '4rem',
  },
]);
