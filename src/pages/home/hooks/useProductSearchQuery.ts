import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useProductListQuery } from '@pages/home/apis/queries/useProductListQuery';

import type { CurationProductResponse } from '@shared/apis/__generated__/data-contracts';

import type { ProductListQueryVariables } from '@constants/queryKey';

/**
 * 상품 검색 카드 렌더에 사용하는 뷰 모델 타입
 * - SearchSection ProductCard 입력 형태를 기준으로 정의한다.
 */
type ProductSearchCardItem = {
  id: string;
  title: string;
  brand: string;
  imageUrl: string;
  discountRate: number;
  originalPrice: number;
  discountPrice: number;
  colorHexes: string[];
  saveCount: number;
  linkUrl: string;
};

/**
 * API 상품 응답 배열을 카드 렌더 모델로 정규화
 */
const toProductSearchCardItems = (
  products: CurationProductResponse[]
): ProductSearchCardItem[] =>
  products
    .filter((product) => product.id != null)
    .map((product) => ({
      id: String(product.id),
      title: product.name ?? '',
      brand: product.brand ?? '',
      imageUrl: product.imageUrl ?? '',
      discountRate: product.discountRate ?? 0,
      originalPrice: product.originalPrice ?? 0,
      discountPrice: product.finalPrice ?? 0,
      colorHexes: [],
      saveCount: 0,
      linkUrl: product.linkUrl ?? '',
    }));

/**
 * 상품 검색/조회(API) 전용 훅
 * - 키워드 상태 + 디바운스
 * - 목록 조회 쿼리 파라미터 조합
 * - 무한 스크롤(nextCursor) 트리거
 * - 카드 렌더용 데이터 변환
 * 을 한 곳에서 관리
 */
const useProductSearchQuery = (baseParams: ProductListQueryVariables) => {
  /** 하단 sentinel(ref)과 검색어 상태 */
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  /** 입력 직후 과요청을 줄이기 위한 300ms 디바운스 */
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [keyword]);

  /** 필터 기본 파라미터 + 키워드 결합 */
  const queryParams = useMemo(
    () => ({
      ...baseParams,
      keyword: debouncedKeyword.trim() ? debouncedKeyword.trim() : undefined,
    }),
    [baseParams, debouncedKeyword]
  );

  /** 커서 기반 상품 목록 조회 */
  const {
    data: productPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductListQuery(queryParams);

  /** 디버깅용 응답 로그 */
  useEffect(() => {
    if (!productPages) return;
    console.log('[SearchSection] product list response:', productPages);
  }, [productPages]);

  /**
   * sentinel 진입 시 다음 페이지 요청
   * - hasNextPage=false이거나 이미 로딩 중이면 요청하지 않음
   */
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        void fetchNextPage();
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  /** 페이지 응답을 상품 카드 렌더링 형태로 변환 */
  const products = useMemo(() => {
    const flatProducts = (productPages?.pages ?? []).flatMap(
      (page) => page.products ?? []
    );
    return toProductSearchCardItems(flatProducts);
  }, [productPages?.pages]);

  /** SearchBar controlled onChange 핸들러 */
  const handleSearchKeywordChange = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  /** SearchSection에서 사용할 값 */
  return {
    loadMoreRef,
    keyword,
    products,
    handleSearchKeywordChange,
  };
};

export { useProductSearchQuery };
export type { ProductSearchCardItem };
