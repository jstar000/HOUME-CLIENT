/**
 * OAuth/로그인 완료 시 redirect 정리
 *
 * - 앱 복귀 URL(`consumeLoginRedirect`) + GA 키(`clearLoginEntryRoute`)를 함께 정리
 * - 카카오 로그인 성공/실패, WelcomePage CTA, 회원가입 실패 등 OAuth 이후 복귀 시 사용
 *
 * @example
 * navigate(finalizeLoginRedirect() ?? ROUTES.HOME, { replace: true });
 */
import { clearLoginEntryRoute } from '@shared/analytics/utils/loginEntryRoute/storage';

import { consumeLoginRedirect } from '@utils/loginRedirect';

export const finalizeLoginRedirect = (): string | null => {
  clearLoginEntryRoute();
  return consumeLoginRedirect();
};
