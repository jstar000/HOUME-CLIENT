import { useCallback, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  trackMypageBtnBackClick,
  trackMypageBtnCtaEmptyGenImgClick,
  trackMypageBtnCtaEmptySavedItemClick,
  trackMypageBtnMoreGenImgClick,
  trackMypageBtnSettingClick,
  trackMypageBtnTextEmptyGenImgClick,
  trackMypageBtnTextEmptySavedItemClick,
  trackMypageCardGenImgClick,
  trackMypageFeedCardGoSiteClick,
  trackMypageFeedCardOnCardClick,
  trackMypageFeedCardSaveClick,
  trackMypageFeedCardUnsaveClick,
  trackMypageFeedCardView,
  trackMypageListCardClick,
  trackMypageListCardGoSiteClick,
  trackMypageListCardSaveClick,
  trackMypageListCardUnsaveClick,
  trackMypageListCardView,
  trackMypageListEmptyGenImgView,
  trackMypageListEmptySavedItemView,
  trackMypageListGenImgView,
  trackMypageListSavedItemView,
  trackMypageSlideGenImgItemScroll,
  trackMypageTabGenImgClick,
  trackMypageTabSavedItemClick,
} from '@pages/mypage/analytics/mypageAnalytics';

import { ROUTES } from '@routes/paths';

import type {
  DateGroupResponse,
  ItemResponse,
  UsedProductResponse,
} from '@apis/__generated__/data-contracts';

import type { MypageMenuTab } from '../MyPage';
import type { FurnitureItem } from '../types/apis/saveItemsList';

const getPrimaryUsedProduct = (
  item: ItemResponse
): UsedProductResponse | undefined =>
  item.usedProducts?.find((product) => product.rawProductId != null);

// ---------------------------------------------------------------------------
// MyPage — 탭 / 뒤로가기 / 설정
// ---------------------------------------------------------------------------

interface UseMypagePageAnalyticsOptions {
  activeMenuTab: MypageMenuTab;
  setActiveMenuTab: (tab: MypageMenuTab) => void;
}

const useMypagePageAnalytics = ({
  activeMenuTab,
  setActiveMenuTab,
}: UseMypagePageAnalyticsOptions) => {
  const navigate = useNavigate();

  const handleTabChange = useCallback(
    (tab: MypageMenuTab) => {
      if (tab === 'savedItems' && activeMenuTab !== 'savedItems') {
        trackMypageTabSavedItemClick();
      }
      if (tab === 'generatedImages' && activeMenuTab !== 'generatedImages') {
        trackMypageTabGenImgClick();
      }
      setActiveMenuTab(tab);
    },
    [activeMenuTab, setActiveMenuTab]
  );

  const handleBackClick = useCallback(() => {
    trackMypageBtnBackClick();
    navigate(-1);
  }, [navigate]);

  const handleSettingClick = useCallback(() => {
    trackMypageBtnSettingClick();
    navigate(ROUTES.SETTING);
  }, [navigate]);

  return {
    handleTabChange,
    handleBackClick,
    handleSettingClick,
  };
};

// ---------------------------------------------------------------------------
// SavedItemsSection — 찜한 상품
// ---------------------------------------------------------------------------

interface UseMypageSavedItemsSectionAnalyticsOptions {
  savedItems: FurnitureItem[];
  isFetched: boolean;
}

const useMypageSavedItemsSectionAnalytics = ({
  savedItems,
  isFetched,
}: UseMypageSavedItemsSectionAnalyticsOptions) => {
  const trackedListViewRef = useRef(false);
  const trackedFeedCardIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    trackedListViewRef.current = false;
    trackedFeedCardIdsRef.current = new Set();
  }, [savedItems]);

  useEffect(() => {
    if (!isFetched || savedItems.length === 0 || trackedListViewRef.current) {
      return;
    }

    trackedListViewRef.current = true;
    trackMypageListSavedItemView(savedItems);

    savedItems.forEach((item) => {
      if (trackedFeedCardIdsRef.current.has(item.rawProductId)) return;
      trackedFeedCardIdsRef.current.add(item.rawProductId);
      trackMypageFeedCardView(item);
    });
  }, [isFetched, savedItems]);

  const handleFeedCardClick = useCallback((item: FurnitureItem) => {
    trackMypageFeedCardOnCardClick(item);
  }, []);

  const handleFeedCardGoSiteClick = useCallback((item: FurnitureItem) => {
    trackMypageFeedCardGoSiteClick(item);
  }, []);

  const handleFeedCardSaveToggle = useCallback(
    (item: FurnitureItem, isSaved: boolean) => {
      if (isSaved) {
        trackMypageFeedCardUnsaveClick(item);
      } else {
        trackMypageFeedCardSaveClick(item);
      }
    },
    []
  );

  return {
    handleFeedCardClick,
    handleFeedCardGoSiteClick,
    handleFeedCardSaveToggle,
  };
};

// ---------------------------------------------------------------------------
// GeneratedImagesSection — 생성한 이미지 목록
// ---------------------------------------------------------------------------

interface UseMypageGeneratedImagesSectionAnalyticsOptions {
  groups: DateGroupResponse[];
  isListReady: boolean;
}

