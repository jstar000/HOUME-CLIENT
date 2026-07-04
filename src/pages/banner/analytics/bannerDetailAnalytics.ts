import { GA_EVENTS } from '@shared/analytics/events';
import { getPreviousScreenName } from '@shared/analytics/navigation/screenNavigation';
import {
  getBannerChipParams,
  getHomeBannerParams,
} from '@shared/analytics/params/builders';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getEntryRoute } from '@shared/analytics/utils/imageEntryRoute';

export type BannerDetailContext = {
  bannerId: number;
  bannerName?: string;
};

const bannerDetailScreenParams = () => ({
  screen_name: SCREEN_NAME.BANNER_DETAIL,
});

export const getBannerDetailBannerParams = (ctx: BannerDetailContext) =>
  getHomeBannerParams({
    bannerId: ctx.bannerId,
    bannerName: ctx.bannerName ?? '',
  });

export const getBannerDetailPageViewParams = (
  ctx: BannerDetailContext,
  options?: { isNewUser?: boolean }
) => ({
  ...(options?.isNewUser !== undefined && { is_new_user: options.isNewUser }),
  ...getBannerDetailBannerParams(ctx),
});

export const trackBannerDetailChipClick = (
  ctx: BannerDetailContext,
  answer: { answerId: number; answerText: string }
) => {
  trackEvent(GA_EVENTS.bannerDetail.CHIP_CLICK, {
    ...bannerDetailScreenParams(),
    ...getBannerDetailBannerParams(ctx),
    ...getBannerChipParams({
      answerId: answer.answerId,
      answerText: answer.answerText,
    }),
  });
};

export const trackBannerDetailCtaClick = (
  ctx: BannerDetailContext,
  answer: { answerId: number; answerText: string }
) => {
  trackEvent(GA_EVENTS.bannerDetail.BTN_CTA_CLICK, {
    ...bannerDetailScreenParams(),
    image_entry_route: getEntryRoute(),
    ...getBannerDetailBannerParams(ctx),
    ...getBannerChipParams({
      answerId: answer.answerId,
      answerText: answer.answerText,
    }),
  });
};

export const trackBannerDetailBackClick = (ctx: BannerDetailContext) => {
  trackEvent(GA_EVENTS.bannerDetail.BTN_BACK_CLICK, {
    ...bannerDetailScreenParams(),
    return_screen_name: getPreviousScreenName() ?? SCREEN_NAME.HOME,
    ...getBannerDetailBannerParams(ctx),
  });
};
