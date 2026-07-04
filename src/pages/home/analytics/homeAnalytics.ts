import type { BannerSlide } from '@pages/home/components/explore/banner/Banner';

import { GA_EVENTS } from '@shared/analytics/events';
import {
  getHomeBannerParams,
  getHomeStyleParams,
} from '@shared/analytics/params/builders';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';

type HomeSpaceCardInput = {
  spaceId?: number;
  spaceName?: string;
  hasPreviousSpace?: boolean;
  hasPreviousImage?: boolean;
};

const homeScreenParams = () => ({
  screen_name: SCREEN_NAME.HOME,
});

export const trackHomeTapExploreClick = () => {
  trackEvent(GA_EVENTS.home.TAP_EXPLORE_CLICK, homeScreenParams());
};

export const trackHomeTapShopClick = () => {
  trackEvent(GA_EVENTS.home.TAP_SHOP_CLICK, homeScreenParams());
};

export const trackHomeSpaceMoreClick = () => {
  trackEvent(GA_EVENTS.home.SPACE_MORE_CLICK, homeScreenParams());
};

export const trackHomeSpaceMoreCardClick = () => {
  trackEvent(GA_EVENTS.home.SPACE_MORE_CARD_CLICK, homeScreenParams());
};

export const trackHomeStyleMoreClick = () => {
  trackEvent(GA_EVENTS.home.STYLE_MORE_CLICK, homeScreenParams());
};

export const trackHomeBannerSlideEvent = (
  eventName:
    | typeof GA_EVENTS.home.BANNER_BG_IMG_CLICK
    | typeof GA_EVENTS.home.BANNER_LEFT_SWIPE
    | typeof GA_EVENTS.home.BANNER_RIGHT_SWIPE,
  slide: BannerSlide | undefined
) => {
  if (!slide) return;

  trackEvent(eventName, {
    ...homeScreenParams(),
    ...getHomeBannerParams({ bannerId: slide.id, bannerName: slide.title }),
  });
};

export const trackHomeSpaceCardClick = ({
  spaceId,
  spaceName,
  hasPreviousSpace,
  hasPreviousImage,
}: HomeSpaceCardInput) => {
  trackEvent(GA_EVENTS.home.SPACE_CARD_CLICK, {
    ...homeScreenParams(),
    has_previous_space: hasPreviousSpace,
    has_previous_image: hasPreviousImage,
    space_id: spaceId,
    space_name: spaceName,
  });
};

export const trackHomeSpaceCardSlideScroll = (spaceId?: number) => {
  trackEvent(GA_EVENTS.home.SPACE_CARD_SLIDE_SCROLL, {
    ...homeScreenParams(),
    ...(spaceId !== undefined && { space_id: spaceId }),
  });
};

export const trackHomeStyleCardClick = (style: {
  id: number;
  name?: string;
}) => {
  trackEvent(GA_EVENTS.home.STYLE_CARD_CLICK, {
    ...homeScreenParams(),
    ...getHomeStyleParams({ styleId: style.id, styleName: style.name }),
  });
};
