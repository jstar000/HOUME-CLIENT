import { useCallback, useMemo, useRef } from 'react';

import { useProductHeaderScroll } from '@pages/home/hooks/useProductHeaderScroll';
import { useProductSearchQuery } from '@pages/home/hooks/useProductSearchQuery';

import ProductCard from '@shared/components/v2/productCard/ProductCard';
import SearchBar from '@shared/components/v2/textField/SearchBar';

import Chip from '@components/v2/chip/Chip';

import type { ProductListQueryVariables } from '@constants/queryKey';

import Icon from '@/shared/components/v2/icon/Icon';

import * as styles from './SearchSection.css';

export type ProductFilterChipCategory = 'furniture' | 'price' | 'color';

export interface AppliedFilterChip {
  category: ProductFilterChipCategory;
  id: string;
  label: string;
  applied: boolean;
}

export interface SelectedProduct {
  id: string;
  title: string;
  brand: string;
  imageUrl?: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
}

interface SearchSectionProps {
  chipSelected: Record<ProductFilterChipCategory, boolean>;
  onFilterChipClick: (category: ProductFilterChipCategory) => void;
  appliedFilterChips: AppliedFilterChip[];
  onAppliedFilterChipRemove: (
    category: ProductFilterChipCategory,
    id: string
  ) => void;
  selectedProductIds: string[];
  onSelectProduct: (product: SelectedProduct) => void;
  productListQueryParams: ProductListQueryVariables;
}

const SearchSection = ({
  chipSelected,
  onFilterChipClick,
  appliedFilterChips,
  onAppliedFilterChipRemove,
  selectedProductIds,
  onSelectProduct,
  productListQueryParams,
}: SearchSectionProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const filterListRef = useRef<HTMLDivElement>(null);
  const { isFilterSticky, showStickySearchBar } = useProductHeaderScroll({
    searchBarRef,
    filterListRef,
  });

  const { loadMoreRef, keyword, products, handleSearchKeywordChange } =
    useProductSearchQuery(productListQueryParams);

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

  const handleMockSaveToggle = useCallback(() => {}, []);

  const handleSelectMockProduct = useCallback(
    (product: SelectedProduct) => {
      onSelectProduct(product);
    },
    [onSelectProduct]
  );

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
              <SearchBar value={keyword} onChange={handleSearchKeywordChange} />
            </div>
          </div>
          <div className={styles.filterList}>
            <div className={styles.filterScroll}>{filterChips}</div>
          </div>
        </div>
      ) : null}
      <div className={styles.searchHeader}>
        <div ref={searchBarRef} className={styles.searchBarContainer}>
          <SearchBar value={keyword} onChange={handleSearchKeywordChange} />
        </div>
        <div ref={filterListRef} className={styles.filterList}>
          <div className={styles.filterScroll}>{filterChips}</div>
        </div>
      </div>
      <div className={styles.productList}>
        {products.map(
          ({
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
          }) => {
            const isSelected = selectedProductIds.includes(id);
            return (
              <ProductCard
                key={id}
                cardType="shopping"
                product={{
                  title,
                  brand,
                  imageUrl,
                  colorHexes,
                }}
                price={{
                  original: originalPrice,
                  discountRate,
                  discount: discountPrice,
                }}
                save={{
                  isSaved: false,
                  onToggle: handleMockSaveToggle,
                  count: saveCount,
                }}
                link={{
                  href: linkUrl,
                }}
                shoppingAction={{
                  label: isSelected ? '선택' : '선택',
                  disabled: isSelected,
                  onClick: () =>
                    handleSelectMockProduct({
                      id,
                      title,
                      brand,
                      imageUrl,
                      originalPrice,
                      discountPrice,
                      discountRate,
                    }),
                }}
              />
            );
          }
        )}
        <div ref={loadMoreRef} />
      </div>
    </section>
  );
};

export default SearchSection;
