import { useEffect, useState } from 'react';

import type { GenerateImageData } from '@pages/generate/types/generate';
import { useCurationCategoriesQuery } from '@pages/generate/v2/apis/queries/useCurationCategoriesQuery';
import { useCurationProductsQuery } from '@pages/generate/v2/apis/queries/useCurationProductsQuery';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';

import Chip from '@/shared/components/v2/chip/Chip';
import ProductCard from '@/shared/components/v2/productCard/ProductCard';

import * as styles from './CurationResult.css';
import ImgFeedback from './feedbackSection/ImgFeedback';
import GeneratedImg from './imgSection/GeneratedImg';

export interface CurationResultProps {
  images: GenerateImageData[];
  onCurrentImgIdChange?: (imageId: number) => void;
  groupId?: number | null;
}

const CurationResult = ({
  images,
  onCurrentImgIdChange,
}: CurationResultProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const isLockedSlide = images.length > 0 && slideIndex === images.length;
  const lastImageId = images[images.length - 1]?.imageId;
  const currentImageId = images[0]?.imageId ?? 0;

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useCurationCategoriesQuery(currentImageId);

  useEffect(() => {
    setSelectedCategoryId(null);
  }, [currentImageId]);

  useEffect(() => {
    if (selectedCategoryId !== null) return;
    const list = categoriesData?.categories ?? [];
    const first = list[0];
    if (first?.id !== undefined) setSelectedCategoryId(first.id);
  }, [categoriesData?.categories, selectedCategoryId]);

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useCurationProductsQuery(currentImageId, selectedCategoryId ?? 0);
  const products = productsData?.products ?? [];
  const categories = categoriesData?.categories ?? [];

  const showCategoriesEmptyUnexpected =
    !isCategoriesLoading && !isCategoriesError && categories.length === 0;

  const showProductsEmptyUnexpected =
    selectedCategoryId !== null &&
    !isProductsLoading &&
    !isProductsError &&
    products.length === 0;

  return (
    <div className={styles.root}>
      <GeneratedImg
        images={images}
        onCurrentImgIdChange={onCurrentImgIdChange}
        onSlideChange={setSlideIndex}
      />

      <div className={styles.mainArea}>
        {!isLockedSlide && (
          <div className={styles.section}>
            <h1 className={styles.title}>이 공간에 어울리는 추천 상품</h1>
            <div className={styles.chipList}>
              {isCategoriesLoading ? (
                <div className={styles.blockSlot}>
                  <Loading />
                </div>
              ) : null}
              {isCategoriesError ? (
                <div className={styles.blockSlot}>
                  <InlineError
                    message="추천 카테고리를 불러올 수 없습니다"
                    onRetry={() => {
                      void refetchCategories();
                    }}
                  />
                </div>
              ) : null}
              {showCategoriesEmptyUnexpected ? (
                <div className={styles.blockSlot}>
                  <InlineError
                    message="추천 정보를 표시할 수 없습니다"
                    onRetry={() => {
                      void refetchCategories();
                    }}
                  />
                </div>
              ) : null}
              {!isCategoriesLoading &&
              !isCategoriesError &&
              categories.length > 0
                ? categories.map((cat, index) => (
                    <Chip
                      key={cat.id ?? `category-${index}`}
                      selected={selectedCategoryId === cat.id}
                      onClick={() =>
                        cat.id !== undefined && setSelectedCategoryId(cat.id)
                      }
                      disabled={cat.id === undefined}
                    >
                      {cat.categoryName ?? ''}
                    </Chip>
                  ))
                : null}
            </div>
            <div className={styles.productList}>
              {selectedCategoryId !== null && isProductsLoading ? (
                <div className={styles.blockSlot}>
                  <Loading />
                </div>
              ) : null}
              {selectedCategoryId !== null && isProductsError ? (
                <div className={styles.blockSlot}>
                  <InlineError
                    message="추천 상품을 불러올 수 없습니다"
                    onRetry={() => {
                      void refetchProducts();
                    }}
                  />
                </div>
              ) : null}
              {showProductsEmptyUnexpected ? (
                <div className={styles.blockSlot}>
                  <InlineError
                    message="상품 정보를 표시할 수 없습니다"
                    onRetry={() => {
                      void refetchProducts();
                    }}
                  />
                </div>
              ) : null}
              {!isProductsLoading &&
              !isProductsError &&
              !showProductsEmptyUnexpected
                ? products.map((p, index) => {
                    const imageUrl =
                      p.furnitureProductImageUrl ??
                      p.baseFurnitureImageUrl ??
                      '';
                    const href = p.furnitureProductSiteUrl ?? '';
                    const key =
                      p.furnitureProductId ??
                      `${p.furnitureProductName ?? 'product'}-${index}`;

                    return (
                      <ProductCard
                        key={key}
                        product={{
                          brand: p.furnitureProductMallName,
                          title: p.furnitureProductName ?? '',
                          imageUrl,
                          colorHexes: [],
                        }}
                        save={{
                          isSaved: false,
                          onToggle: () => {},
                        }}
                        link={{
                          href,
                          onClick: () => {},
                        }}
                        enableWholeCardLink={Boolean(href)}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        )}
        {isLockedSlide && lastImageId !== undefined && (
          <section
            className={styles.section}
            aria-label="생성 이미지 선호도 조사"
          >
            <ImgFeedback imageId={lastImageId} />
          </section>
        )}
      </div>
    </div>
  );
};

export default CurationResult;
