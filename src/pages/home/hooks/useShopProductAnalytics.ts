import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  COUNT_TRIGGER_EVENT,
  getShopListContextParams,
  getShopSelectSheetParams,
  shopScreenParams,
  trackShopFilterListClick,
  trackShopFeedCardUnselectClick,
  trackShopListProductView,
  trackShopSelectSheetItemCountChange,
  trackShopSelectSheetSwipe,
  trackShopSelectSheetView,
  type ShopListContext,
  type ShopSelectSheetContext,
} from '@pages/home/analytics/shopAnalytics';
import type { ProductSearchCardItem } from '@pages/home/hooks/useProductSearch';
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
} from '@shared/analytics/utils/imageFlow/imageFlowParams';

interface UseShopProductAnalyticsOptions {
  productCountViewed: number;
  onProductViewedCountChange: (count: number) => void;
}

/**
 * 상품 탭 GA — controller 비즈니스 핸들러에 이벤트 전송을 래핑
 */
const useShopProductAnalytics = (
  controller: ProductTabController,
  {
    productCountViewed,
    onProductViewedCountChange,
  }: UseShopProductAnalyticsOptions
) => {
  const { data: recentFloorPlanData } = useRecentFloorPlanQuery();
  const productCountViewedRef = useRef(productCountViewed);
  const hasTrackedSelectSheetViewRef = useRef(false);

  const {
    sheetExpanded,
    setSheetExpanded: setSheetExpandedState,
    selectedProducts,
    keyword,
    debouncedKeyword,
    appliedValues,
    appliedFilterChips,
    furnitureLabels,
    priceLabels,
    colorLabels,
    productCount,
    products,
    recommendedProducts,
    isRecommended,
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

  useEffect(() => {
    if (selectedProducts.length === 0) {
      hasTrackedSelectSheetViewRef.current = false;
      return;
    }

    if (hasTrackedSelectSheetViewRef.current) return;

    hasTrackedSelectSheetViewRef.current = true;
    trackShopSelectSheetView(getSelectSheetContext({ selectedProducts }));
  }, [getSelectSheetContext, selectedProducts]);

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

  const handleProductViewedCountChange = useCallback(
    (count: number) => {
      productCountViewedRef.current = count;
      onProductViewedCountChange(count);
    },
    [onProductViewedCountChange]
  );

  const impressionProducts = useMemo(
    (): ProductSearchCardItem[] =>
      isRecommended ? recommendedProducts : products,
    [isRecommended, products, recommendedProducts]
  );

  const seenProductIdsRef = useRef(new Set<number>());
  const productObserverRef = useRef<IntersectionObserver | null>(null);
  const productElementMapRef = useRef(new Map<number, HTMLElement>());

  useEffect(() => {
    seenProductIdsRef.current.clear();
    productElementMapRef.current.clear();
    handleProductViewedCountChange(0);
  }, [handleProductViewedCountChange, impressionProducts]);

  useEffect(() => {
    productObserverRef.current?.disconnect();

    productObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const productId = Number(
            (entry.target as HTMLElement).dataset.shopProductId
          );
          if (
            !Number.isFinite(productId) ||
            seenProductIdsRef.current.has(productId)
          ) {
            return;
          }

          const product = impressionProducts.find(
            (item) => item.id === productId
          );
          if (!product) return;

          seenProductIdsRef.current.add(productId);
          trackShopListProductView(product, getShopListContext());
          handleProductViewedCountChange(seenProductIdsRef.current.size);
        });
      },
      { threshold: 0.5 }
    );

    productElementMapRef.current.forEach((element) => {
      productObserverRef.current?.observe(element);
    });

    return () => productObserverRef.current?.disconnect();
  }, [getShopListContext, handleProductViewedCountChange, impressionProducts]);

  const registerProductRef = useCallback(
    (productId: number) => (element: HTMLElement | null) => {
      const observer = productObserverRef.current;
      const previous = productElementMapRef.current.get(productId);

      if (previous && observer) {
        observer.unobserve(previous);
      }

      if (!element) {
        productElementMapRef.current.delete(productId);
        return;
      }

      element.dataset.shopProductId = String(productId);
      productElementMapRef.current.set(productId, element);
      observer?.observe(element);
    },
    []
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

      trackSelectSheetCountChange(
        [...prev, product],
        COUNT_TRIGGER_EVENT.ADD_CLICK
      );
    },
    [handleSelectProduct, trackSelectSheetCountChange]
  );

  const handleRemoveSelectedProductWithAnalytics = useCallback(
    (id: number) => {
      const nextProducts = selectedProductsRef.current.filter(
        (product) => product.id !== id
      );

      trackShopFeedCardUnselectClick();

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
    trackEvent(
      GA_EVENTS.shop.SELECT_SHEET_ADD_ITEM_CLICK,
      getShopSelectSheetParams(getSelectSheetContext())
    );
    handleAddProductClick();
  }, [getSelectSheetContext, handleAddProductClick]);

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
    registerProductRef,
    setSheetExpanded,
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

export { useShopProductAnalytics };
