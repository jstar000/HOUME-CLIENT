import { useEffect, useState } from 'react';

import CardImage from '@assets/images/cardExImg.svg?url';

import * as styles from './CardProduct.css';
import ActionButton from '../button/actionButton/ActionButton';
import IconButton from '../button/IconButton';
import Icon from '../icon/Icon';

type CardType = 'default' | 'shopping';
type CardClickArea = 'card' | 'image' | 'title';

interface CardProductProps {
  cardType?: CardType;
  title: string;
  brand?: string;
  imageUrl?: string;
  isSaved: boolean;
  onToggleSave: () => void;
  linkHref?: string;
  linkLabel?: string;
  disabled?: boolean;
  onLinkClick?: () => void;
  onCardClick?: (area?: CardClickArea) => void;
  enableWholeCardLink?: boolean;
  originalPrice?: number;
  discountRate?: number;
  discountPrice?: number;
  colorHexes?: string[];
  saveCount?: number;
}

const CardProduct = ({
  cardType = 'default',
  title,
  brand,
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
  saveCount,
}: CardProductProps) => {
  const isDefault = cardType === 'default';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [imageUrl]);

  const formatKrw = (value?: number) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) return null;
    return `${value.toLocaleString('ko-KR')}`;
  };

  const originalPriceText = formatKrw(originalPrice);
  const discountPriceText = formatKrw(discountPrice);
  const discountRateText =
    typeof discountRate === 'number' && Number.isFinite(discountRate)
      ? `${discountRate}%`
      : null;

  const visibleColors = Array.isArray(colorHexes)
    ? colorHexes.filter(Boolean).slice(0, 3)
    : [];
  const extraColorCount =
    Array.isArray(colorHexes) && colorHexes.length > 3
      ? colorHexes.length - 3
      : 0;

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const areaElement = target?.closest?.('[data-click-area]') as HTMLElement;
    const area = areaElement?.dataset?.clickArea as CardClickArea | undefined;
    const resolvedArea: CardClickArea =
      area === 'image' || area === 'title' ? area : 'card';

    onCardClick?.(resolvedArea);

    if (!enableWholeCardLink) return;
    if (!linkHref) return;
    if (typeof window === 'undefined') return;

    window.open(linkHref, '_blank', 'noopener,noreferrer');
  };

  const handleWrapperKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!enableWholeCardLink) return;
    if (!linkHref) return;
    if (typeof window === 'undefined') return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onCardClick?.('card');
    window.open(linkHref, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`${styles.wrapper()} ${
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
          className={styles.cardImage({ loaded: isLoaded })}
          src={imageUrl || CardImage}
          alt="카드 이미지"
          onLoad={() => setIsLoaded(true)}
        />

        <div
          className={styles.linkBtnContainer()}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          role="presentation"
        >
          {isDefault && linkHref && (
            <ActionButton
              variant="solid"
              color="inverse"
              size="XS"
              leftIcon="Link"
              aria-label={'공식 사이트로 이동'}
              onClick={onLinkClick}
            >
              사이트
            </ActionButton>
          )}
        </div>

        <div
          className={styles.saveBtnOverlay}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          role="presentation"
        >
          {isDefault ? (
            <IconButton
              name={isSaved ? 'HeartFillColor' : 'HeartStrokeWhite'}
              size="S"
              disabled={disabled}
              onClick={onToggleSave}
            />
          ) : (
            <IconButton name="ViewDetail" size="S" disabled={disabled} />
          )}
        </div>
      </section>

      <section className={styles.infoSection}>
        {/* 색상 정보 */}
        {(visibleColors.length > 0 || extraColorCount > 0) && isDefault && (
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

        <div className={styles.middleInfoSection}>
          {/* 브랜드, 상품 이름 */}
          <div className={styles.productInfo} data-click-area="title">
            {isDefault && !!brand && (
              <p className={styles.brandText}>{brand}</p>
            )}
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
        </div>

        {/* 저장(하트) 정보 */}
        {isDefault ? (
          typeof saveCount === 'number' &&
          Number.isFinite(saveCount) && (
            <div className={styles.saveCountRow}>
              <Icon name="HeartFillGray" size="14" />

              <span className={styles.saveCountText}>
                {saveCount.toLocaleString('ko-KR')}
              </span>
            </div>
          )
        ) : (
          <ActionButton
            variant="outlined"
            color="inverse"
            size="S"
            className={styles.fullWidthBtn}
          >
            선택
          </ActionButton>
        )}
      </section>
    </div>
  );
};
export default CardProduct;
