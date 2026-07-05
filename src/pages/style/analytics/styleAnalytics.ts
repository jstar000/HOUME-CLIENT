import { GA_EVENTS } from '@shared/analytics/events';
import { getHomeStyleParams } from '@shared/analytics/params/builders';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';

export interface StyleContext {
  styleId: number;
  styleName?: string;
}

const styleListScreenParams = () => ({
  screen_name: SCREEN_NAME.STYLE_LIST,
});

const styleDetailScreenParams = () => ({
  screen_name: SCREEN_NAME.STYLE_DETAIL,
});

export const getStyleDetailPageViewParams = (ctx: StyleContext) =>
  getHomeStyleParams({
    styleId: ctx.styleId,
    styleName: ctx.styleName ?? '',
  });

export const trackStyleListCardClick = (ctx: StyleContext) => {
  trackEvent(GA_EVENTS.styleList.CARD_STYLE_CLICK, {
    ...styleListScreenParams(),
    ...getHomeStyleParams({
      styleId: ctx.styleId,
      styleName: ctx.styleName ?? '',
    }),
  });
};

export const trackStyleListBackClick = () => {
  trackEvent(GA_EVENTS.styleList.BTN_BACK_CLICK, styleListScreenParams());
};

export const trackStyleDetailBackClick = () => {
  trackEvent(GA_EVENTS.styleDetail.BTN_BACK_CLICK, styleDetailScreenParams());
};

export const trackStyleDetailCtaClick = (ctx: StyleContext) => {
  trackEvent(GA_EVENTS.styleDetail.BTN_CTA_CLICK, {
    ...styleDetailScreenParams(),
    image_entry_route: getEntryRoute(),
    ...getHomeStyleParams({
      styleId: ctx.styleId,
      styleName: ctx.styleName ?? '',
    }),
  });
};
