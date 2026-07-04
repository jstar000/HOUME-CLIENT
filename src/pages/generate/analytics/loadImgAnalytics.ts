import { GA_EVENTS } from '@shared/analytics/events';
import { getProductCardParams } from '@shared/analytics/params/builders/productCard';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';
import { getLoadImgReturnScreenName } from '@shared/analytics/utils/imageFlow/imageFlowParams';

const loadImgScreenParams = () => ({
  screen_name: SCREEN_NAME.LOAD_IMG,
});

const loadImgReturnScreenParams = () => ({
  return_screen_name: getLoadImgReturnScreenName(),
});

export const trackLoadImgPageRefresh = () => {
  trackEvent(GA_EVENTS.loadImg.PAGE_REFRESH, {
    ...loadImgScreenParams(),
    ...loadImgReturnScreenParams(),
  });
};

export const trackLoadImgPageBackSwipe = () => {
  trackEvent(GA_EVENTS.loadImg.PAGE_BACK_SWIPE, {
    ...loadImgScreenParams(),
    ...loadImgReturnScreenParams(),
  });
};

export const trackLoadImgCardPreferenceView = ({
  productId,
  loadedProductIds,
}: {
  productId: number;
  loadedProductIds: string;
}) => {
  trackEvent(GA_EVENTS.loadImg.CARD_PREFERENCE_VIEW, {
    ...loadImgScreenParams(),
    image_entry_route: getEntryRoute(),
    ...getProductCardParams({ productId }),
    loaded_product_ids: loadedProductIds,
  });
};

export const trackLoadImgMdGenImgQuitView = () => {
  trackEvent(GA_EVENTS.loadImg.MD_GEN_IMG_QUIT_VIEW, loadImgScreenParams());
};
