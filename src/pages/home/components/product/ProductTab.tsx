import { useCallback } from 'react';

import ProductFilterSheet from '@pages/home/components/product/ProductFilterSheet/ProductFilterSheet';
import {
  MAX_SELECTED_PRODUCTS,
  useProductTabController,
} from '@pages/home/hooks/useProductTabController';

import CloseBottomSheet from '@shared/components/v2/bottomSheet/CloseBottomSheet';
import DragHandleBottomSheet from '@shared/components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import IntroSection from './IntroSection/IntroSection';
import * as styles from './ProductTab.css';
import SearchSection from './SearchSection/SearchSection';
import SelectedProductSheet from './SelectedProductSheet/SelectedProductSheet';
import * as selectedSheetStyles from './SelectedProductSheet/SelectedProductSheet.css';

const ProductTab = () => {
  const {
    sheetExpanded,
    setSheetExpanded,
    filterSheetOpen,
    chipSelected,
    appliedFilterChips,
    selectedProducts,
    filterSheetProps,
    productListQueryParams,
    handleFilterChipClick,
    handleRemoveAppliedChip,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleFilterSheetClose,
    handleFilterApply,
    handleFilterResetClick,
  } = useProductTabController();

  const handleSelectedSheetClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!sheetExpanded) return;
      if (
        !(event.target as HTMLElement).closest(
          `.${selectedSheetStyles.addCard}`
        )
      ) {
        return;
      }
      setSheetExpanded(false);
    },
    [sheetExpanded, setSheetExpanded]
  );

  return (
    <div className={styles.container}>
      <IntroSection />
      <SearchSection
        chipSelected={chipSelected}
        onFilterChipClick={handleFilterChipClick}
        appliedFilterChips={appliedFilterChips}
        onAppliedFilterChipRemove={handleRemoveAppliedChip}
        selectedProductIds={selectedProducts.map((product) => product.id)}
        onSelectProduct={handleSelectProduct}
        productListQueryParams={productListQueryParams}
      />

      <DragHandleBottomSheet
        open={!filterSheetOpen}
        collapsedHeight="24rem"
        expanded={sheetExpanded}
        onExpandedChange={setSheetExpanded}
        contentSlot={
          <div onClick={handleSelectedSheetClick}>
            <SelectedProductSheet
              expanded={sheetExpanded}
              selectedProducts={selectedProducts}
              onRemoveProduct={handleRemoveSelectedProduct}
              maxCount={MAX_SELECTED_PRODUCTS}
            />
          </div>
        }
        primaryButton={
          <ActionButton
            size="2XL"
            fullWidth
            leftIcon="DoubleStar"
            visualDisabled={selectedProducts.length === 0}
            onClick={handleDecorateWithProductsClick}
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
        contentSlot={<ProductFilterSheet {...filterSheetProps} />}
        secondaryButton={
          <ActionButton
            variant="outlined"
            color="inverse"
            size="2XL"
            leftIcon="Refresh"
            onClick={handleFilterResetClick}
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
