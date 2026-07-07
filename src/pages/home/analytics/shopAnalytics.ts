import type { ProductFilterValues } from '@pages/home/hooks/useProductFilterState';
import type { ProductSearchCardItem } from '@pages/home/hooks/useProductSearch';
import type {
  AppliedFilterChip,
  ProductFilterChipCategory,
  SelectedProduct,
} from '@pages/home/types/productTab';
import { ALL_FILTER_SENTINEL } from '@pages/home/utils/productFilterUtils';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  getProductCardIdNameParams,
  getProductCardOnCardParams,
} from '@shared/analytics/params/builders/productCard';
import type { ImageEntryRoute } from '@shared/analytics/params/gate';
import {
  COUNT_TRIGGER_EVENT,
  SHEET_EXPANSION_STATUS,
  type CountTriggerEvent,
  type SheetExpansionStatus,
} from '@shared/analytics/params/shop';
import { SCREEN_NAME, type ScreenName } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { toSheetExpansionStatus } from '@shared/analytics/utils/imageFlow';
import { loginStatusParams } from '@shared/analytics/utils/loginStatus';
import { resolveShopTriggerContext } from '@shared/analytics/utils/shop/resolveShopTriggerContext';

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

type ShopListParamsOptions = {
  includeLoginStatus?: boolean;
  includeTriggerContext?: boolean;
  includeProductCountViewed?: boolean;
  isEmptyList?: boolean;
  sheetExpanded?: boolean;
};

const formatSelectedProductIds = (products: SelectedProduct[]) =>
  products.length > 0
    ? products.map((product) => product.id).join(', ')
    : undefined;

const formatSelectedSubCategoryTypes = (products: SelectedProduct[]) => {
  const subCategoryTypes = products
    .map((product) => product.subCategoryName)
    .filter(Boolean)
    .join(', ');

  return subCategoryTypes || undefined;
};

const formatSelectedShopKeywordFilters = (
  appliedFilterChips?: AppliedFilterChip[]
) => {
  const selected = appliedFilterChips
    ?.filter((chip) => chip.applied)
    .map((chip) => chip.label)
    .join(', ');

  return selected || undefined;
};

export const getShopListContextParams = (
  {
    searchKeyword,
    appliedValues,
    appliedFilterChips,
    furnitureLabels = {},
    priceLabels = {},
    colorLabels = {},
    productCount,
    productCountViewed,
  }: ShopListContext = {},
  options?: ShopListParamsOptions
) => {
  return {
    ...(options?.includeLoginStatus ? loginStatusParams() : {}),
    ...shopScreenParams(),
    search_keyword: searchKeyword?.trim() || undefined,
    selected_shop_keyword_filters:
      formatSelectedShopKeywordFilters(appliedFilterChips),
    filter_shop_furniture_type: labelsFromIds(
      appliedValues?.furnitureTypeIds,
      furnitureLabels
    ),
    filter_shop_price: labelsFromIds(appliedValues?.priceRangeIds, priceLabels),
    filter_shop_color: labelsFromIds(appliedValues?.colorIds, colorLabels),
    product_count: productCount,
    ...(options?.includeProductCountViewed
      ? { product_count_viewed: productCountViewed }
      : {}),
    ...(options?.includeTriggerContext
      ? {
          trigger_context: resolveShopTriggerContext({
            searchKeyword,
            appliedValues,
            appliedFilterChips,
            isEmptyList: options.isEmptyList,
          }),
        }
      : {}),
    ...(options?.sheetExpanded !== undefined
      ? {
          sheet_expansion_status: toSheetExpansionStatus(options.sheetExpanded),
        }
      : {}),
  };
};

export const getShopListProductScrollParams = ({
  productCount,
  productCountViewed,
}: Pick<ShopListContext, 'productCount' | 'productCountViewed'> = {}) => ({
  ...shopScreenParams(),
  product_count: productCount,
  product_count_viewed: productCountViewed,
});

const getShopSelectSheetBaseParams = (
  {
    sheetExpanded,
    selectedProducts,
    countTriggerEvent,
  }: Pick<
    ShopSelectSheetContext,
    'sheetExpanded' | 'selectedProducts' | 'countTriggerEvent'
  >,
  options?: {
    includeLoginStatus?: boolean;
    includeSelectedSubCategoryTypes?: boolean;
  }
) => {
  const selectedSubCategoryTypes =
    formatSelectedSubCategoryTypes(selectedProducts);

  return {
    ...(options?.includeLoginStatus ? loginStatusParams() : {}),
    ...shopScreenParams(),
    sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
    selected_count: selectedProducts.length,
    selected_product_ids: formatSelectedProductIds(selectedProducts),
    ...(options?.includeSelectedSubCategoryTypes && selectedSubCategoryTypes
      ? { selected_sub_category_types: selectedSubCategoryTypes }
      : {}),
    ...(countTriggerEvent ? { count_trigger_event: countTriggerEvent } : {}),
  };
};

