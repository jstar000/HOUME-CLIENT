import { useCallback, useState } from 'react';

import type {
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/components/product/SearchSection/SearchSection';
import { useProductFilters } from '@pages/home/hooks/useProductFilters';

import { useToast } from '@components/toast/useToast';

const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

export const MAX_SELECTED_PRODUCTS = 6;

export const useProductTabState = () => {
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [chipSelected, setChipSelected] = useState<
    Record<ProductFilterChipCategory, boolean>
  >(INITIAL_CHIP_SELECTED);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const { notify } = useToast();

  const {
    furnitureOptions,
    priceOptions,
    colorOptions,
    appliedFilterChips,
    syncDraftFromApplied,
    resetDraft,
    toggleDraftChip,
    applyDraft,
    removeAppliedChip,
    isChipSelected,
  } = useProductFilters();

  const handleFilterChipClick = useCallback(
    (category: ProductFilterChipCategory) => {
      setChipSelected((prev) => {
        if (prev[category]) {
          setFilterSheetOpen(false);
          return { ...INITIAL_CHIP_SELECTED };
        }

        syncDraftFromApplied();
        setFilterSheetOpen(true);

        return {
          furniture: category === 'furniture',
          price: category === 'price',
          color: category === 'color',
        };
      });
    },
    [syncDraftFromApplied]
  );

  const handleFilterSheetClose = useCallback(() => {
    setFilterSheetOpen(false);
    setChipSelected({ ...INITIAL_CHIP_SELECTED });
  }, []);

  const handleFilterApply = useCallback(() => {
    applyDraft();
    handleFilterSheetClose();
  }, [applyDraft, handleFilterSheetClose]);

  const handleRemoveAppliedChip = useCallback(
    (category: ProductFilterChipCategory, _id: string) => {
      removeAppliedChip(category);
      if (filterSheetOpen) {
        syncDraftFromApplied();
      }
    },
    [filterSheetOpen, removeAppliedChip, syncDraftFromApplied]
  );

  const handleSelectProduct = useCallback(
    (product: SelectedProduct) => {
      let attemptedOverMax = false;
      setSelectedProducts((prev) => {
        if (prev.some((item) => item.id === product.id)) return prev;
        if (prev.length >= MAX_SELECTED_PRODUCTS) {
          attemptedOverMax = true;
          return prev;
        }
        return [...prev, product];
      });

      if (attemptedOverMax) {
        notify({
          text: `상품은 최대 ${MAX_SELECTED_PRODUCTS}개까지만 선택할 수 있어요`,
        });
      }
    },
    [notify]
  );

  const handleRemoveSelectedProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  }, []);

  const handleDecorateWithProductsClick = useCallback(() => {
    if (selectedProducts.length === 0) {
      notify({ text: '상품을 1개 이상 선택해주세요' });
    }
  }, [notify, selectedProducts.length]);

  const handleFilterResetClick = useCallback(() => {
    resetDraft();
  }, [resetDraft]);

  return {
    sheetExpanded,
    setSheetExpanded,
    filterSheetOpen,
    chipSelected,
    appliedFilterChips,
    selectedProducts,
    filterSheetProps: {
      furnitureOptions,
      priceOptions,
      colorOptions,
      isChipSelected,
      onChipClick: toggleDraftChip,
    },
    handleFilterChipClick,
    handleRemoveAppliedChip,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleFilterSheetClose,
    handleFilterApply,
    handleFilterResetClick,
  };
};
