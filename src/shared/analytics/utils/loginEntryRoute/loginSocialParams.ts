/**
 * loginSocial 이벤트 공통 파라미터
 *
 * - GA 저장값(`getLoginEntryRoute`) + 앱 복귀 URL(`getLoginRedirect`)을 조합
 * - `loginSocial_page_view`, `loginSocial_btnCTA_click`에서 공통 사용
 *
 * @example
 * track(EVENTS.LOGIN_SOCIAL_PAGE_VIEW, getLoginSocialParams());
 * // → { login_entry_route: 'home_banner', return_screen_name: 'home' }
 */
import { ROUTES } from '@routes/paths';

import type { LoginEntryRoute } from '@shared/analytics/params/gate';
import {
  resolveScreenName,
  type ScreenName,
} from '@shared/analytics/screenNames';
import { getLoginEntryRoute } from '@shared/analytics/utils/loginEntryRoute/storage';

import { getLoginRedirect } from '@utils/loginRedirect';

export type { LoginEntryRoute };

/** @deprecated `resolveScreenName` 사용 */
export const pathToScreenName = (path: string): ScreenName | string =>
  resolveScreenName(path);

/** loginSocial page_view / btnCTA_click 공통 파라미터 */
export const getLoginSocialParams = () => {
  const returnPath = getLoginRedirect() ?? ROUTES.HOME;
  const entryRoute = getLoginEntryRoute();

  return {
    ...(entryRoute ? { login_entry_route: entryRoute } : {}),
    return_screen_name: resolveScreenName(returnPath),
  };
};
