import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useUserStore } from '@store/useUserStore';

import { getLoginStatus } from '@shared/analytics/utils/loginStatus';
import { resolveScreenName } from '@shared/analytics/utils/screenName';
import { identifyClarityUser, setClarityTag } from '@shared/config/clarity';

import { useABTest } from '@hooks/useABTest';

/**
 * GA4 세그먼트 소스를 Clarity 커스텀 태그/식별로 미러링하는 훅
 * RootLayout에서 1회 마운트 — 세션 레코딩·히트맵을 GA4와 같은 축으로 필터링 가능하게 함
 */
export const useClaritySync = (): void => {
  const location = useLocation();
  const accessToken = useUserStore((state) => state.accessToken);
  const userId = useUserStore((state) => state.userId);
  const { variant, isLoading: isABTestLoading } = useABTest();

  // 화면 단위 세그먼트 — SPA 탭 화면(예: home ?tab=product)처럼 pathname이 안 바뀌는 화면을
  // 히트맵/레코딩에서 구분하는 핵심 태그
  useEffect(() => {
    setClarityTag(
      'screen_name',
      resolveScreenName(`${location.pathname}${location.search}`)
    );
  }, [location.pathname, location.search]);

  // 로그인 상태
  useEffect(() => {
    setClarityTag('login_status', getLoginStatus());
  }, [accessToken]);

  // A/B variant (배정 확정 후)
  useEffect(() => {
    if (!isABTestLoading) {
      setClarityTag('ab_variant', variant);
    }
  }, [variant, isABTestLoading]);

  // 유저 식별 — userId 확정 시 (boot 시 localStorage 하이드레이션 또는 로그인 후 useUserSync)
  useEffect(() => {
    if (userId != null) {
      identifyClarityUser(String(userId));
    }
  }, [userId]);
};
