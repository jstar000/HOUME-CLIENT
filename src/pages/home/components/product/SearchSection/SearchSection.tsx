import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ProductCard from '@shared/components/v2/productCard/ProductCard';
import SearchBar from '@shared/components/v2/textField/SearchBar';

import Chip from '@components/v2/chip/Chip';

import {
  getMockProductMainResponse,
  toSearchSectionProducts,
} from '@/pages/home/apis/queries/useProductMainQuery';
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
}

const SearchSection = ({
  chipSelected,
  onFilterChipClick,
  appliedFilterChips,
  onAppliedFilterChipRemove,
  selectedProductIds,
  onSelectProduct,
}: SearchSectionProps) => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const filterListRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showStickySearchBar, setShowStickySearchBar] = useState(false);

  const mockProducts = toSearchSectionProducts(
    getMockProductMainResponse({
      size: 20,
    })
  );

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

  useEffect(() => {
    const handleScroll = () => {
      if (!searchBarRef.current || !filterListRef.current) return;

      const currentY = window.scrollY || window.pageYOffset;
      const isScrollUp = currentY < lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      const filterTop = filterListRef.current.getBoundingClientRect().top;
      const searchBarTop = searchBarRef.current.getBoundingClientRect().top;

      if (!isFilterSticky && filterTop <= 0) {
        setIsFilterSticky(true);
      }

      if (isFilterSticky) {
        if (isScrollUp && searchBarTop >= 0) {
          setIsFilterSticky(false);
          setShowStickySearchBar(false);
          return;
        }
        setShowStickySearchBar(isScrollUp);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFilterSticky]);

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
          {showStickySearchBar ? (
            <div className={styles.searchBarContainer}>
              <SearchBar />
            </div>
          ) : null}
          <div className={styles.filterList}>
            <div className={styles.filterScroll}>{filterChips}</div>
          </div>
        </div>
      ) : null}
      <div className={styles.searchHeader}>
        <div ref={searchBarRef} className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div ref={filterListRef} className={styles.filterList}>
          <div className={styles.filterScroll}>{filterChips}</div>
        </div>
      </div>
      <div className={styles.productList}>
        {mockProducts.map(
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
      </div>
    </section>
  );
};

export default SearchSection;