const useMypageGeneratedImagesSectionAnalytics = ({
  groups,
  isListReady,
}: UseMypageGeneratedImagesSectionAnalyticsOptions) => {
  const trackedListViewRef = useRef(false);

  useEffect(() => {
    trackedListViewRef.current = false;
  }, [groups]);

  useEffect(() => {
    if (!isListReady || groups.length === 0 || trackedListViewRef.current) {
      return;
    }

    trackedListViewRef.current = true;
    trackMypageListGenImgView(groups);
  }, [groups, isListReady]);

  const trackCardGenImgClick = useCallback((item: ItemResponse) => {
    trackMypageCardGenImgClick(item, getPrimaryUsedProduct(item));
  }, []);

  const trackMoreGenImgClick = useCallback((item: ItemResponse) => {
    trackMypageBtnMoreGenImgClick(item, getPrimaryUsedProduct(item));
  }, []);

  return {
    trackCardGenImgClick,
    trackMoreGenImgClick,
  };
};

// ---------------------------------------------------------------------------
// GenImgCard — 생성 이미지 카드 하단 리스트 상품
// ---------------------------------------------------------------------------

interface UseMypageGenImgCardSectionAnalyticsOptions {
  item: Pick<
    ItemResponse,
    'imageId' | 'viewType' | 'bannerTitle' | 'productSummaryText'
  >;
  isListType: boolean;
  usedProducts: UsedProductResponse[];
}

const useMypageGenImgCardSectionAnalytics = ({
  item,
  isListType,
  usedProducts,
}: UseMypageGenImgCardSectionAnalyticsOptions) => {
  const trackedListCardViewRef = useRef(false);
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    trackedListCardViewRef.current = false;
  }, [item.imageId, usedProducts]);

  useEffect(() => {
    if (
      !isListType ||
      usedProducts.length === 0 ||
      trackedListCardViewRef.current
    ) {
      return;
    }

    trackedListCardViewRef.current = true;
    trackMypageListCardView();
  }, [isListType, usedProducts]);

  const handleListCardClick = useCallback((item: UsedProductResponse) => {
    trackMypageListCardClick(item);
  }, []);

  const handleListCardGoSiteClick = useCallback((item: UsedProductResponse) => {
    trackMypageListCardGoSiteClick(item);
  }, []);

  const handleListCardSaveToggle = useCallback(
    (item: UsedProductResponse, isSaved: boolean) => {
      if (isSaved) {
        trackMypageListCardUnsaveClick(item);
      } else {
        trackMypageListCardSaveClick(item);
      }
    },
    []
  );

  const handleSlideScroll = useCallback(() => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }

    scrollDebounceRef.current = setTimeout(() => {
      const firstProduct = usedProducts.find(
        (product) => product.rawProductId != null
      );
      trackMypageSlideGenImgItemScroll({
        item,
        product: firstProduct,
      });
    }, 300);
  }, [item, usedProducts]);

  return {
    handleListCardClick,
    handleListCardGoSiteClick,
    handleListCardSaveToggle,
    handleSlideScroll,
  };
};

// ---------------------------------------------------------------------------
// EmptyStateSection — 빈 목록
// ---------------------------------------------------------------------------

interface UseMypageEmptyStateSectionAnalyticsOptions {
  type: 'generatedImages' | 'savedItems';
  savedItemsForParams: Pick<FurnitureItem, 'rawProductId'>[];
  enabled: boolean;
}

const useMypageEmptyStateSectionAnalytics = ({
  type,
  savedItemsForParams,
  enabled,
}: UseMypageEmptyStateSectionAnalyticsOptions) => {
  const trackedViewRef = useRef(false);

  useEffect(() => {
    trackedViewRef.current = false;
  }, [type]);

  useEffect(() => {
    if (!enabled || trackedViewRef.current) return;

    trackedViewRef.current = true;
    if (type === 'generatedImages') {
      trackMypageListEmptyGenImgView(savedItemsForParams);
    } else {
      trackMypageListEmptySavedItemView(savedItemsForParams);
    }
  }, [enabled, savedItemsForParams, type]);

  const wrapPrimaryClick = useCallback(
    (onClick: () => void) => () => {
      if (type === 'generatedImages') {
        trackMypageBtnCtaEmptyGenImgClick(savedItemsForParams);
      } else {
        trackMypageBtnCtaEmptySavedItemClick(savedItemsForParams);
      }
      onClick();
    },
    [savedItemsForParams, type]
  );

  const wrapSecondaryClick = useCallback(
    (onClick: () => void) => () => {
      if (type === 'generatedImages') {
        trackMypageBtnTextEmptyGenImgClick(savedItemsForParams);
      } else {
        trackMypageBtnTextEmptySavedItemClick(savedItemsForParams);
      }
      onClick();
    },
    [savedItemsForParams, type]
  );

  return {
    wrapPrimaryClick,
    wrapSecondaryClick,
  };
};

export {
  useMypagePageAnalytics as useMypageAnalytics,
  useMypageSavedItemsSectionAnalytics as useMypageSavedItemsAnalytics,
  useMypageGeneratedImagesSectionAnalytics as useMypageGeneratedImagesAnalytics,
  useMypageGenImgCardSectionAnalytics as useMypageGenImgCardAnalytics,
  useMypageEmptyStateSectionAnalytics as useMypageEmptyStateAnalytics,
};
