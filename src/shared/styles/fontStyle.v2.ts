import { fontVarsV2 } from '@styles/tokens/font.v2.css';

const v2 = fontVarsV2.fontV2;
type FontV2Keys = Exclude<keyof typeof v2, 'family'>;

export const fontStyleV2 = (key: FontV2Keys) => {
  const style = v2[key];
  if (!style || !('size' in style))
    throw new Error(`Invalid font v2 key: ${key}`);

  return {
    fontFamily: v2.family.pretendard,
    fontSize: style.size,
    fontWeight: style.weight,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  };
};
