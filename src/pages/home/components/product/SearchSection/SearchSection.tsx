import { useCallback, useState } from 'react';

import CardProduct from '@shared/components/card/cardProduct/CardProduct';
import SearchBar from '@shared/components/v2/textField/SearchBar';

import Chip from '@components/v2/chip/Chip';

import * as styles from './SearchSection.css';

const SearchSection = () => {
  const [isFurnitureTypeSelected, setFurnitureTypeSelected] = useState(false);
  const [isPriceRangeSelected, setPriceRangeSelected] = useState(false);
  const [isColorSelected, setColorSelected] = useState(false);

  const mockProducts = [
    {
      id: 'p1',
      title: '모듈 패브릭 소파 3인',
      discountRate: 25,
      discountPrice: 399000,
    },
    {
      id: 'p2',
      title: '원목 라운드 테이블 1200',
      discountRate: 15,
      discountPrice: 289000,
    },
    {
      id: 'p3',
      title: '메탈 프레임 책상 1400',
      discountRate: 30,
      discountPrice: 179000,
    },
    {
      id: 'p4',
      title: '패브릭 암체어',
      discountRate: 10,
      discountPrice: 129000,
    },
    {
      id: 'p5',
      title: '수납형 침대 프레임 Q',
      discountRate: 20,
      discountPrice: 499000,
    },
    {
      id: 'p6',
      title: '심플 거실장 1800',
      discountRate: 35,
      discountPrice: 159000,
    },
    { id: 'p7', title: '스탠드 조명', discountRate: 5, discountPrice: 89000 },
    { id: 'p8', title: '러그 150x200', discountRate: 40, discountPrice: 59000 },
    { id: 'p9', title: '벽선반 2단', discountRate: 18, discountPrice: 39000 },
    { id: 'p10', title: '데스크 체어', discountRate: 22, discountPrice: 99000 },
    {
      id: 'p11',
      title: '침구 세트 (SS)',
      discountRate: 12,
      discountPrice: 79000,
    },
    {
      id: 'p12',
      title: '수납 바스켓 세트',
      discountRate: 28,
      discountPrice: 49000,
    },
  ];

  const handleFurnitureTypeChipClick = useCallback(() => {
    setFurnitureTypeSelected((prev) => !prev);
  }, []);

  const handlePriceRangeChipClick = useCallback(() => {
    setPriceRangeSelected((prev) => !prev);
  }, []);

  const handleColorChipClick = useCallback(() => {
    setColorSelected((prev) => !prev);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.searchHeader}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.filterList}>
          <Chip
            selected={isFurnitureTypeSelected}
            onClick={handleFurnitureTypeChipClick}
            suffixIcon="ChevronDown"
          >
            가구 유형
          </Chip>
          <Chip
            selected={isPriceRangeSelected}
            onClick={handlePriceRangeChipClick}
            suffixIcon="ChevronDown"
          >
            가격대
          </Chip>
          <Chip
            selected={isColorSelected}
            onClick={handleColorChipClick}
            suffixIcon="ChevronDown"
          >
            색상
          </Chip>
        </div>
      </div>
      <div className={styles.productList}>
        {/* TODO: V2 공컴으로 변경 */}
        {mockProducts.map(({ id, title, discountRate, discountPrice }) => (
          <CardProduct
            key={id}
            size="large"
            title={title}
            discountRate={discountRate}
            discountPrice={discountPrice}
            isSaved={false}
            onToggleSave={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default SearchSection;
