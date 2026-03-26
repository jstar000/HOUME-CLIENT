import { useCallback, useState } from 'react';

import CardProduct from '@shared/components/card/cardProduct/CardProduct';
import SearchBar from '@shared/components/v2/textField/SearchBar';

import Chip from '@components/v2/chip/Chip';

import * as styles from './SearchSection.css';

const SearchSection = () => {
  const [isFurnitureTypeSelected, setFurnitureTypeSelected] = useState(false);
  const [isPriceRangeSelected, setPriceRangeSelected] = useState(false);
  const [isColorSelected, setColorSelected] = useState(false);

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
        <CardProduct
          size="large"
          title="title"
          isSaved={false}
          onToggleSave={() => {}}
        />
        <CardProduct
          size="large"
          title="title"
          isSaved={false}
          onToggleSave={() => {}}
        />
        <CardProduct
          size="large"
          title="title"
          isSaved={false}
          onToggleSave={() => {}}
        />
        <CardProduct
          size="large"
          title="title"
          isSaved={false}
          onToggleSave={() => {}}
        />
      </div>
    </section>
  );
};

export default SearchSection;
