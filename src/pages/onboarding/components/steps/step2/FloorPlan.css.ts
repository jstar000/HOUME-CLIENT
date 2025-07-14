import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0 2.4rem 0',
});

export const gridbox = style({
  width: 'fit-content',
  height: 'fit-content',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: '1.2rem',
  columnGap: '1.1rem',
});

export const buttonContainer = style({
  display: 'flex',
  width: '100%',
  marginBottom: '2rem',
});