const getShopSelectedProductFields = (
  product: Pick<
    SelectedProduct,
    'id' | 'title' | 'discountPrice' | 'categoryName' | 'subCategoryName'
  >
) => ({
  product_id: product.id,
  product_name: product.title,
  ...(product.categoryName ? { product_category: product.categoryName } : {}),
  ...(product.subCategoryName
    ? { product_sub_category: product.subCategoryName }
    : {}),
  product_price: product.discountPrice,
});

export const getShopSelectSheetParams = (
  context: ShopSelectSheetContext,
  options?: {
    includeLoginStatus?: boolean;
    includeSelectedSubCategoryTypes?: boolean;
  }
) => getShopSelectSheetBaseParams(context, options);

export const getShopProductCardParams = (product: {
  id: number;
  title?: string;
  brand?: string;
  originalPrice?: number;
  discountPrice?: number;
  categoryName?: string;
}) =>
  getProductCardOnCardParams({
    productId: product.id,
    name: product.title,
    brand: product.brand,
    originalPrice: product.originalPrice,
    finalPrice: product.discountPrice,
    product_category: product.categoryName,
  });

const formatNextSelectedProductIds = (
  productId: number,
  selectedProductIds?: string
) => {
  if (!selectedProductIds?.trim()) {
    return String(productId);
  }

  const ids = selectedProductIds.split(',').map((id) => id.trim());
  if (ids.includes(String(productId))) {
    return selectedProductIds;
  }

  return `${selectedProductIds}, ${productId}`;
};

export const trackShopFilterListClick = (
  category: ProductFilterChipCategory
) => {
  trackEvent(GA_EVENTS.shop.FILTER_LIST_CLICK, {
    ...shopScreenParams(),
    ...loginStatusParams(),
    filter_type: category,
  });
};

export const trackShopFilterSheetView = (
  listContext: ShopListContext = {},
  sheetExpanded: boolean
) => {
  trackEvent(GA_EVENTS.shop.FILTER_SHT_VIEW, {
    ...shopScreenParams(),
    ...loginStatusParams(),
    selected_shop_keyword_filters: formatSelectedShopKeywordFilters(
      listContext.appliedFilterChips
    ),
    sheet_expansion_status: toSheetExpansionStatus(sheetExpanded),
  });
};

export const trackShopFilterSheetSubmit = (
  listContext: ShopListContext,
  sheetExpanded: boolean
) => {
  trackEvent(
    GA_EVENTS.shop.FILTER_SHT_SUBMIT,
    getShopListContextParams(listContext, {
      includeLoginStatus: true,
      includeTriggerContext: true,
      sheetExpanded,
    })
  );
};

export const trackShopFilterSheetResetClick = (
  listContext: ShopListContext,
  sheetExpanded: boolean
) => {
  trackEvent(
    GA_EVENTS.shop.FILTER_SHT_RESET_CLICK,
    getShopListContextParams(listContext, {
      includeLoginStatus: true,
      includeTriggerContext: true,
      sheetExpanded,
    })
  );
};

export const trackShopSearchBarClick = () => {
  trackEvent(GA_EVENTS.shop.SEARCH_BAR_CLICK, shopScreenParams());
};

export const trackShopSearchSubmit = (listContext: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.SEARCH_SUBMIT,
    getShopListContextParams(listContext, {
      includeLoginStatus: true,
      includeTriggerContext: true,
    })
  );
};

export const trackShopSearchClear = (listContext: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.SEARCH_CLEAR,
    getShopListContextParams(listContext, {
      includeLoginStatus: true,
      includeTriggerContext: true,
    })
  );
};

export const trackShopSelectSheetAddItemClick = (
  context: ShopSelectSheetContext
) => {
  trackEvent(
    GA_EVENTS.shop.SELECT_SHEET_ADD_ITEM_CLICK,
    getShopSelectSheetParams(context, {
      includeLoginStatus: true,
      includeSelectedSubCategoryTypes: true,
    })
  );
};

