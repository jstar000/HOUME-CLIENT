import { useCallback, useEffect, useMemo, useRef } from 'react';

import { overlay } from 'overlay-kit';

import {
  trackShopFeedCardDetailClick,
  trackShopFeedCardSelectClick,
  trackShopFeedCardUnselectClick,
  trackShopListEmptyView,
  trackShopListProductView,
  type ShopListContext,
} from '@pages/home/analytics/shopAnalytics';
import ProductDetailOverlay from '@pages/home/components/product/ProductPopup/ProductDetailOverlay';
import RecommendSection from '@pages/home/components/product/RecommendSection/RecommendSection';
import { useProductHeaderScroll } from '@pages/home/hooks/useProductHeaderScroll';
import type { ProductSearchCardItem } from '@pages/home/hooks/useProductSearch';
import type {
  AppliedFilterChip,
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/types/productTab';

import IconButton from '@shared/components/v2/button/IconButton';
import EmptyView from '@shared/components/v2/emptyView/EmptyView';
import ProductCard from '@shared/components/v2/productCard/ProductCard';
import SearchBar from '@shared/components/v2/textField/SearchBar';
import { EMPTY_VIEW_TEXT } from '@shared/constants/emptyViewText';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';
import Chip from '@components/v2/chip/Chip';

import Icon from '@/shared/components/v2/icon/Icon';

import * as styles from './SearchSection.css';

interface SearchSectionProps {
  chipSelected: Record<ProductFilterChipCategory, boolean>;
  onFilterChipClick: (category: ProductFilterChipCategory) => void;
  appliedFilterChips: AppliedFilterChip[];
  onAppliedFilterChipRemove: (
    category: ProductFilterChipCategory,
    id: string
  ) => void;
  selectedProductIds: number[];
  onSelectProduct: (product: SelectedProduct) => void;
  keyword: string;
  products: ProductSearchCardItem[];
  recommendedProducts: ProductSearchCardItem[];
  isRecommended: boolean;
  showEmptyState: boolean;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  shopListContext: ShopListContext;
  onSearchKeywordChange: (value: string) => void;
  onSearchBarClick: () => void;
  onSearchSubmit: () => void;
  onSearchClear: () => void;
  onProductListRender?: (productCountViewed: number) => void;
}

const SearchSection = ({
  chipSelected,
  onFilterChipClick,
  appliedFilterChips,
  onAppliedFilterChipRemove,
  selectedProductIds,
  onSelectProduct,
  keyword,
  products,
  recommendedProducts,
  isRecommended,
  showEmptyState,
  isPending,
  isError,
  refetch,
  loadMoreRef,
  shopListContext,
  onSearchKeywordChange,
  onSearchBarClick,
  onSearchSubmit,
  onSearchClear,
  onProductListRender,
}: SearchSectionProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const filterListRef = useRef<HTMLDivElement>(null);
  const hasTrackedEmptyViewRef = useRef(false);
  const { isFilterSticky, showStickySearchBar, showScrollTopFloatingButton } =
    useProductHeaderScroll({ searchBarRef, filterListRef });

  const listContextRef = useRef(shopListContext);
  listContextRef.current = shopListContext;

  useEffect(() => {
    if (!showEmptyState) {
      hasTrackedEmptyViewRef.current = false;
      return;
    }

    if (hasTrackedEmptyViewRef.current) return;

    hasTrackedEmptyViewRef.current = true;
    trackShopListEmptyView(shopListContext);
  }, [showEmptyState, shopListContext]);

  useEffect(() => {
    if (isPending || isError || showEmptyState) return;

    trackShopListProductView({
      ...listContextRef.current,
      productCount: products.length,
      productCountViewed: products.length,
    });
    onProductListRender?.(products.length);
  }, [isError, isPending, onProductListRender, products, showEmptyState]);

  const handleFilterChipCategoryClick = useCallback(
    (category: ProductFilterChipCategory) => {
      onFilterChipClick(category);
    },
    [onFilterChipClick]
  );

  const handleAppliedFilterChipRemoveClick = useCallback(
    (category: ProductFilterChipCategory, id: string) => {
      onAppliedFilterChipRemove(category, id);
    },
    [onAppliedFilterChipRemove]
  );

  const handleSaveToggleNoop = useCallback(() => {}, []);

  const handleScrollToTopClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openProductDetail = useCallback(
    (
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
        onClick: () => void;
      }
    ) => {
      trackShopFeedCardDetailClick(
        {
          id,
          title: cardProduct.title,
          brand: cardProduct.brand,
          imageUrl: cardProduct.imageUrl,
          originalPrice: cardPrice.original,
          discountPrice: cardPrice.discount,
          discountRate: cardPrice.discountRate,
          colorHexes: [],
          saveCount: cardSave.count,
          linkUrl: cardLink.href,
        },
        shopListContext
      );

      overlay.open(({ unmount }) => (
        <ProductDetailOverlay
          unmount={unmount}
          id={id}
          link={cardLink}
          price={cardPrice}
          product={cardProduct}
          save={cardSave}
          shoppingAction={cardShoppingAction}
          shopListContext={shopListContext}
        />
      ));
    },
    [shopListContext]
  );

  const renderProductCard = (item: ProductSearchCardItem) => {
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
            openProductDetail(
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
  };

  const filterChips = useMemo(
    () =>
      appliedFilterChips.map(({ category, id, label, applied }) =>
        applied ? (
          <Chip
            key={`${category}-${id}`}
            selected
            onClick={() => handleFilterChipCategoryClick(category)}
            suffixIcon={<Icon name="Close" size="12" />}
            suffixAriaLabel={`${label} 필터 해제`}
            onSuffixClick={() =>
              handleAppliedFilterChipRemoveClick(category, id)
            }
          >
            {label}
          </Chip>
        ) : (
          <Chip
            key={`${category}-${id}`}
            selected={chipSelected[category]}
            onClick={() => handleFilterChipCategoryClick(category)}
            suffixIcon={<Icon name="ChevronDown" size="12" />}
          >
            {label}
          </Chip>
        )
      ),
    [
      appliedFilterChips,
      chipSelected,
      handleAppliedFilterChipRemoveClick,
      handleFilterChipCategoryClick,
    ]
  );

  const searchBarProps = {
    value: keyword,
    onChange: onSearchKeywordChange,
    onFocus: onSearchBarClick,
    onClear: onSearchClear,
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSearchSubmit();
      }
    },
  };

  return (
    <section className={styles.section}>
      {isFilterSticky ? (
        <div className={styles.stickyHeader}>
          <div
            className={`${styles.stickySearchBarWrap} ${
              showStickySearchBar ? styles.stickySearchBarWrapVisible : ''
            }`}
          >
            <div className={styles.searchBarContainer}>
              <SearchBar {...searchBarProps} />
            </div>
          </div>
          <div className={styles.filterList}>
            <div className={styles.filterScroll}>{filterChips}</div>
          </div>
        </div>
      ) : null}
      <div className={styles.searchHeader}>
        <div ref={searchBarRef} className={styles.searchBarContainer}>
          <SearchBar {...searchBarProps} />
        </div>
        <div ref={filterListRef} className={styles.filterList}>
          <div className={styles.filterScroll}>{filterChips}</div>
        </div>
      </div>
      {isPending || isError || showEmptyState ? (
        <div className={styles.productListFallback}>
          {isPending ? (
            <div className={styles.productListState}>
              <Loading inline />
            </div>
          ) : isError ? (
            <div className={styles.productListState}>
              <InlineError
                message={EMPTY_VIEW_TEXT.searchSection.loadError}
                onRetry={refetch}
              />
            </div>
          ) : (
            <>
              <EmptyView
                title={EMPTY_VIEW_TEXT.searchSection.empty}
                description={EMPTY_VIEW_TEXT.searchSection.emptyDescription}
                imageAlt="필터 결과 없음"
              />
              {isRecommended ? (
                <>
                  <div className={styles.recommendDivider} role="separator" />
                  <RecommendSection
                    products={recommendedProducts}
                    selectedProductIds={selectedProductIds}
                    onSelectProduct={onSelectProduct}
                    shopListContext={shopListContext}
                    onOpenProductDetail={openProductDetail}
                  />
                </>
              ) : null}
            </>
          )}
        </div>
      ) : (
        <div className={styles.productList}>
          {products.map((item) => renderProductCard(item))}
          <div ref={loadMoreRef} />
        </div>
      )}

      <div className={styles.scrollTopFloatingLayer}>
        <div
          className={`${styles.scrollTopFloatingWrap} ${
            showScrollTopFloatingButton
              ? styles.scrollTopFloatingWrapVisible
              : ''
          }`}
        >
          <IconButton
            name="ArrowUp"
            size="S"
            className={styles.scrollTopFloatingButton}
            aria-label="페이지 상단으로 이동"
            onClick={handleScrollToTopClick}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
