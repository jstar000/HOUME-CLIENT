import { useCallback, useState } from 'react';

import CloseBottomSheet from '@shared/components/v2/bottomSheet/CloseBottomSheet';
import DragHandleBottomSheet from '@shared/components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import IntroSection from './IntroSection/IntroSection';
import * as styles from './ProductTab.css';
import SearchSection, {
  type ProductFilterChipCategory,
} from './SearchSection/SearchSection';
import SelectedFurnitureSheet from './SelectedFurnitureSheet/SelectedFurnitureSheet';

const FILTER_SHEET_TITLES: Record<ProductFilterChipCategory, string> = {
  furniture: '가구 유형',
  price: '가격대',
  color: '색상',
};

const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

const ProductTab = () => {
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] =
    useState<ProductFilterChipCategory | null>(null);
  const [chipSelected, setChipSelected] = useState<
    Record<ProductFilterChipCategory, boolean>
  >(INITIAL_CHIP_SELECTED);

  const handleFilterChipClick = useCallback(
    (category: ProductFilterChipCategory) => {
      setChipSelected((prev) => {
        if (prev[category]) {
          queueMicrotask(() => {
            setFilterSheetOpen(false);
            setActiveFilter(null);
          });
          return { ...INITIAL_CHIP_SELECTED };
        }

        queueMicrotask(() => {
          setActiveFilter(category);
          setFilterSheetOpen(true);
        });
        return {
          furniture: category === 'furniture',
          price: category === 'price',
          color: category === 'color',
        };
      });
    },
    []
  );

  const handleFilterSheetClose = useCallback(() => {
    setFilterSheetOpen(false);
    setActiveFilter(null);
    setChipSelected({ ...INITIAL_CHIP_SELECTED });
  }, []);

  return (
    <div className={styles.container}>
      <IntroSection />
      <SearchSection
        chipSelected={chipSelected}
        onFilterChipClick={handleFilterChipClick}
      />

      <DragHandleBottomSheet
        open={!filterSheetOpen}
        collapsedHeight="24rem"
        onExpandedChange={setSheetExpanded}
        contentSlot={<SelectedFurnitureSheet expanded={sheetExpanded} />}
        primaryButton={
          <ActionButton
            size="2XL"
            fullWidth
            leftIcon="DoubleStar"
            onClick={() => {}}
          >
            이 가구들로 우리 집 꾸미기
          </ActionButton>
        }
      />

      <CloseBottomSheet
        open={filterSheetOpen}
        onClose={handleFilterSheetClose}
        titleAlign="left"
        titleSlot={
          activeFilter ? (
            <p className={styles.filterSheetTitle}>
              {FILTER_SHEET_TITLES[activeFilter]}
            </p>
          ) : null
        }
        contentSlot={
          <div className={styles.filterSheetContent}>
            필터 옵션은 추후 연결 예정입니다.
          </div>
        }
        primaryButton={
          <ActionButton size="2XL" fullWidth onClick={handleFilterSheetClose}>
            확인
          </ActionButton>
        }
      />
    </div>
  );
};

export default ProductTab;
