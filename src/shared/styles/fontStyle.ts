import { fontVars } from '@styles/tokens/font.css';
import { fontVars as fontVarsV2 } from '@styles/tokensV2/font.css';

type FontKeys = Exclude<keyof typeof fontVars, 'family'>;

export const fontStyle = (key: FontKeys) => {
  const style = fontVars[key];
  if (!style) throw new Error(`Invalid font key: ${key}`);

  return {
    fontFamily: fontVars.family.pretendard,
    fontSize: style.size,
    fontWeight: style.weight,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  };
};

const v2 = fontVarsV2.font;
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
