import { GA_EVENTS } from '@shared/analytics/events';
import { getProductCardParams } from '@shared/analytics/params/builders/productCard';
import type { ProductCardInput } from '@shared/analytics/params/builders/productCard';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getReturnScreenNameParams } from '@shared/analytics/utils/screenName';

import type {
  DateGroupResponse,
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

export const toJjymFeedProductCardInput = (
  item: Pick<
    FurnitureItem,
    'rawProductId' | 'productName' | 'brandName' | 'listPrice' | 'discountPrice'
  >
): ProductCardInput => ({
  productId: item.rawProductId,
  name: item.productName,
  brand: item.brandName,
  originalPrice: item.listPrice,
  finalPrice: item.discountPrice,
});

export const toUsedListProductCardInput = (
  item: Pick<
    UsedProductResponse,
    'rawProductId' | 'productName' | 'listPrice' | 'discountPrice'
  >
): ProductCardInput => ({
  productId: item.rawProductId,
  name: item.productName,
  originalPrice: item.listPrice,
  finalPrice: item.discountPrice,
});

export const trackMypageFeedCardView = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_VIEW, {
    ...mypageScreenParams(),
    ...getProductCardParams(toJjymFeedProductCardInput(item)),
  });
};

export const trackMypageFeedCardGoSiteClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_GO_SITE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toJjymFeedProductCardInput(item)),
  });
};

export const trackMypageFeedCardSaveClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_SAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toJjymFeedProductCardInput(item)),
  });
};

export const trackMypageFeedCardUnsaveClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARD_UNSAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toJjymFeedProductCardInput(item)),
  });
};

export const trackMypageFeedCardOnCardClick = (item: FurnitureItem) => {
  trackEvent(GA_EVENTS.mypage.FEED_CARDON_CARD_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toJjymFeedProductCardInput(item)),
  });
};

export const trackMypageListCardClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toUsedListProductCardInput(item)),
  });
};

export const trackMypageListCardGoSiteClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_GO_SITE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toUsedListProductCardInput(item)),
  });
};

export const trackMypageListCardSaveClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_SAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toUsedListProductCardInput(item)),
  });
};

export const trackMypageListCardUnsaveClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_UNSAVE_CLICK, {
    ...mypageScreenParams(),
    ...getProductCardParams(toUsedListProductCardInput(item)),
  });
};

export const trackMypageListCardView = () => {
  trackEvent(GA_EVENTS.mypage.LIST_CARD_VIEW, mypageScreenParams());
};

export const trackMypageTabSavedItemClick = () => {
  trackEvent(GA_EVENTS.mypage.TAB_SAVED_ITEM_CLICK, mypageScreenParams());
};

export const trackMypageTabGenImgClick = () => {
  trackEvent(GA_EVENTS.mypage.TAB_GEN_IMG_CLICK, mypageScreenParams());
};

export const trackMypageBtnBackClick = () => {
  trackEvent(GA_EVENTS.mypage.BTN_BACK_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
  });
};

export const trackMypageCardGenImgClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.CARD_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
    ...getProductCardParams(toUsedListProductCardInput(item)),
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

export const trackMypageBtnMoreGenImgClick = (item: UsedProductResponse) => {
  trackEvent(GA_EVENTS.mypage.BTN_MORE_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
    ...getProductCardParams(toUsedListProductCardInput(item)),
  });
};

export const trackMypageSlideGenImgItemScroll = ({
  genImgId,
  product,
}: {
  genImgId: number;
  product?: UsedProductResponse;
}) => {
  trackEvent(GA_EVENTS.mypage.SLIDE_GEN_IMG_ITEM_SCROLL, {
    gen_img_id: genImgId,
    ...getProductCardParams(product ? toUsedListProductCardInput(product) : {}),
  });
};

export const trackMypageBtnSettingClick = () => {
  trackEvent(GA_EVENTS.mypage.BTN_SETTING_CLICK, mypageScreenParams());
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

/** 생성 이미지 카드 클릭 시 usedProducts가 없을 때 product 파라미터 없이 전송 */
export const trackMypageCardGenImgClickWithoutProduct = () => {
  trackEvent(GA_EVENTS.mypage.CARD_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
  });
};

export const trackMypageBtnMoreGenImgClickWithoutProduct = () => {
  trackEvent(GA_EVENTS.mypage.BTN_MORE_GEN_IMG_CLICK, {
    ...mypageScreenParams(),
    ...mypageReturnScreenParams(),
  });
};
