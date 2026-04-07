import { useCallback, useRef, useState } from 'react';

import CloseBottomSheet from '@shared/components/v2/bottomSheet/CloseBottomSheet';
import DragHandleBottomSheet from '@shared/components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import IntroSection from './IntroSection/IntroSection';
import ProductFilterSheet, {
  type ProductFilterSheetRef,
} from './ProductFilterSheet/ProductFilterSheet';
import * as styles from './ProductTab.css';
import SearchSection, {
  type ProductFilterChipCategory,
} from './SearchSection/SearchSection';
import SelectedFurnitureSheet from './SelectedFurnitureSheet/SelectedFurnitureSheet';

const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

const ProductTab = () => {
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [chipSelected, setChipSelected] = useState<
    Record<ProductFilterChipCategory, boolean>
  >(INITIAL_CHIP_SELECTED);
  const productFilterSheetRef = useRef<ProductFilterSheetRef>(null);

  const handleFilterChipClick = useCallback(
    (category: ProductFilterChipCategory) => {
      setChipSelected((prev) => {
        if (prev[category]) {
          queueMicrotask(() => {
            setFilterSheetOpen(false);
          });
          return { ...INITIAL_CHIP_SELECTED };
        }

        queueMicrotask(() => {
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
    setChipSelected({ ...INITIAL_CHIP_SELECTED });
  }, []);

  const handleFilterApply = useCallback(() => {
    const values = productFilterSheetRef.current?.getValues();
    if (values) {
      // TODO: 상품 목록 API/상태와 연동
      void values;
    }
    handleFilterSheetClose();
  }, [handleFilterSheetClose]);

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
            이 상품들로 우리 집 꾸미기
          </ActionButton>
        }
      />

      <CloseBottomSheet
        open={filterSheetOpen}
        onClose={handleFilterSheetClose}
        titleAlign="left"
        titleSlot={<p className={styles.filterSheetTitle}>필터</p>}
        contentSlot={<ProductFilterSheet ref={productFilterSheetRef} />}
        secondaryButton={
          <ActionButton
            variant="outlined"
            color="inverse"
            size="2XL"
            leftIcon="Refresh"
            onClick={() => productFilterSheetRef.current?.reset()}
          >
            초기화
          </ActionButton>
        }
        primaryButton={
          <ActionButton size="2XL" fullWidth onClick={handleFilterApply}>
            필터 적용하기
          </ActionButton>
        }
      />
    </div>
  );
};

export default ProductTab;
