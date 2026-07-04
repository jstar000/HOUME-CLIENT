import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  joinProductIds,
  trackResultRecBtnArrowLeftClick,
  trackResultRecBtnArrowRightClick,
  trackResultRecBtnMoreImgClick,
  trackResultRecBtnPreferenceClick,
  trackResultRecChipFilterClick,
  trackResultRecFeedCardGoSiteClick,
  trackResultRecFeedCardOnCardClick,
  trackResultRecFeedCardSaveClick,
  trackResultRecFeedCardUnsaveClick,
  trackResultRecListRecView,
  trackResultRecMdNotYetView,
  trackResultRecSlideFilterCombView,
  trackResultRecToastThxOpinionView,
} from '@pages/generate/analytics/resultRecAnalytics';

import type { ProductCardInput } from '@shared/analytics/params/builders/productCard';

import type {
  FurnitureCategoryResponse,
  ProductInfo,
  ProductWrapper,
} from '@apis/__generated__/data-contracts';

type SectionDisplayState =
  | 'loading'
  | 'error'
  | 'empty'
  | 'partial'
  | 'content';

const toCurationFeedProductCardInput = (
  product: Pick<
    ProductInfo,
    | 'id'
    | 'name'
    | 'brand'
    | 'mallName'
    | 'originalPrice'
    | 'finalPrice'
    | 'categoryName'
  >
): ProductCardInput => ({
  productId: product.id,
  name: product.name,
  brand: product.brand ?? product.mallName,
  originalPrice: product.originalPrice,
  finalPrice: product.finalPrice,
  categoryName: product.categoryName,
});

const resolveRenderableProducts = (wrappers: ProductWrapper[]) =>
  wrappers
    .map((wrapper) => wrapper.product)
    .filter((product): product is ProductInfo => Boolean(product?.id));

interface UseResultRecAnalyticsOptions {
  currentImageId: number;
  categoriesState: SectionDisplayState;
  productsState: SectionDisplayState;
  selectedCategoryId: number | null;
  renderableCategories: FurnitureCategoryResponse[];
  renderableProducts: ProductWrapper[];
}

/**
 * 추천형 결과 페이지 GA — view 이벤트 + 필터/피드 카드 핸들러 래핑
 */
const useResultRecAnalytics = ({
  currentImageId,
  categoriesState,
  productsState,
  selectedCategoryId,
  renderableCategories,
  renderableProducts,
}: UseResultRecAnalyticsOptions) => {
  const resolvedProducts = useMemo(
    () => resolveRenderableProducts(renderableProducts),
    [renderableProducts]
  );

  const trackedFilterCombRef = useRef(false);
  const trackedListRecKeyRef = useRef<string | null>(null);

  useEffect(() => {
    trackedFilterCombRef.current = false;
    trackedListRecKeyRef.current = null;
  }, [currentImageId]);

  useEffect(() => {
    if (categoriesState !== 'content' || trackedFilterCombRef.current) return;

    trackedFilterCombRef.current = true;
    trackResultRecSlideFilterCombView({
      categories: renderableCategories,
      products: resolvedProducts,
    });
  }, [categoriesState, renderableCategories, resolvedProducts]);

  useEffect(() => {
    if (productsState !== 'content' || selectedCategoryId === null) return;

    const listRecKey = `${selectedCategoryId}:${joinProductIds(resolvedProducts)}`;
    if (trackedListRecKeyRef.current === listRecKey) return;

    trackedListRecKeyRef.current = listRecKey;
    trackResultRecListRecView({
      categories: renderableCategories,
      selectedCategoryId,
      products: resolvedProducts,
    });
  }, [
    productsState,
    renderableCategories,
    resolvedProducts,
    selectedCategoryId,
  ]);

  const handleCategoryChipClick = useCallback(
    (categoryId: number) => {
      if (selectedCategoryId !== categoryId) {
        trackResultRecChipFilterClick({
          categories: renderableCategories,
          selectedCategoryId: categoryId,
        });
      }
    },
    [renderableCategories, selectedCategoryId]
  );

  const handleFeedCardClick = useCallback((product: ProductInfo) => {
    trackResultRecFeedCardOnCardClick(toCurationFeedProductCardInput(product));
  }, []);

  const handleFeedCardGoSiteClick = useCallback((product: ProductInfo) => {
    trackResultRecFeedCardGoSiteClick(toCurationFeedProductCardInput(product));
  }, []);

  const handleFeedCardSaveToggle = useCallback(
    (product: ProductInfo, isSaved: boolean) => {
      const productInput = toCurationFeedProductCardInput(product);
      if (isSaved) {
        trackResultRecFeedCardUnsaveClick(productInput);
      } else {
        trackResultRecFeedCardSaveClick(productInput);
      }
    },
    []
  );

  const handleArrowLeftClick = useCallback(() => {
    trackResultRecBtnArrowLeftClick();
  }, []);

  const handleArrowRightClick = useCallback(() => {
    trackResultRecBtnArrowRightClick();
  }, []);

  const handleMoreImgClick = useCallback(() => {
    trackResultRecBtnMoreImgClick();
    trackResultRecMdNotYetView();
  }, []);

  const handlePreferenceClick = useCallback(
    (params: { genImgId: number; isLike: boolean }) => {
      trackResultRecBtnPreferenceClick(params);
    },
    []
  );

  const handleFactorFeedbackThankYou = useCallback(() => {
    trackResultRecToastThxOpinionView();
  }, []);

  return {
    handleCategoryChipClick,
    handleFeedCardClick,
    handleFeedCardGoSiteClick,
    handleFeedCardSaveToggle,
    handleArrowLeftClick,
    handleArrowRightClick,
    handleMoreImgClick,
    handlePreferenceClick,
    handleFactorFeedbackThankYou,
  };
};

export { useResultRecAnalytics };
