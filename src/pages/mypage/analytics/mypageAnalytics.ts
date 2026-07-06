import { GA_EVENTS } from '@shared/analytics/events';
import {
  getProductCardIdNameParams,
  getProductCardListCardParams,
  getProductCardOnCardParams,
  getProductCardParams,
  toProductCardInputFromJjymFeed,
  toProductCardInputFromUsedListProduct,
} from '@shared/analytics/params/builders/productCard';
import { IMG_RESULT_TYPE } from '@shared/analytics/params/result';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getReturnScreenNameParams } from '@shared/analytics/utils/screenName';

import type {
  DateGroupResponse,
  ItemResponse,
  UsedProductResponse,
} from '@apis/__generated__/data-contracts';

import type { FurnitureItem } from '../types/apis/saveItemsList';

const mypageScreenParams = () => ({
  screen_name: SCREEN_NAME.MYPAGE,
});

const mypageReturnScreenParams = () =>
  getReturnScreenNameParams(SCREEN_NAME.HOME);

export const getMypageSavedItemsListParams = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => ({
  saved_item_count: items.length,
  saved_item_ids:
    items
      .map((item) => item.rawProductId)
      .filter((id) => Number.isFinite(id))
      .join(', ') || undefined,
});

export const getMypageGenImgListParams = (groups: DateGroupResponse[] = []) => {
  const mypage_img_count = groups
    .flatMap((group) => group.items ?? [])
    .filter((item) => item.imageId != null).length;

  return { mypage_img_count };
};

const mapViewTypeToImgResultType = (
  viewType?: ItemResponse['viewType']
): (typeof IMG_RESULT_TYPE)[keyof typeof IMG_RESULT_TYPE] | undefined => {
  if (viewType === 'PRODUCT') {
    return IMG_RESULT_TYPE.LIST;
  }

  if (
    viewType === 'FULL_FUNNEL' ||
    viewType === 'LEGACY' ||
    viewType === 'BANNER' ||
    viewType === 'STYLE'
  ) {
    return IMG_RESULT_TYPE.RECOMMEND;
  }

  return undefined;
};

export const getMypageGenImgItemParams = (item: ItemResponse) => ({
  gen_img_id: item.imageId,
  gen_img_style: item.bannerTitle ?? item.productSummaryText ?? undefined,
  img_result_type: mapViewTypeToImgResultType(item.viewType),
});

export const trackMypageFeedCardView = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_VIEW, {
    ...mypageScreenParams(),
    ...getProductCardOnCardParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardGoSiteClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_GO_SITE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardSaveClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_SAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardUnsaveClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_UNSAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageFeedCardOnCardClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARDON_CARD_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardOnCardParams(toProductCardInputFromJjymFeed(item)),
  });
};

export const trackMypageListCardClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(item)
    ),
  });
};

export const trackMypageListCardGoSiteClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_GO_SITE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(item)
    ),
  });
};

export const trackMypageListCardSaveClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_SAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromUsedListProduct(item)),
  });
};

export const trackMypageListCardUnsaveClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_UNSAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardIdNameParams(toProductCardInputFromUsedListProduct(item)),
  });
};

export const trackMypageListCardView = () => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_VIEW, mypageScreenParams());
};

export const trackMypageTabSavedItemClick = () => {
  trackEvent(GA_EVENTS.mypage.TAB_SAVED_ITEM_CLICK);
};

export const trackMypageTabGenImgClick = () => {
  trackEvent(GA_EVENTS.mypage.TAB_GEN_IMG_CLICK);
};

export const trackMypageBtnBackClick = () => {
  trackEvent(GA_EVENTS.mypage.BTN_BACK_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
  });
};

export const trackMypageCardGenImgClick = (
  item: ItemResponse,
  product?: UsedProductResponse
) => {
  trackEvent(GA_EVENTS.mypage.CARD_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
    ...getMypageGenImgItemParams(item),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(product ?? {})
    ),
  });
};

export const trackMypageListGenImgView = (groups: DateGroupResponse[]) => {
  trackEvent(GA_EVENTS.mypage.LIST_GEN_IMG_VIEW, {
    ...mypageScreenParams(),
    ...getMypageGenImgListParams(groups),
  });
};

export const trackMypageListSavedItemView = (items: FurnitureItem[]) => {
  trackEvent(GA_EVENTS.mypage.LIST_SAVED_ITEM_VIEW, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnMoreGenImgClick = (
  item: ItemResponse,
  product?: UsedProductResponse
) => {
  trackEvent(GA_EVENTS.mypage.BTN_MORE_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
    ...getMypageGenImgItemParams(item),
    ...getProductCardListCardParams(
      toProductCardInputFromUsedListProduct(product ?? {})
    ),
  });
};

export const trackMypageSlideGenImgItemScroll = ({
  item,
  product,
}: {
  item: ItemResponse;
  product?: UsedProductResponse;
}) => {
  trackEvent(GA_EVENTS.mypage.SLIDE_GEN_IMG_ITEM_SCROLL, {
    ...getMypageGenImgItemParams(item),
    ...getProductCardParams(
      product ? toProductCardInputFromUsedListProduct(product) : {}
    ),
  });
};

export const trackMypageBtnSettingClick = () => {
  trackEvent(GA_EVENTS.mypage.BTN_SETTING_CLICK);
};

export const trackMypageListEmptyGenImgView = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.LIST_EMPTY_GEN_IMG_VIEW, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageListEmptySavedItemView = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.LIST_EMPTY_SAVED_ITEM_VIEW, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnCtaEmptyGenImgClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_CTA_EMPTY_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnTextEmptyGenImgClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_TEXT_EMPTY_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnCtaEmptySavedItemClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_CTA_EMPTY_SAVED_ITEM_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};

export const trackMypageBtnTextEmptySavedItemClick = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => {
  trackEvent(GA_EVENTS.mypage.BTN_TEXT_EMPTY_SAVED_ITEM_CLICK, {
    ...mypageScreenParams(),
    ...getMypageSavedItemsListParams(items),
  });
};