export const trackShopSelectSheetRemoveClick = (
  context: ShopSelectSheetContext,
  product: Pick<
    SelectedProduct,
    'id' | 'title' | 'discountPrice' | 'categoryName' | 'subCategoryName'
  >
) => {
  trackEvent(GA_EVENTS.shop.SELECT_SHEET_REMOVE_CLICK, {
    ...getShopSelectSheetBaseParams(context, { includeLoginStatus: true }),
    ...getShopSelectedProductFields(product),
  });
};

export const trackShopSelectSheetItemClick = (
  context: ShopSelectSheetContext,
  product: Pick<
    SelectedProduct,
    'id' | 'title' | 'discountPrice' | 'categoryName' | 'subCategoryName'
  >
) => {
  trackEvent(GA_EVENTS.shop.SELECT_SHEET_ITEM_CLICK, {
    ...getShopSelectSheetBaseParams(context, { includeLoginStatus: true }),
    ...getShopSelectedProductFields(product),
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
}: ShopSelectSheetCtaContext) => {
  const lastProduct = selectedProducts[selectedProducts.length - 1];

  trackEvent(GA_EVENTS.shop.SELECT_SHEET_CTA_CLICK, {
    ...getShopSelectSheetBaseParams(
      { sheetExpanded, selectedProducts },
      { includeLoginStatus: true }
    ),
    ...getShopSelectedProductFields(lastProduct),
    image_entry_route: imageEntryRoute,
    return_screen_name: returnScreenName,
    has_previous_space: hasPreviousSpace,
    has_previous_image: hasPreviousImage,
  });
};

export const trackShopFeedCardSelectClick = (
  product: SelectedProduct,
  selectedProductIds?: string
) => {
  trackEvent(GA_EVENTS.shop.FEED_CARD_SELECT_CLICK, {
    ...shopScreenParams(),
    ...getShopProductCardParams(product),
    selected_product_ids: selectedProductIds,
  });
};

export const trackShopFeedCardDetailClick = (
  product: ProductSearchCardItem | SelectedProduct,
  selectedProductIds?: string
) => {
  trackEvent(GA_EVENTS.shop.FEED_CARD_DETAIL_CLICK, {
    ...shopScreenParams(),
    ...getShopProductCardParams(product),
    selected_product_ids: selectedProductIds,
  });
};

export const trackShopFeedCardUnselectClick = () => {
  trackEvent(GA_EVENTS.shop.FEED_CARD_UNSELECT_CLICK, shopScreenParams());
};

export const trackShopListProductView = (listContext?: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.LIST_PRODUCT_VIEW,
    getShopListContextParams(listContext, {
      includeLoginStatus: true,
      includeTriggerContext: true,
    })
  );
};

export const trackShopListEmptyView = (listContext?: ShopListContext) => {
  trackEvent(
    GA_EVENTS.shop.LIST_EMPTY_VIEW,
    getShopListContextParams(listContext, {
      includeLoginStatus: true,
      includeTriggerContext: true,
      isEmptyList: true,
    })
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
    categoryName?: string;
  },
  selectedProductIds?: string
) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_SELECT_CLICK, {
    ...shopScreenParams(),
    ...getShopProductCardParams(product),
    selected_product_ids: formatNextSelectedProductIds(
      product.id,
      selectedProductIds
    ),
  });
};

export const trackShopFeedDetailMdSaveClick = (product: {
  id: number;
  title?: string;
}) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_SAVE_CLICK, {
    ...shopScreenParams(),
    ...getProductCardIdNameParams({
      productId: product.id,
      name: product.title,
    }),
  });
};

export const trackShopFeedDetailMdUnsaveClick = (product: {
  id: number;
  title?: string;
}) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_UNSAVE_CLICK, {
    ...shopScreenParams(),
    ...getProductCardIdNameParams({
      productId: product.id,
      name: product.title,
    }),
  });
};

export const trackShopFeedDetailMdGoSiteClick = (product: {
  id: number;
  title?: string;
  brand?: string;
  categoryName?: string;
  discountPrice?: number;
}) => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_GO_SITE_CLICK, {
    ...shopScreenParams(),
    ...getShopProductCardParams(product),
  });
};

export const trackShopFeedDetailMdCloseClick = () => {
  trackEvent(GA_EVENTS.shop.FEED_DETAIL_MD_CLOSE_CLICK, shopScreenParams());
};

export const trackShopSelectSheetView = (context: ShopSelectSheetContext) => {
  trackEvent(
    GA_EVENTS.shop.SELECT_SHEET_VIEW,
    getShopSelectSheetParams(context, {
      includeLoginStatus: true,
      includeSelectedSubCategoryTypes: true,
    })
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
