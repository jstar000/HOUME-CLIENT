import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useProductFilterState } from '@pages/home/hooks/useProductFilterState';
import { useProductSearch } from '@pages/home/hooks/useProductSearch';
import {
  MAX_SELECTED_PRODUCTS,
  useProductSelection,
} from '@pages/home/hooks/useProductSelection';
import type {
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/types/productTab';
import { useFunnelStore } from '@pages/imageSetup/stores/useFunnelStore';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';

import { mapEntryRouteToLoginEntry } from '@shared/analytics/utils/loginEntryRoute';
import { TOAST_MESSAGE } from '@shared/constants/toastMessage';
import { TOAST_TYPE, TOASTER_ID } from '@shared/types/toast';

import { useToast } from '@components/v2/toast/useToast';

import { useLoginGate } from '@hooks/useLoginGate';

/**
 * 필터 상단 칩 선택 상태 기본값
 * - 어떤 칩도 펼쳐지지 않은 상태를 의미
 */
const INITIAL_CHIP_SELECTED: Record<ProductFilterChipCategory, boolean> = {
  furniture: false,
  price: false,
  color: false,
};

interface UseProductTabControllerOptions {
  /** mount 시 selectedProducts 초기값 - 외부로부터 상품 탭 진입(로그인 복귀/ResultPage의 상품 재선택)에서 복원 */
  initialSelectedProducts?: SelectedProduct[];
  /** mount 시 바텀시트 확장 상태 초기값 — ResultPage로부터 상품 탭 진입 시 바텀시트가 확장된 상태로 진입 */
  initialSheetExpanded?: boolean;
  /** mount 시 상품 탭 필터(applied/draft) 모두 초기 상태로 리셋 — 외부로부터 상품 탭 진입 시 필터 칩 모두 해제 (기획 요구사항) */
  resetFiltersOnMount?: boolean;
}

/**
 * 상품 탭 UI 오케스트레이션 훅
 * - 필터 상태(useProductFilterState)
 * - 상품 선택 상태(useProductSelection)
 * - 검색/목록(useProductSearch)
 */
const useProductTabController = ({
  initialSelectedProducts,
  initialSheetExpanded = false,
  resetFiltersOnMount = false,
}: UseProductTabControllerOptions = {}) => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { requireLogin } = useLoginGate();

  const [sheetExpanded, setSheetExpanded] = useState(initialSheetExpanded);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [chipSelected, setChipSelected] = useState<
    Record<ProductFilterChipCategory, boolean>
  >(INITIAL_CHIP_SELECTED);

  const {
    furnitureOptions,
    priceOptions,
    colorOptions,
    appliedFilterChips,
    appliedValues,
    furnitureLabels,
    priceLabels,
    colorLabels,
    syncDraftFromApplied,
    resetDraft,
    clearAllFilters,
    toggleDraftChip,
    applyDraft,
    removeAppliedChip,
    isChipSelected,
    productListQueryParams,
  } = useProductFilterState();

  const {
    keyword,
    debouncedKeyword,
    products,
    recommendedProducts,
    isRecommended,
    showEmptyState,
    isPending,
    isError,
    refetch,
    loadMoreRef,
    handleSearchKeywordChange,
  } = useProductSearch(productListQueryParams);

  const productCount = isRecommended
    ? recommendedProducts.length
    : products.length;

  const { selectedProducts, handleSelectProduct, handleRemoveSelectedProduct } =
    useProductSelection({ initialSelectedProducts });

  useEffect(() => {
    if (resetFiltersOnMount) {
      clearAllFilters();
      resetDraft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChipClick = useCallback(
    (category: ProductFilterChipCategory) => {
      if (chipSelected[category]) {
        setFilterSheetOpen(false);
        setChipSelected({ ...INITIAL_CHIP_SELECTED });
        return;
      }

      syncDraftFromApplied();
      setFilterSheetOpen(true);
      setChipSelected({
        furniture: category === 'furniture',
        price: category === 'price',
        color: category === 'color',
      });
    },
    [chipSelected, syncDraftFromApplied]
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

  const handleFilterResetClick = useCallback(() => {
    resetDraft();
  }, [resetDraft]);

  const handleAddProductClick = useCallback(() => {
    setSheetExpanded(false);
  }, []);

  const handleDecorateWithProductsClick = useCallback(() => {
    if (selectedProducts.length === 0) {
      notify({
        text: TOAST_MESSAGE.PRODUCT_SELECT_REQUIRED,
        type: TOAST_TYPE.INFO,
        options: { toasterId: TOASTER_ID.TOP_4 },
      });
      return;
    }

    useFunnelStore.getState().reset();

    const entryRoute =
      useImageFlowStore.getState().entryRoute === ENTRY_ROUTE.PRODUCT_REGENERATE
        ? ENTRY_ROUTE.PRODUCT_REGENERATE
        : ENTRY_ROUTE.PRODUCT_SELECTION;

    useImageFlowStore.getState().setFlow({
      entryRoute,
      preset: {
        type: 'product',
        productIds: selectedProducts.map((p) => p.id),
        productsToBeRestored: selectedProducts,
      },
    });

    requireLogin(
      () => navigate(ROUTES.IMAGE_SETUP),
      mapEntryRouteToLoginEntry(entryRoute)
    );
  }, [navigate, notify, requireLogin, selectedProducts]);

  return {
    sheetExpanded,
    setSheetExpanded,
    filterSheetOpen,
    chipSelected,
    appliedFilterChips,
    appliedValues,
    furnitureLabels,
    priceLabels,
    colorLabels,
    selectedProducts,
    filterSheetProps: {
      furnitureOptions,
      priceOptions,
      colorOptions,
      isChipSelected,
      onChipClick: toggleDraftChip,
    },
    productListQueryParams,
    keyword,
    debouncedKeyword,
    products,
    recommendedProducts,
    isRecommended,
    showEmptyState,
    isPending,
    isError,
    refetch,
    loadMoreRef,
    productCount,
    handleSearchKeywordChange,
    handleFilterChipClick,
    handleRemoveAppliedChip,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleDecorateWithProductsClick,
    handleFilterSheetClose,
    handleFilterApply,
    handleFilterResetClick,
    handleAddProductClick,
  };
};

export type ProductTabController = ReturnType<typeof useProductTabController>;

export { MAX_SELECTED_PRODUCTS, useProductTabController };
