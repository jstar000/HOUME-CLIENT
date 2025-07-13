import { globalFontFace } from '@vanilla-extract/css';

globalFontFace('Pretendard', {
  src: `url(/fonts/Pretendard-Regular.woff2)`,
  fontWeight: '400',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

globalFontFace('Pretendard', {
  src: `url(/fonts/Pretendard-Medium.woff2)`,
  fontWeight: '500',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

globalFontFace('Pretendard', {
  src: `url(/fonts/Pretendard-SemiBold.woff2)`,
  fontWeight: '600',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});
