/**
 * 로그인 플로우 전용 공통 파라미터
 *
 * **사용 범위 (이 외 화면에서는 사용하지 않음)**
 * - `loginSocial` page_view / CTA / 약관 링크
 * - `signupForm` CTA (`signupForm_btnCTA_click`)
 * - `signupComp` page_view / CTA
 *
 * 일반 화면 `return_screen_name` → `getReturnScreenNameParams()`
 * 로그인 게이트 경유 page_view → `getLoginGatePageViewReturnParams()`
 * 이미지 퍼널 → `getReturnScreenNameFromImageEntry()`, `getLoadImgReturnScreenName()`
 * 고정 목적지(로그아웃·탑내비 등) → 이벤트별 `SCREEN_NAME` 명시
 *
 * - GA 저장값(`getLoginEntryRoute`) + 앱 복귀 URL(`getLoginRedirect`)을 조합
 *
 * @example
 * track(EVENTS.LOGIN_SOCIAL_PAGE_VIEW, getLoginSocialParams());
 * // → { login_entry_route: 'home_banner', return_screen_name: 'home' }
 *
 * @see `@shared/analytics/utils/screenName`
 */
import { ROUTES } from '@routes/paths';

import type { LoginEntryRoute } from '@shared/analytics/params/gate';
import type { ScreenName } from '@shared/analytics/screenNames';
import { resolveScreenName } from '@shared/analytics/utils/screenName';

import { getLoginRedirect } from '@utils/loginRedirect';

import { getLoginEntryRoute } from './storeLoginEntryRoute';

export type { LoginEntryRoute };

/** @deprecated `resolveScreenName` 사용 */
export const pathToScreenName = (path: string): ScreenName | string =>
  resolveScreenName(path);

/** 로그인 플로우 이벤트 공통 파라미터 (`login_entry_route` + `return_screen_name`) */
export const getLoginSocialParams = () => {
  const returnPath = getLoginRedirect() ?? ROUTES.HOME;
  const entryRoute = getLoginEntryRoute();

  return {
    ...(entryRoute ? { login_entry_route: entryRoute } : {}),
    return_screen_name: resolveScreenName(returnPath),
  };
};
