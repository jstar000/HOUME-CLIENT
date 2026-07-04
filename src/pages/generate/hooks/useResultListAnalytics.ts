import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  joinImageIds,
  joinProductIds,
  trackResultListBtnReselectClick,
  trackResultListFeedCardGoSiteClick,
  trackResultListFeedCardOnCardClick,
  trackResultListFeedCardSaveClick,
  trackResultListFeedCardUnsaveClick,
  trackResultListImgCardOnCardClick,
  trackResultListListCardClick,
  trackResultListListCardGoSiteClick,
  trackResultListListCardSaveClick,
  trackResultListListCardUnsaveClick,
  trackResultListListLookAroundView,
  trackResultListListOthersImgView,
  trackResultListListSelectedView,
} from '@pages/generate/analytics/resultListAnalytics';

import type { ProductCardInput } from '@shared/analytics/params/builders/productCard';

import type {
  GenerateImageResultProductResponse,
  RelatedImageResponse,
  SimilarItemResponse,
} from '@apis/__generated__/data-contracts';

type SectionDisplayState =
  | 'loading'
  | 'error'
  | 'empty'
  | 'partial'
  | 'content';

const toSelectedListProductCardInput = (
  item: Pick<
    GenerateImageResultProductResponse,
    'id' | 'name' | 'originalPrice' | 'finalPrice'
  >
): ProductCardInput => ({
  productId: item.id,
  name: item.name,
  originalPrice: item.originalPrice,
  finalPrice: item.finalPrice,
});

const toSimilarFeedProductCardInput = (
  item: Pick<
    SimilarItemResponse,
    'id' | 'name' | 'brand' | 'originalPrice' | 'finalPrice'
  >
): ProductCardInput => ({
  productId: item.id,
  name: item.name,
  brand: item.brand,
  originalPrice: item.originalPrice,
  finalPrice: item.finalPrice,
});

interface UseResultListAnalyticsOptions {
  genImgId: number;
  selectedState: SectionDisplayState;
  similarState: SectionDisplayState;
  relatedState: SectionDisplayState;
  renderableSelectedProducts: GenerateImageResultProductResponse[];
  renderableSimilarProducts: SimilarItemResponse[];
  renderableRelatedImages: RelatedImageResponse[];
}

/**
 * 목록형 결과 페이지 GA — view 이벤트 + 클릭/찜 핸들러 래핑
 */
const useResultListAnalytics = ({
  genImgId,
  selectedState,
  similarState,
  relatedState,
  renderableSelectedProducts,
  renderableSimilarProducts,
  renderableRelatedImages,
}: UseResultListAnalyticsOptions) => {
  const selectedProductIdsParam = useMemo(
    () => joinProductIds(renderableSelectedProducts),
    [renderableSelectedProducts]
  );

  const trackedSelectedViewRef = useRef(false);
  const trackedLookAroundViewRef = useRef(false);
  const trackedOthersImgViewRef = useRef(false);

  useEffect(() => {
    trackedSelectedViewRef.current = false;
    trackedLookAroundViewRef.current = false;
    trackedOthersImgViewRef.current = false;
  }, [genImgId]);

  useEffect(() => {
    if (selectedState !== 'content' || trackedSelectedViewRef.current) return;

    trackedSelectedViewRef.current = true;
    trackResultListListSelectedView(selectedProductIdsParam);
  }, [selectedProductIdsParam, selectedState]);

  useEffect(() => {
    if (similarState !== 'content' || trackedLookAroundViewRef.current) return;

    trackedLookAroundViewRef.current = true;
    trackResultListListLookAroundView(
      joinProductIds(renderableSimilarProducts)
    );
  }, [renderableSimilarProducts, similarState]);

  useEffect(() => {
    if (relatedState !== 'content' || trackedOthersImgViewRef.current) return;

    trackedOthersImgViewRef.current = true;
    trackResultListListOthersImgView(joinImageIds(renderableRelatedImages));
  }, [relatedState, renderableRelatedImages]);

  const wrapReselectClick = useCallback(
    (onReselect: () => void) => () => {
      trackResultListBtnReselectClick(selectedProductIdsParam);
      onReselect();
    },
    [selectedProductIdsParam]
  );

  const handleSelectedListCardClick = useCallback(
    (item: GenerateImageResultProductResponse) => {
      trackResultListListCardClick(toSelectedListProductCardInput(item));
    },
    []
  );

  const handleSelectedListCardGoSiteClick = useCallback(
    (item: GenerateImageResultProductResponse) => {
      trackResultListListCardGoSiteClick(toSelectedListProductCardInput(item));
    },
    []
  );

  const handleSelectedListCardSaveToggle = useCallback(
    (item: GenerateImageResultProductResponse, isSaved: boolean) => {
      const product = toSelectedListProductCardInput(item);
      if (isSaved) {
        trackResultListListCardUnsaveClick(product);
      } else {
        trackResultListListCardSaveClick(product);
      }
    },
    []
  );

  const handleSimilarFeedCardClick = useCallback(
    (item: SimilarItemResponse) => {
      trackResultListFeedCardOnCardClick(toSimilarFeedProductCardInput(item));
    },
    []
  );

  const handleSimilarFeedCardGoSiteClick = useCallback(
    (item: SimilarItemResponse) => {
      trackResultListFeedCardGoSiteClick(toSimilarFeedProductCardInput(item));
    },
    []
  );

  const handleSimilarFeedCardSaveToggle = useCallback(
    (item: SimilarItemResponse, isSaved: boolean) => {
      const product = toSimilarFeedProductCardInput(item);
      if (isSaved) {
        trackResultListFeedCardUnsaveClick(product);
      } else {
        trackResultListFeedCardSaveClick(product);
      }
    },
    []
  );

  const handleRelatedImageClick = useCallback(
    (othersImgId: number) => {
      trackResultListImgCardOnCardClick({
        genImgId,
        selectedProductIds: selectedProductIdsParam,
        othersImgId,
      });
    },
    [genImgId, selectedProductIdsParam]
  );

  return {
    wrapReselectClick,
    handleSelectedListCardClick,
    handleSelectedListCardGoSiteClick,
    handleSelectedListCardSaveToggle,
    handleSimilarFeedCardClick,
    handleSimilarFeedCardGoSiteClick,
    handleSimilarFeedCardSaveToggle,
    handleRelatedImageClick,
  };
};

export { useResultListAnalytics };
