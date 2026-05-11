import { useCallback, useEffect, useRef } from 'react';

import { useBlocker, type BlockerFunction } from 'react-router-dom';

interface UseExitBlockerOptions {
  // exit 차단 활성화 여부. false면 useBlocker가 inactive 상태로 동작
  enabled: boolean;
  /**
   * blocker가 'blocked' 상태로 진입할 때마다 호출되는 콜백.
   * - proceed: 막혀있던 navigation을 진행 (ex: 사용자가 모달에서 '나가기' 선택 시)
   * - reset: blocked 상태 해제, 현재 페이지에 머무름 (ex: 모달에서 '계속하기' 선택 시)
   */
  onBlocked: (args: { proceed: () => void; reset: () => void }) => void;
  /**
   * 차단 여부 상세 제어 함수
   * true 반환 시 차단, false 반환 시 통과
   * 미지정 시 enabled=true면 모든 navigation을 차단
   * (예: 같은 페이지 내 step 이동은 통과, 화이트리스트 라우트는 통과 등)
   */
  shouldBlockNavigation?: BlockerFunction;
}

/**
 * 페이지 이탈 가드 공용 훅
 * - NavBar 뒤로가기, 브라우저 뒤로가기/앞으로가기, 모바일 뒤로가기 swipe 모두 가로챔
 * - 새로고침/탭 닫기는 가로채지 않음 (필요해지면 beforeunload로 별도 처리하면 됨)
 */
export const useExitBlocker = ({
  enabled,
  onBlocked,
  shouldBlockNavigation,
}: UseExitBlockerOptions) => {
  // 호출부에서 inline 함수를 넘겨도 useBlocker가 매 렌더 재등록되지 않도록 ref 적용
  const onBlockedRef = useRef(onBlocked);
  const shouldRef = useRef(shouldBlockNavigation);

  // 매 렌더마다 ref를 최신 콜백으로 동기화
  useEffect(() => {
    onBlockedRef.current = onBlocked;
  }, [onBlocked]);

  useEffect(() => {
    shouldRef.current = shouldBlockNavigation;
  }, [shouldBlockNavigation]);

  // blockerFn은 enabled가 바뀔 때만 새로 생성 → useBlocker가 enabled 토글을 즉시 인식
  const blockerFn = useCallback<BlockerFunction>(
    (args) => {
      if (!enabled) return false;
      return shouldRef.current ? shouldRef.current(args) : true;
    },
    [enabled]
  );

  // React Router Data API의 blocker 상태 머신 ('unblocked' | 'blocked' | 'proceeding')
  const blocker = useBlocker(blockerFn);

  // blocker가 'blocked' 상태로 진입하는 순간 onBlocked 콜백 실행 (모달 표시 등)
  useEffect(() => {
    if (blocker.state === 'blocked') {
      onBlockedRef.current({
        proceed: blocker.proceed,
        reset: blocker.reset,
      });
    }
  }, [blocker]);

  // 모달이 떠 있는 상태로 컴포넌트 언마운트 시 blocker가 stuck되는 것 방지
  // (이후 다른 페이지의 navigation까지 모두 막힐 수 있음)
  useEffect(() => {
    return () => {
      if (blocker.state === 'blocked') blocker.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return blocker;
};
