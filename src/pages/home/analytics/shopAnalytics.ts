import type { ProductFilterValues } from '@pages/home/hooks/useProductFilterState';
import type { ProductSearchCardItem } from '@pages/home/hooks/useProductSearch';
import type {
  AppliedFilterChip,
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/types/productTab';
import { ALL_FILTER_SENTINEL } from '@pages/home/utils/productFilterUtils';

import { GA_EVENTS } from '@shared/analytics/events';
import { getProductCardParams } from '@shared/analytics/params/builders/productCard';
import type { ImageEntryRoute } from '@shared/analytics/params/gate';
import {
  COUNT_TRIGGER_EVENT,
  SHEET_EXPANSION_STATUS,
  type CountTriggerEvent,
  type SheetExpansionStatus,
} from '@shared/analytics/params/shop';
import { FILTER_TYPE } from '@shared/analytics/params/space';
import { SCREEN_NAME, type ScreenName } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { toSheetExpansionStatus } from '@shared/analytics/utils/imageFlow';

type FilterLabelMap = Record<string, string>;

export interface ShopListContext {
  searchKeyword?: string;
  appliedValues?: ProductFilterValues;
  appliedFilterChips?: AppliedFilterChip[];
  furnitureLabels?: FilterLabelMap;
  priceLabels?: FilterLabelMap;
  colorLabels?: FilterLabelMap;
  productCount?: number;
  productCountViewed?: number;
}

export interface ShopSelectSheetContext extends ShopListContext {
  sheetExpanded: boolean;
  selectedProducts: SelectedProduct[];
  countTriggerEvent?: CountTriggerEvent;
}

const shopScreenParams = () => ({
  screen_name: SCREEN_NAME.SHOP,
});

export { shopScreenParams };

const labelsFromIds = (ids: string[] | undefined, labels: FilterLabelMap) => {
  if (!ids?.length) return undefined;

  const formatted = ids
    .filter((id) => id !== ALL_FILTER_SENTINEL)
    .map((id) => labels[id] ?? id)
    .filter(Boolean)
    .join(', ');

  return formatted || undefined;
};

export const getShopListContextParams = ({
  searchKeyword,
  appliedValues,
  appliedFilterChips,
  furnitureLabels = {},
  priceLabels = {},
  colorLabels = {},
  productCount,
  productCountViewed,
}: ShopListContext = {}) => {
  const selectedKeywordFilters = appliedFilterChips
    ?.filter((chip) => chip.applied)
    .map((chip) => chip.label)
    .join(', ');

  return {
    ...shopScreenParams(),
    search_keyword: searchKeyword?.trim() || undefined,
    selected_shop_keyword_filters: selectedKeywordFilters || undefined,
    filter_shop_furniture_type: labelsFromIds(
      appliedValues?.furnitureTypeIds,
      furnitureLabels
    ),
    filter_shop_price: labelsFromIds(appliedValues?.priceRangeIds, priceLabels),
    filter_shop_color: labelsFromIds(appliedValues?.colorIds, colorLabels),
    product_count: productCount,
    product_count_viewed: productCountViewed,
  };
};

export const getShopSelectSheetParams = ({
  sheetExpanded,
  selectedProducts,
  countTriggerEvent,
  ...listContext
}: ShopSelectSheetContext) => ({
  ...getShopListContextParams(listContext),
  sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
  selected_count: selectedProducts.length,
  selected_product_ids:
    selectedProducts.length > 0
      ? selectedProducts.map((product) => product.id).join(', ')
      : undefined,
  selected_sub_category_types: undefined,
  count_trigger_event: countTriggerEvent,
});

export const getShopProductCardParams = (product: {
  id: number;
  title?: string;
  brand?: string;
  originalPrice?: number;
  discountPrice?: number;
  categoryName?: string;
}) => ({
  ...getProductCardParams({
    productId: product.id,
    name: product.title,
    brand: product.brand,
    originalPrice: product.originalPrice,
    finalPrice: product.discountPrice,
    product_category: product.categoryName,
    trigger_context: undefined,
  }),
});

export const trackShopFilterListClick = (
  category: ProductFilterChipCategory
) => {
  trackEvent(GA_EVENTS.shop.FILTER_LIST_CLICK, {
    ...shopScreenParams(),
    filter_type: FILTER_TYPE.SHOP,
    filter_category: category,
  });
};

export const trackShopFilterSheetView = (
  listContext: ShopListContext,
  sheetExpanded: boolean
) => {
  trackEvent(GA_EVENTS.shop.FILTER_SHT_VIEW, {
    ...getShopListContextParams(listContext),
    sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
  });
};

export const trackShopFilterSheetSubmit = (listContext: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.FILTER_SHT_SUBMIT,
    getShopListContextParams(listContext)
  );
};

export const trackShopFilterSheetResetClick = (
  listContext: ShopListContext
) => {
  trackEvent(
    GA_EVENTS.shop.FILTER_SHT_RESET_CLICK,
    getShopListContextParams(listContext)
  );
};

export const trackShopSearchBarClick = () => {
  trackEvent(GA_EVENTS.shop.SEARCH_BAR_CLICK, shopScreenParams());
};

export const trackShopSearchSubmit = (listContext: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.SEARCH_SUBMIT,
    getShopListContextParams(listContext)
  );
};

export const trackShopSearchClear = (listContext: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.SEARCH_CLEAR,
    getShopListContextParams(listContext)
  );
};

export const trackShopSelectSheetAddItemClick = (
  context: ShopSelectSheetContext
) => {
  trackEvent(
    GA_EVENTS.shop.SELECT_SHEET_ADD_ITEM_CLICK,
    getShopSelectSheetParams(context)
  );
};

