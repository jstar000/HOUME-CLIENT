// import { useState } from 'react';

import TestImage from '@assets/v2/images/testImg.png';
import ArrowRight from '@assets/v2/svg/ArrowRight.svg?react';

import { useJjymMutation } from '@/shared/apis/mutations/useJjymMutation';
import TextButton from '@/shared/components/v2/btnText/TextButton';
import ListCardProduct from '@/shared/components/v2/cardProduct/ListCardProduct';

import * as styles from './GenImgCard.css';

import type { UsedProduct } from '@/pages/mypage/types/apis/generateList';

// type CardClickArea = 'card' | 'image' | 'title';

interface GenImgCardProps {
  cardType?: 'list' | 'curation';
  productSummaryText?: string;
  imageUrl?: string;
  usedProducts?: UsedProduct[];
  onCurationClick?: () => void;
}

const GenImgCard = ({
  cardType = 'list',
  productSummaryText,
  imageUrl,
  usedProducts = [],
  onCurationClick,
}: GenImgCardProps) => {
  const isListType = cardType === 'list';

  // 찜 토글
  const { mutate: toggleJjym } = useJjymMutation();

  const handleToggleSave = (id: number) => {
    toggleJjym(id);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.textContainer} onClick={onCurationClick}>
        <span className={styles.headingTexxt}>{productSummaryText}</span>
        {/* 컴포넌트 수정 필요 */}
        <TextButton
          color="secondary"
          size="s"
          rightIcon={<ArrowRight aria-hidden />}
          onClick={onCurationClick}
        >
          더보기
        </TextButton>
      </section>
      <section className={styles.imgContainer}>
        <img src={imageUrl || TestImage} alt="" className={styles.cardImg} />
      </section>

      {isListType && (
        <section className={styles.listCardContainer}>
          {/* 찜 부분 수정 필요 */}
          {usedProducts.map((item) => (
            <ListCardProduct
              key={item.rawProductId}
              cardSize="s"
              imageUrl={item.productImageUrl}
              title={item.productName}
              isSaved={item.isJjym}
              onToggleSave={() => handleToggleSave(item.rawProductId)}
              linkHref={item.productSiteUrl}
              originalPrice={item.listPrice}
              discountRate={item.discountRate}
              discountPrice={item.discountPrice}
            />
          ))}
        </section>
      )}
    </div>
  );
};
export default GenImgCard;
