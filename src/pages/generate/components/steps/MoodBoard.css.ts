import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 2rem',
});

export const gridbox = style({
  width: 'fit-content',
  height: 'fit-content',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: '1.2rem',
  columnGap: '1.1rem',
  justifyContent: 'center',
  alignContent: 'center',
});
