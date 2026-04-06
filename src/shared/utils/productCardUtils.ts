export const formatKrw = (value?: number) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return `${value.toLocaleString('ko-KR')}원`;
};

export const getColorChips = (colorHexes?: string[]) => {
  const visibleColors = Array.isArray(colorHexes)
    ? colorHexes.filter(Boolean).slice(0, 3)
    : [];
  const extraColorCount =
    Array.isArray(colorHexes) && colorHexes.length > 3
      ? colorHexes.length - 3
      : 0;
  return { visibleColors: visibleColors, extraColorCount: extraColorCount };
};

export const getPriceTexts = (
  originalPrice?: number,
  discountPrice?: number,
  discountRate?: number
) => {
  return {
    originalPriceText: formatKrw(originalPrice),
    discountPriceText: formatKrw(discountPrice),
    discountRateText:
      typeof discountRate === 'number' && Number.isFinite(discountRate)
        ? `${discountRate}%`
        : null,
  };
};

export type CardClickArea = 'card' | 'image' | 'title';

export const createCardClickHandler = ({
  onCardClick,
  enableWholeCardLink,
  linkHref,
}: {
  onCardClick?: (area?: CardClickArea) => void;
  enableWholeCardLink: boolean;
  linkHref?: string;
}) => ({
  handleWrapperClick: (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const areaElement = target?.closest?.('[data-click-area]') as HTMLElement;
    const area = areaElement?.dataset?.clickArea as CardClickArea | undefined;
    const resolvedArea: CardClickArea =
      area === 'image' || area === 'title' ? area : 'card';

    onCardClick?.(resolvedArea);

    if (!enableWholeCardLink || !linkHref || typeof window === 'undefined')
      return;
    window.open(linkHref, '_blank', 'noopener,noreferrer');
  },

  handleWrapperKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!enableWholeCardLink || !linkHref || typeof window === 'undefined')
      return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onCardClick?.('card');
    window.open(linkHref, '_blank', 'noopener,noreferrer');
  },
});
