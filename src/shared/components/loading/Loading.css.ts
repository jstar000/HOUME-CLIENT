import { style } from '@vanilla-extract/css';
import { colorVars } from '@styles/tokens/color.css';
import { fontStyle } from '@/shared/styles/fontStyle';

export const loadingOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
});

export const loadingContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
});

export const loadingSpinner = style({
  width: '4rem',
  height: '4rem',
  border: `3px solid ${colorVars.color.primary_light2}`,
  borderTop: `3px solid ${colorVars.color.primary}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',

  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

export const loadingText = style({
  color: colorVars.color.primary,
  ...fontStyle('body_m_16'),
  textAlign: 'center',
});
