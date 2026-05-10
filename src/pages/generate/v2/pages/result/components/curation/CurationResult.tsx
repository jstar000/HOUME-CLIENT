import { useEffect, useState } from 'react';

import type { GenerateImageData } from '@pages/generate/types/generate';
import { useGenerateCurationCategoriesQuery } from '@pages/generate/v2/apis/queries/useCurationCategoriesQuery';
import { useCurationProductsQuery } from '@pages/generate/v2/apis/queries/useCurationProductsQuery';

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

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGenerateCurationCategoriesQuery(currentImageId);

  useEffect(() => {
    setSelectedCategoryId(null);
  }, [currentImageId]);

  useEffect(() => {
    if (selectedCategoryId !== null) return;
    const list = categoriesData?.categories ?? [];
    const first = list[0];
    if (first?.id !== undefined) setSelectedCategoryId(first.id);
  }, [categoriesData?.categories, selectedCategoryId]);

  const { data: productsData, isLoading: isProductsLoading } =
    useCurationProductsQuery(currentImageId, selectedCategoryId ?? 0);
  const products = productsData?.products ?? [];
  const categories = categoriesData?.categories ?? [];

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
              {isCategoriesLoading && categories.length === 0 ? (
                <p role="status">카테고리를 불러오는 중…</p>
              ) : null}
              {!isCategoriesLoading && categories.length === 0 ? (
                <p role="status">추천 카테고리가 없어요.</p>
              ) : null}
              {categories.map((cat, index) => (
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
              ))}
            </div>
            <div className={styles.productList}>
              {isProductsLoading && products.length === 0 ? (
                <p role="status">상품을 불러오는 중…</p>
              ) : null}
              {!isProductsLoading && products.length === 0 ? (
                <p role="status">이 카테고리에 추천 상품이 없어요.</p>
              ) : null}
              {products.map((p, index) => {
                const imageUrl =
                  p.furnitureProductImageUrl ?? p.baseFurnitureImageUrl ?? '';
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
              })}
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
