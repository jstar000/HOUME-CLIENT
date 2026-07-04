import { GA_EVENTS } from '@shared/analytics/events';
import { getPreviousScreenName } from '@shared/analytics/navigation/screenNavigation';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getLoginSocialParams } from '@shared/analytics/utils/loginEntryRoute';

import { getLoginRedirect } from '@utils/loginRedirect';

const settingScreenParams = () => ({
  screen_name: SCREEN_NAME.SETTING,
});

/**
 * setting_page_view params
 * - 로그인 게이트 복귀 URL(`loginRedirect`)이 있으면 getLoginSocialParams 사용
 * - 없으면 직전 화면(보통 mypage) — loginRedirect 미설정 시 HOME 폴백 방지
 */
export const getSettingPageViewParams = () => {
  if (getLoginRedirect()) {
    return getLoginSocialParams();
  }

  return {
    return_screen_name: getPreviousScreenName() ?? SCREEN_NAME.MYPAGE,
  };
};

export const trackSettingLogoutClick = () => {
  trackEvent(GA_EVENTS.setting.BTN_LOGOUT_CLICK, {
    ...settingScreenParams(),
    return_screen_name: SCREEN_NAME.HOME,
  });
};

export const trackSettingSuccessionClick = () => {
  trackEvent(GA_EVENTS.setting.BTN_SUCCESSION_CLICK, settingScreenParams());
};

export const trackSettingSuccessionModalView = () => {
  trackEvent(GA_EVENTS.setting.MD_SUCCESSION_VIEW, settingScreenParams());
};
