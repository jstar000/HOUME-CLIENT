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
  maxWidth: '44rem',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 2rem 2.4rem 2rem',
});

export const gridbox = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
  gap: '1.2rem',
  boxSizing: 'border-box',
});

export const buttonContainer = style({
  display: 'flex',
  width: '100%',
  marginBottom: '2rem',
  position: 'fixed',
  bottom: '0',
});
