import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  COUNT_TRIGGER_EVENT,
  getShopListContextParams,
  getShopSelectSheetParams,
  shopScreenParams,
  trackShopFilterListClick,
  trackShopSelectSheetItemCountChange,
  trackShopSelectSheetSwipe,
  trackShopSelectSheetView,
  type ShopListContext,
  type ShopSelectSheetContext,
} from '@pages/home/analytics/shopAnalytics';
import {
  MAX_SELECTED_PRODUCTS,
  type ProductTabController,
} from '@pages/home/hooks/useProductTabController';
import type { SelectedProduct } from '@pages/home/types/productTab';
import { useRecentFloorPlanQuery } from '@pages/imageSetup/v2/apis/queries/useRecentFloorPlanQuery';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  useAnalyticsPageView,
  useScrollDepthTrack,
} from '@shared/analytics/hooks';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import {
  getReturnScreenNameFromImageEntry,
  toSheetExpansionStatus,
} from '@shared/analytics/utils/imageFlow';

interface UseProductShopAnalyticsOptions {
  productCountViewed: number;
  onProductViewedCountChange: (count: number) => void;
}

/**
 * 상품 탭 GA — controller 비즈니스 핸들러에 이벤트 전송을 래핑
 */
const useProductShopAnalytics = (
  controller: ProductTabController,
  {
    productCountViewed,
    onProductViewedCountChange,
  }: UseProductShopAnalyticsOptions
) => {
  const { data: recentFloorPlanData } = useRecentFloorPlanQuery();
  const productCountViewedRef = useRef(productCountViewed);
  const hasTrackedSelectSheetViewRef = useRef(false);

  const {
    sheetExpanded,
    setSheetExpanded: setSheetExpandedState,
    filterSheetOpen,
    selectedProducts,
    keyword,
    debouncedKeyword,
    appliedValues,
    appliedFilterChips,
    furnitureLabels,
    priceLabels,
    colorLabels,
    productCount,
    handleFilterChipClick,
    handleFilterApply,
    handleFilterResetClick,
    handleSelectProduct,
    handleRemoveSelectedProduct,
    handleAddProductClick,
    handleDecorateWithProductsClick,
    handleSearchKeywordChange,
  } = controller;

  const selectedProductsRef = useRef(selectedProducts);

  useEffect(() => {
    selectedProductsRef.current = selectedProducts;
  }, [selectedProducts]);

  useEffect(() => {
    productCountViewedRef.current = productCountViewed;
  }, [productCountViewed]);

  const getShopListContext = useCallback(
    (): ShopListContext => ({
      searchKeyword: debouncedKeyword,
      appliedValues,
      appliedFilterChips,
      furnitureLabels,
      priceLabels,
      colorLabels,
      productCount,
      productCountViewed: productCountViewedRef.current,
    }),
    [
      appliedFilterChips,
      appliedValues,
      colorLabels,
      debouncedKeyword,
      furnitureLabels,
      priceLabels,
      productCount,
    ]
  );

  const getSelectSheetContext = useCallback(
    (overrides?: Partial<ShopSelectSheetContext>): ShopSelectSheetContext => ({
      ...getShopListContext(),
      sheetExpanded: overrides?.sheetExpanded ?? sheetExpanded,
      selectedProducts:
        overrides?.selectedProducts ?? selectedProductsRef.current,
      countTriggerEvent: overrides?.countTriggerEvent,
    }),
    [getShopListContext, sheetExpanded]
  );

  const shopListContext = useMemo(
    () => ({
      ...getShopListContext(),
      productCountViewed,
    }),
    [getShopListContext, productCountViewed]
  );

  const scrollParams = useMemo(
    () => getShopListContextParams(shopListContext),
    [shopListContext]
  );

  useAnalyticsPageView(
    GA_EVENTS.shop.PAGE_VIEW,
    SCREEN_NAME.SHOP,
    scrollParams
  );

  useScrollDepthTrack(GA_EVENTS.shop.PAGE_SCROLL, SCREEN_NAME.SHOP, {
    extraParams: scrollParams,
  });

  useScrollDepthTrack(GA_EVENTS.shop.LIST_PRODUCT_SCROLL, SCREEN_NAME.SHOP, {
    extraParams: scrollParams,
  });

  // 선택 바텀시트(DragHandleBottomSheet open={!filterSheetOpen}) 최초 노출 시 1회
  useEffect(() => {
    if (filterSheetOpen) return;
    if (hasTrackedSelectSheetViewRef.current) return;

    hasTrackedSelectSheetViewRef.current = true;
    trackShopSelectSheetView(getSelectSheetContext());
  }, [filterSheetOpen, getSelectSheetContext]);

  const trackSelectSheetCountChange = useCallback(
    (
      nextProducts: SelectedProduct[],
      countTriggerEvent: (typeof COUNT_TRIGGER_EVENT)[keyof typeof COUNT_TRIGGER_EVENT]
    ) => {
      trackShopSelectSheetItemCountChange(
        getSelectSheetContext({
          selectedProducts: nextProducts,
          countTriggerEvent,
        })
      );
    },
    [getSelectSheetContext]
  );

  const setSheetExpanded = useCallback(
    (nextExpanded: boolean) => {
      setSheetExpandedState((prev) => {
        if (prev === nextExpanded) return prev;

        trackShopSelectSheetSwipe(
          nextExpanded
            ? GA_EVENTS.shop.SELECT_SHEET_SWIPE_UP
            : GA_EVENTS.shop.SELECT_SHEET_SWIPE_DOWN,
          getSelectSheetContext({ sheetExpanded: nextExpanded })
        );

        return nextExpanded;
      });
    },
    [getSelectSheetContext, setSheetExpandedState]
  );

  const handleProductListRender = useCallback(
    (count: number) => {
      productCountViewedRef.current = count;
      onProductViewedCountChange(count);
    },
    [onProductViewedCountChange]
  );

  const handleFilterChipClickWithAnalytics = useCallback(
    (category: Parameters<typeof handleFilterChipClick>[0]) => {
      const wasOpen = controller.chipSelected[category];

      trackShopFilterListClick(category);
      handleFilterChipClick(category);

      if (!wasOpen) {
        trackEvent(GA_EVENTS.shop.FILTER_SHT_VIEW, {
          ...getShopListContextParams(getShopListContext()),
          sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
        });
      }
    },
    [
      controller.chipSelected,
      getShopListContext,
      handleFilterChipClick,
      sheetExpanded,
    ]
  );

  const handleFilterApplyWithAnalytics = useCallback(() => {
    handleFilterApply();
    trackEvent(
      GA_EVENTS.shop.FILTER_SHT_SUBMIT,
      getShopListContextParams(getShopListContext())
    );
  }, [getShopListContext, handleFilterApply]);

  const handleFilterResetClickWithAnalytics = useCallback(() => {
    handleFilterResetClick();
    trackEvent(
      GA_EVENTS.shop.FILTER_SHT_RESET_CLICK,
      getShopListContextParams(getShopListContext())
    );
  }, [getShopListContext, handleFilterResetClick]);

  const handleSelectProductWithAnalytics = useCallback(
    (product: SelectedProduct) => {
      const prev = selectedProductsRef.current;
      if (prev.some((item) => item.id === product.id)) return;

      handleSelectProduct(product);

      if (prev.length >= MAX_SELECTED_PRODUCTS) return;

      if (prev.length === 0) {
        trackEvent(
          GA_EVENTS.shop.SELECT_SHEET_ADD_ITEM_CLICK,
          getShopSelectSheetParams(getSelectSheetContext())
        );
      }

      trackSelectSheetCountChange(
        [...prev, product],
        COUNT_TRIGGER_EVENT.ADD_CLICK
      );
    },
    [getSelectSheetContext, handleSelectProduct, trackSelectSheetCountChange]
  );

  const handleRemoveSelectedProductWithAnalytics = useCallback(
    (id: number) => {
      const nextProducts = selectedProductsRef.current.filter(
        (product) => product.id !== id
      );

      trackEvent(GA_EVENTS.shop.SELECT_SHEET_REMOVE_CLICK, {
        ...getShopSelectSheetParams(getSelectSheetContext()),
        product_id: id,
        product_name: selectedProductsRef.current.find(
          (product) => product.id === id
        )?.title,
      });

      trackSelectSheetCountChange(
        nextProducts,
        COUNT_TRIGGER_EVENT.REMOVE_CLICK
      );
      handleRemoveSelectedProduct(id);
    },
    [
      getSelectSheetContext,
      handleRemoveSelectedProduct,
      trackSelectSheetCountChange,
    ]
  );

  const handleAddProductClickWithAnalytics = useCallback(() => {
    handleAddProductClick();
  }, [handleAddProductClick]);

  const handleSearchBarClick = useCallback(() => {
    trackEvent(GA_EVENTS.shop.SEARCH_BAR_CLICK, shopScreenParams());
  }, []);

  const handleSearchSubmit = useCallback(() => {
    trackEvent(
      GA_EVENTS.shop.SEARCH_SUBMIT,
      getShopListContextParams({
        ...getShopListContext(),
        searchKeyword: keyword,
      })
    );
  }, [getShopListContext, keyword]);

  const handleSearchClear = useCallback(() => {
    trackEvent(
      GA_EVENTS.shop.SEARCH_CLEAR,
      getShopListContextParams(getShopListContext())
    );
    handleSearchKeywordChange('');
  }, [getShopListContext, handleSearchKeywordChange]);

  const handleDecorateWithProductsClickWithAnalytics = useCallback(() => {
    if (selectedProducts.length === 0) {
      handleDecorateWithProductsClick();
      return;
    }

    const lastProduct = selectedProducts[selectedProducts.length - 1];

    trackEvent(GA_EVENTS.shop.SELECT_SHEET_CTA_CLICK, {
      ...getShopListContextParams(getShopListContext()),
      image_entry_route: getEntryRoute(),
      return_screen_name:
        getReturnScreenNameFromImageEntry() ?? SCREEN_NAME.SHOP,
      sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
      selected_count: selectedProducts.length,
      selected_product_ids: selectedProducts.map((p) => p.id).join(', '),
      product_id: lastProduct?.id,
      product_name: lastProduct?.title,
      product_price: lastProduct?.discountPrice,
      has_previous_space: recentFloorPlanData?.hasRecentImage === true,
      has_previous_image: recentFloorPlanData?.hasRecentImage === true,
    });

    handleDecorateWithProductsClick();
  }, [
    getShopListContext,
    handleDecorateWithProductsClick,
    recentFloorPlanData,
    selectedProducts,
    sheetExpanded,
  ]);

  const handleSelectSheetItemClick = useCallback(
    (product: SelectedProduct) => {
      trackEvent(GA_EVENTS.shop.SELECT_SHEET_ITEM_CLICK, {
        ...getShopSelectSheetParams(getSelectSheetContext()),
        product_id: product.id,
        product_name: product.title,
      });
    },
    [getSelectSheetContext]
  );

  return {
    shopListContext,
    setSheetExpanded,
    handleProductListRender,
    handleFilterChipClick: handleFilterChipClickWithAnalytics,
    handleFilterApply: handleFilterApplyWithAnalytics,
    handleFilterResetClick: handleFilterResetClickWithAnalytics,
    handleSelectProduct: handleSelectProductWithAnalytics,
    handleRemoveSelectedProduct: handleRemoveSelectedProductWithAnalytics,
    handleAddProductClick: handleAddProductClickWithAnalytics,
    handleDecorateWithProductsClick:
      handleDecorateWithProductsClickWithAnalytics,
    handleSearchBarClick,
    handleSearchSubmit,
    handleSearchClear,
    handleSelectSheetItemClick,
  };
};

export { useProductShopAnalytics };