export const trackShopSelectSheetRemoveClick = (
  context: ShopSelectSheetContext,
  product: Pick<SelectedProduct, 'id' | 'title'>
) => {
  trackEvent(GA_EVENTS.shop.SELECT_SHEET_REMOVE_CLICK, {
    ...getShopSelectSheetParams(context),
    product_id: product.id,
    product_name: product.title,
  });
};

export const trackShopSelectSheetItemClick = (
  context: ShopSelectSheetContext,
  product: Pick<SelectedProduct, 'id' | 'title'>
) => {
  trackEvent(GA_EVENTS.shop.SELECT_SHEET_ITEM_CLICK, {
    ...getShopSelectSheetParams(context),
    product_id: product.id,
    product_name: product.title,
  });
};

export interface ShopSelectSheetCtaContext extends ShopListContext {
  sheetExpanded: boolean;
  selectedProducts: SelectedProduct[];
  imageEntryRoute?: ImageEntryRoute;
  returnScreenName: ScreenName;
  hasPreviousSpace: boolean;
  hasPreviousImage: boolean;
}

export const trackShopSelectSheetCtaClick = ({
  sheetExpanded,
  selectedProducts,
  imageEntryRoute,
  returnScreenName,
  hasPreviousSpace,
  hasPreviousImage,
  ...listContext
}: ShopSelectSheetCtaContext) => {
  const lastProduct = selectedProducts[selectedProducts.length - 1];

  trackEvent(GA_EVENTS.shop.SELECT_SHEET_CTA_CLICK, {
    ...getShopListContextParams(listContext),
    image_entry_route: imageEntryRoute,
    return_screen_name: returnScreenName,
    sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
    selected_count: selectedProducts.length,
    selected_product_ids: selectedProducts
      .map((product) => product.id)
      .join(', '),
    product_id: lastProduct?.id,
    product_name: lastProduct?.title,
    product_price: lastProduct?.discountPrice,
    has_previous_space: hasPreviousSpace,
    has_previous_image: hasPreviousImage,
  });
};

export const trackShopFeedCardSelectClick = (
  product: SelectedProduct,
  listContext?: ShopListContext
) => {
  trackEvent(GA_EVENTS.shop.FEED_CARD_SELECT_CLICK, {
    ...getShopListContextParams(listContext),
    ...getShopProductCardParams(product),
  });
};

export const trackShopFeedCardDetailClick = (
  product: ProductSearchCardItem | SelectedProduct,
  listContext?: ShopListContext
) => {
  trackEvent(GA_EVENTS.shop.FEED_CARD_DETAIL_CLICK, {
    ...getShopListContextParams(listContext),
    ...getShopProductCardParams(product),
  });
};

export const trackShopFeedCardUnselectClick = () => {
  trackEvent(GA_EVENTS.shop.FEED_CARD_UNSELECT_CLICK, shopScreenParams());
};

export const trackShopListProductView = (listContext?: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.LIST_PRODUCT_VIEW,
    getShopListContextParams(listContext)
  );
};

export const trackShopListEmptyView = (listContext?: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.LIST_EMPTY_VIEW,
    getShopListContextParams(listContext)
  );
};

export const trackShopFeedDetailMdView = () => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_VIEW, shopScreenParams());
};

export const trackShopFeedDetailMdSelectClick = (
  product: {
    id: number;
    title?: string;
    brand?: string;
    discountPrice?: number;
  },
  listContext?: ShopListContext
) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_SELECT_CLICK, {
    ...getShopListContextParams(listContext),
    ...getShopProductCardParams(product),
  });
};

export const trackShopFeedDetailMdSaveClick = (product: {
  id: number;
  title?: string;
}) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_SAVE_CLICK, {
    ...shopScreenParams(),
    ...getProductCardParams({ productId: product.id, name: product.title }),
  });
};

export const trackShopFeedDetailMdUnsaveClick = (product: {
  id: number;
  title?: string;
}) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_UNSAVE_CLICK, {
    ...shopScreenParams(),
    ...getProductCardParams({ productId: product.id, name: product.title }),
  });
};

export const trackShopFeedDetailMdGoSiteClick = (product: {
  id: number;
  title?: string;
  categoryName?: string;
  discountPrice?: number;
}) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_GO_SITE_CLICK, {
    ...shopScreenParams(),
    product_id: product.id,
    product_name: product.title,
    product_category: product.categoryName,
    product_price: product.discountPrice,
  });
};

export const trackShopFeedDetailMdCloseClick = () => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_CLOSE_CLICK, shopScreenParams());
};

export const trackShopSelectSheetView = (context: ShopSelectSheetContext) => {
  trackEvent(
    GA_EVENTS.shop.SELECT_SHEET_VIEW,
    getShopSelectSheetParams(context)
  );
};

export const trackShopSelectSheetSwipe = (
  eventName:
    | typeof GA_EVENTS.shop.SELECT_SHEET_SWIPE_UP
    | typeof GA_EVENTS.shop.SELECT_SHEET_SWIPE_DOWN,
  context: ShopSelectSheetContext
) => {
  trackEvent(eventName, getShopSelectSheetParams(context));
};

export const trackShopSelectSheetItemCountChange = (
  context: ShopSelectSheetContext
) => {
  trackEvent(
    GA_EVENTS.shop.SELECT_SHEET_ITEM_COUNT_CHANGE,
    getShopSelectSheetParams(context)
  );
};

export { COUNT_TRIGGER_EVENT, SHEET_EXPANSION_STATUS };
export type { SheetExpansionStatus };
