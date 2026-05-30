import { useLoginGate } from '@hooks/useLoginGate';

/**
 * 외부 상품 링크 이동의 SSOT
 * - 로그인 게이트를 통과한 뒤 새 탭으로 외부 상품 페이지를 연다
 * - 외부 URL이므로 새 탭(_blank) 유지: 같은 탭 내에서 외부 URL로 이동하면 SPA가 언로드되어 HOUME 컨텍스트가 소실됨
 */
export const useProductLink = () => {
  const { requireLogin } = useLoginGate();

  const openProductLink = (href?: string) => {
    if (!href || typeof window === 'undefined') return;

    requireLogin(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
    });
  };

  return { openProductLink };
};
