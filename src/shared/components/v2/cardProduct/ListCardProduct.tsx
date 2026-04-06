import { useEffect, useState } from 'react';

import CardImage from '@assets/images/cardExImg.svg?url';

import {
  createCardClickHandler,
  getColorChips,
  getPriceTexts,
  type CardClickArea,
} from '@utils/productCardUtils';

import * as styles from './ListCardProduct.css';
import IconButton from '../button/IconButton';

type CardSize = 's' | 'm';

interface ListCardProductProps {
  cardSize?: CardSize;
  title: string;
  brand?: string;
  imageUrl?: string;
  isSaved: boolean;
  onToggleSave: () => void;
  linkHref?: string;
  disabled?: boolean;
  onLinkClick?: () => void;
  onCardClick?: (area?: CardClickArea) => void;
  enableWholeCardLink?: boolean;
  originalPrice?: number;
  discountRate?: number;
  discountPrice?: number;
  colorHexes?: string[];
}

const ListCardProduct = ({
  cardSize = 'm',
  title,
  imageUrl,
  isSaved,
  onToggleSave,
  linkHref,
  disabled = false,
  onLinkClick,
  onCardClick,
  enableWholeCardLink = false,
  originalPrice,
  discountRate,
  discountPrice,
  colorHexes,
}: ListCardProductProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [imageUrl]);

  const { visibleColors, extraColorCount } = getColorChips(colorHexes);
  const { originalPriceText, discountPriceText, discountRateText } =
    getPriceTexts(originalPrice, discountPrice, discountRate);

  const { handleWrapperClick, handleWrapperKeyDown } = createCardClickHandler({
    onCardClick,
    enableWholeCardLink,
    linkHref,
  });

  return (
    <div
      className={`${styles.wrapper({ size: cardSize })} ${
        enableWholeCardLink ? styles.clickable : ''
      }`}
      onClick={handleWrapperClick}
      onKeyDown={handleWrapperKeyDown}
      role={enableWholeCardLink && linkHref ? 'link' : undefined}
      tabIndex={enableWholeCardLink && linkHref ? 0 : undefined}
      aria-label={enableWholeCardLink ? `${title} 상품 링크로 이동` : undefined}
    >
      <section className={styles.imgSection()} data-click-area="image">
        {!isLoaded && <div className={styles.skeleton} />}
        <img
          className={styles.cardImage({ loaded: isLoaded, size: cardSize })}
          src={imageUrl || CardImage}
          alt="카드 이미지"
          onLoad={() => setIsLoaded(true)}
        />
      </section>

      <section className={styles.infoSection({ size: cardSize })}>
        {/* 색상 정보 */}
        {(visibleColors.length > 0 || extraColorCount > 0) && (
          <div className={styles.colorRow}>
            {visibleColors.map((hex, index) => (
              <div className={styles.colorChipContainer} key={index}>
                <span
                  key={`${hex}-${index}`}
                  className={styles.colorChip}
                  style={{ backgroundColor: hex }}
                  aria-hidden
                />
              </div>
            ))}
            {extraColorCount > 0 && (
              <span className={styles.colorChipCount}>+{extraColorCount}</span>
            )}
          </div>
        )}

        {/* 브랜드, 상품 이름 */}
        <div className={styles.productInfo} data-click-area="title">
          <p className={styles.productText}>{title}</p>
        </div>

        {/* 가격 정보 */}
        {(originalPriceText || discountPriceText) && (
          <div className={styles.priceSection}>
            {originalPriceText && (
              <p className={styles.originalPriceText}>{originalPriceText}</p>
            )}
            {discountPriceText && (
              <div className={styles.discountRow}>
                {discountRateText && (
                  <span className={styles.discountRateText}>
                    {discountRateText}
                  </span>
                )}
                <span className={styles.discountPriceText}>
                  {discountPriceText}
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 아이콘 버튼 */}
      <div
        className={styles.btnContainer()}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        role="presentation"
      >
        <IconButton
          name="Link"
          size="S"
          disabled={disabled}
          onClick={onLinkClick}
          aria-label={'상품 링크로 이동'}
        />
        <IconButton
          name={isSaved ? 'HeartFillColor' : 'HeartStrokeGray'}
          size="S"
          disabled={disabled}
          onClick={onToggleSave}
        />
      </div>
    </div>
  );
};
export default ListCardProduct;
