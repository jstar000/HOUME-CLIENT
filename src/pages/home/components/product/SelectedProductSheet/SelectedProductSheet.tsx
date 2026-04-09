import IconButton from '@shared/components/v2/button/IconButton';
import Icon from '@shared/components/v2/icon/Icon';

import * as styles from './SelectedProductSheet.css';

interface SelectedProductItem {
  id: string;
  title: string;
  imageUrl?: string;
}

interface SelectedProductSheetProps {
  expanded: boolean;
  selectedProducts: SelectedProductItem[];
  onRemoveProduct: (productId: string) => void;
  maxCount?: number;
}

const SelectedProductSheet = ({
  expanded,
  selectedProducts,
  onRemoveProduct,
  maxCount = 6,
}: SelectedProductSheetProps) => {
  const selectedCount = selectedProducts.length;
  const emptyCount = Math.max(maxCount - selectedCount, 0);
  const visibleProducts = selectedProducts.slice(0, maxCount);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size="16" />
        <p className={styles.title}>선택한 상품</p>
        <span className={styles.count}>
          (<span className={styles.selectedCount}>{selectedCount}</span>/
          {maxCount})
        </span>
      </div>

      {expanded ? (
        <div className={styles.expandedGrid}>
          {visibleProducts.map((product) => (
            <div key={product.id} className={styles.selectedCardContainer}>
              <div className={styles.selectedCard}>
                <div className={styles.selectedImageWrap}>
                  {product.imageUrl ? (
                    <img
                      className={styles.selectedImage}
                      src={product.imageUrl}
                      alt={product.title}
                    />
                  ) : (
                    <div className={styles.selectedImageFallback} aria-hidden>
                      <Icon name="PlusFill" size="20" />
                    </div>
                  )}
                </div>
              </div>
              <IconButton
                name="CloseFillBlack"
                size="M"
                className={styles.closeButtonExpanded}
                aria-label={`${product.title} 선택 해제`}
                onClick={() => onRemoveProduct(product.id)}
              />
            </div>
          ))}
          {Array.from({ length: emptyCount }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.addCard}>
              <span className={styles.addCardContent} aria-hidden>
                <Icon name="PlusFill" size="20" />
                <p className={styles.addLabel}>상품 추가하기</p>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.compactRow} aria-label="선택한 상품 미리보기">
          {visibleProducts.map((product) => (
            <div key={product.id} className={styles.compactSlotContainer}>
              <div className={styles.compactSlotFilled}>
                <div className={styles.compactImageWrap}>
                  {product.imageUrl ? (
                    <img
                      className={styles.compactImage}
                      src={product.imageUrl}
                      alt={product.title}
                    />
                  ) : (
                    <div className={styles.compactImageFallback} aria-hidden>
                      <Icon name="PlusFill" size="14" />
                    </div>
                  )}
                </div>
              </div>
              <IconButton
                name="CloseFillBlack"
                size="S"
                className={styles.closeButtonCompact}
                aria-label={`${product.title} 선택 해제`}
                onClick={() => onRemoveProduct(product.id)}
              />
            </div>
          ))}
          {Array.from({ length: emptyCount }).map((_, index) => (
            <div key={`empty-${index}`} className={styles.compactSlot} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedProductSheet;
