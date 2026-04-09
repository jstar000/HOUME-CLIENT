import ProductCard from '@shared/components/v2/productCard/ProductCard';
import SearchBar from '@shared/components/v2/textField/SearchBar';

import Chip from '@components/v2/chip/Chip';

import Icon from '@/shared/components/v2/icon/Icon';

import * as styles from './SearchSection.css';

export type ProductFilterChipCategory = 'furniture' | 'price' | 'color';

export interface AppliedFilterChip {
  category: ProductFilterChipCategory;
  id: string;
  label: string;
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
  const mockProducts = [
    {
      id: 'p1',
      title: '모듈 패브릭 소파 3인',
      brand: 'HOUME',
      imageUrl:
        'https://i.pinimg.com/736x/a9/62/30/a9623026cd4d93af383b4c5f59d5a86a.jpg',
      discountRate: 25,
      originalPrice: 532000,
      discountPrice: 399000,
      colorHexes: ['#E7EAEF', '#31373F', '#D4C4B0'],
      saveCount: 123,
    },
    {
      id: 'p2',
      title: '원목 라운드 테이블 1200',
      brand: 'TABLE LAB',
      imageUrl:
        'https://i.pinimg.com/1200x/65/cf/44/65cf44b71f3d3092b68fb034ad24fb90.jpg',
      discountRate: 15,
      originalPrice: 340000,
      discountPrice: 289000,
      colorHexes: ['#D4C4B0', '#5C4033'],
      saveCount: 76,
    },
    {
      id: 'p3',
      title: '메탈 프레임 책상 1400',
      brand: 'WORKFIT',
      imageUrl:
        'https://i.pinimg.com/1200x/85/ac/e7/85ace7a04cbb367063e97cba14839bd4.jpg',
      discountRate: 30,
      originalPrice: 255000,
      discountPrice: 179000,
      colorHexes: ['#8E959E', '#1B1E22'],
      saveCount: 211,
    },
    {
      id: 'p4',
      title: '패브릭 암체어',
      brand: 'LIVING STUDIO',
      imageUrl:
        'https://i.pinimg.com/1200x/a5/d9/b7/a5d9b7fcd0dd6f8bf645194ac96e1f5b.jpg',
      discountRate: 10,
      originalPrice: 143000,
      discountPrice: 129000,
      colorHexes: ['#FFFFFF', '#D4C4B0'],
      saveCount: 58,
    },
    {
      id: 'p5',
      title: '수납형 침대 프레임 Q',
      brand: 'SLEEPY',
      imageUrl:
        'https://i.pinimg.com/1200x/39/a3/5e/39a35eb09726363b73c7972ac91b61e7.jpg',
      discountRate: 20,
      originalPrice: 624000,
      discountPrice: 499000,
      colorHexes: ['#F3F4F7', '#5C4033'],
      saveCount: 95,
    },
    {
      id: 'p6',
      title: '심플 거실장 1800',
      brand: 'MODERN CASA',
      imageUrl:
        'https://i.pinimg.com/1200x/02/88/5a/02885ae1b6ccc1ae06521fbd3982892b.jpg',
      discountRate: 35,
      originalPrice: 245000,
      discountPrice: 159000,
      colorHexes: ['#FFFFFF', '#8E959E', '#1B1E22'],
      saveCount: 142,
    },
    {
      id: 'p7',
      title: '스탠드 조명',
      brand: 'LIGHTER',
      imageUrl:
        'https://i.pinimg.com/736x/d9/4b/93/d94b93371e360e14a8e693749c4408a8.jpg',
      discountRate: 5,
      originalPrice: 94000,
      discountPrice: 89000,
      colorHexes: ['#D4AF37', '#1B1E22'],
      saveCount: 34,
    },
    {
      id: 'p8',
      title: '러그 150x200',
      brand: 'RUGROOM',
      imageUrl:
        'https://i.pinimg.com/736x/36/bb/a7/36bba7025c4907223e8bd47bf25acd8d.jpg',
      discountRate: 40,
      originalPrice: 99000,
      discountPrice: 59000,
      colorHexes: ['#D4C4B0', '#8E959E', '#7E57C2'],
      saveCount: 188,
    },
    {
      id: 'p9',
      title: '벽선반 2단',
      brand: 'WALLSET',
      imageUrl:
        'https://i.pinimg.com/736x/29/13/51/291351b55807526727e53a4a3d0453a2.jpg',
      discountRate: 18,
      originalPrice: 47000,
      discountPrice: 39000,
      colorHexes: ['#FFFFFF', '#5C4033'],
      saveCount: 12,
    },
    {
      id: 'p10',
      title: '데스크 체어',
      brand: 'SEATON',
      imageUrl:
        'https://i.pinimg.com/736x/da/2c/ae/da2cae9be8e292baa2dc1243f2f84775.jpg',
      discountRate: 22,
      originalPrice: 127000,
      discountPrice: 99000,
      colorHexes: ['#31373F', '#8E959E'],
      saveCount: 67,
    },
    {
      id: 'p11',
      title: '침구 세트 (SS)',
      brand: 'BEDDING LAB',
      imageUrl:
        'https://i.pinimg.com/1200x/cb/7a/1d/cb7a1d203af17e14752165d50244a20e.jpg',
      discountRate: 12,
      originalPrice: 90000,
      discountPrice: 79000,
      colorHexes: ['#FFFFFF', '#D4C4B0', '#EC407A'],
      saveCount: 51,
    },
    {
      id: 'p12',
      title: '수납 바스켓 세트',
      brand: 'BASKETRY',
      imageUrl:
        'https://i.pinimg.com/736x/d5/ed/d2/d5edd2d6b6a7955f91e41b9433d9852d.jpg',
      discountRate: 28,
      originalPrice: 68000,
      discountPrice: 49000,
      colorHexes: ['#D4C4B0', '#5C4033'],
      saveCount: 29,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.searchHeader}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.filterList}>
          <div className={styles.filterScroll}>
            {appliedFilterChips.length > 0 ? (
              appliedFilterChips.map(({ category, id, label }) => (
                <Chip
                  key={`${category}-${id}`}
                  selected
                  onClick={() => onFilterChipClick(category)}
                  suffixIcon={<Icon name="Close" size="12" />}
                  suffixAriaLabel={`${label} 필터 해제`}
                  onSuffixClick={() => onAppliedFilterChipRemove(category, id)}
                >
                  {label}
                </Chip>
              ))
            ) : (
              <>
                <Chip
                  selected={chipSelected.furniture}
                  onClick={() => onFilterChipClick('furniture')}
                  suffixIcon={<Icon name="ChevronDown" size="12" />}
                >
                  카테고리
                </Chip>
                <Chip
                  selected={chipSelected.price}
                  onClick={() => onFilterChipClick('price')}
                  suffixIcon={<Icon name="ChevronDown" size="12" />}
                >
                  가격대
                </Chip>
                <Chip
                  selected={chipSelected.color}
                  onClick={() => onFilterChipClick('color')}
                  suffixIcon={<Icon name="ChevronDown" size="12" />}
                >
                  색상
                </Chip>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.productList}>
        {/* TODO: V2 공컴으로 변경 */}
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
                  onToggle: () => {},
                  count: saveCount,
                }}
                link={{
                  href: 'https://example.com',
                }}
                shoppingAction={{
                  label: isSelected ? '선택' : '선택',
                  disabled: isSelected,
                  onClick: () =>
                    onSelectProduct({
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
