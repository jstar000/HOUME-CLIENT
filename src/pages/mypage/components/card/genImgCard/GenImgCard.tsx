import { useNavigate } from 'react-router-dom';

import { useMypageGenImgCardAnalytics } from '@pages/mypage/hooks/useMypageAnalytics';

import { ROUTES } from '@routes/paths';

import { LOGIN_ENTRY_ROUTE } from '@shared/analytics/params/gate';

import type { UsedProductResponse } from '@apis/__generated__/data-contracts';
import { useJjymMutation } from '@apis/mutations/useJjymMutation';

import emptyImage from '@assets/v2/images/ImgEmpty.png';

import OptimizedImage from '@components/image/OptimizedImage';
import TextButton from '@components/v2/btnText/TextButton';
import ListProductCard from '@components/v2/productCard/ListProductCard';

import * as styles from './GenImgCard.css';

interface GenImgCardProps {
  cardType?: 'list' | 'curation';
  productSummaryText?: string | null;
  imageId: number;
  imageUrl?: string;
  isMirror?: boolean;
  usedProducts?: UsedProductResponse[];
  onCardGenImgClick?: () => void;
  onBtnMoreGenImgClick?: () => void;
  onImageLoad?: (imageId: number, imageUrl?: string) => void;
}

const GenImgCard = ({
  cardType = 'list',
  productSummaryText,
  imageId,
  imageUrl,
  isMirror = false,
  usedProducts = [],
  onCardGenImgClick,
  onBtnMoreGenImgClick,
  onImageLoad,
}: GenImgCardProps) => {
  const isListType = cardType === 'list';
  const navigate = useNavigate();

  const {
    handleListCardClick,
    handleListCardGoSiteClick,
    handleListCardSaveToggle,
    handleSlideScroll,
  } = useMypageGenImgCardAnalytics({
    imageId,
    isListType,
    usedProducts,
  });

  const handleImageLoad = () => {
    onImageLoad?.(imageId, imageUrl);
  };

  const { mutate: toggleJjym } = useJjymMutation({
    savedToastType: 'stored',
    loginEntryRoute: LOGIN_ENTRY_ROUTE.PRODUCT_LIST_SAVE,
    onSavedAction: () => {
      navigate(ROUTES.MYPAGE, { state: { activeTab: 'savedItems' } });
    },
  });

  const handleToggleSave = (item: UsedProductResponse, isSaved: boolean) => {
    handleListCardSaveToggle(item, isSaved);
    toggleJjym(item.rawProductId!, { productName: item.productName });
  };

  return (
    <div className={styles.wrapper}>
      <section
        className={styles.textContainer}
        role="button"
        tabIndex={0}
        onClick={onCardGenImgClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onCardGenImgClick) {
            e.preventDefault();
            onCardGenImgClick();
          }
        }}
      >
        <span className={styles.headingText}>{productSummaryText}</span>
        <TextButton
          color="secondary"
          size="s"
          rightIcon={'ArrowRight'}
          onClick={(e) => {
            e.stopPropagation();
            onBtnMoreGenImgClick?.();
          }}
        >
          더보기
        </TextButton>
      </section>
      <section className={styles.imgContainer} onClick={onCardGenImgClick}>
        <OptimizedImage
          src={imageUrl || emptyImage}
          fallbackSrc={emptyImage}
          alt={productSummaryText ?? '생성 이미지'}
          className={styles.cardImg({ mirrored: isMirror })}
          placeholder="skeleton"
          onLoad={handleImageLoad}
        />
      </section>

      {isListType && (
        <section
          className={styles.listCardContainer}
          onScroll={handleSlideScroll}
        >
          {usedProducts.map((item) => {
            if (item.rawProductId == null) return null;
            const href = item.productSiteUrl?.trim() ?? '';

            return (
              <ListProductCard
                key={item.rawProductId}
                cardSize="s"
                enableWholeCardLink={Boolean(href)}
                onCardClick={() => handleListCardClick(item)}
                product={{
                  title: item.productName ?? '',
                  imageUrl: item.productImageUrl ?? '',
                }}
                price={{
                  original: item.listPrice ?? 0,
                  discount: item.discountPrice ?? 0,
                  discountRate: item.discountRate ?? 0,
                }}
                save={{
                  isSaved: item.isJjym ?? false,
                  onToggle: () => handleToggleSave(item, item.isJjym ?? false),
                }}
                link={
                  href
                    ? {
                        href,
                        onClick: () => handleListCardGoSiteClick(item),
                      }
                    : undefined
                }
              />
            );
          })}
        </section>
      )}
    </div>
  );
};
export default GenImgCard;
