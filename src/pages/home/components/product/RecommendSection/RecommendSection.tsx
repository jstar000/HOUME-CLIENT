import { useCallback } from 'react';

import {
  trackShopFeedCardSelectClick,
  trackShopFeedCardUnselectClick,
  type ShopListContext,
} from '@pages/home/analytics/shopAnalytics';
import type { ProductSearchCardItem } from '@pages/home/hooks/useProductSearch';
import type { SelectedProduct } from '@pages/home/types/productTab';

import ProductCard from '@shared/components/v2/productCard/ProductCard';

import * as styles from './RecommendSection.css';

interface RecommendSectionProps {
  products: ProductSearchCardItem[];
  selectedProductIds: number[];
  onSelectProduct: (product: SelectedProduct) => void;
  shopListContext: ShopListContext;
  onOpenProductDetail: (
    id: number,
    cardProduct: { title: string; brand: string; imageUrl: string },
    cardPrice: {
      original: number;
      discountRate: number;
      discount: number;
    },
    cardSave: { isSaved: false; onToggle: () => void; count: number },
    cardLink: { href: string },
    cardShoppingAction: {
      label: string;
      disabled?: boolean;
      visualDisabled?: boolean;
      onClick: () => void;
    }
  ) => void;
}

const RecommendSection = ({
  products,
  selectedProductIds,
  onSelectProduct,
  shopListContext,
  onOpenProductDetail,
}: RecommendSectionProps) => {
  const handleSaveToggleNoop = useCallback(() => {}, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="추천 상품">
      <h2 className={styles.title}>이런 상품은 어떠세요?</h2>
      <div className={styles.productGrid}>
        {products.map((item) => {
          const {
            id,
            title,
            brand,
            imageUrl,
            discountRate,
            originalPrice,
            discountPrice,
            colorHexes,
            saveCount,
            linkUrl,
          } = item;
          const isSelected = selectedProductIds.includes(id);
          const cardProduct = {
            title,
            brand,
            imageUrl,
            colorHexes,
          };
          const cardPrice = {
            original: originalPrice,
            discountRate,
            discount: discountPrice,
          };
          const cardSave = {
            isSaved: false as const,
            onToggle: handleSaveToggleNoop,
            count: saveCount,
          };
          const cardLink = { href: linkUrl };
          const selectedProduct: SelectedProduct = {
            id,
            title,
            brand,
            imageUrl,
            originalPrice,
            discountPrice,
            discountRate,
          };
          const cardShoppingAction = {
            label: isSelected ? '선택됨' : '선택',
            visualDisabled: isSelected,
            onClick: () => {
              if (isSelected) {
                trackShopFeedCardUnselectClick();
                return;
              }

              trackShopFeedCardSelectClick(selectedProduct, shopListContext);
              onSelectProduct(selectedProduct);
            },
          };

          return (
            <div key={id}>
              <ProductCard
                cardType="shopping"
                product={cardProduct}
                price={cardPrice}
                save={cardSave}
                link={cardLink}
                shoppingAction={cardShoppingAction}
                onShoppingViewDetailClick={() =>
                  onOpenProductDetail(
                    id,
                    cardProduct,
                    cardPrice,
                    cardSave,
                    cardLink,
                    cardShoppingAction
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecommendSection;
