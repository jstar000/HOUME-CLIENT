import { useState } from 'react';

import TestImage from '@assets/v2/images/testImg.png';
import ArrowRight from '@assets/v2/svg/ArrowRight.svg?react';

import TextButton from '@/shared/components/v2/btnText/TextButton';
import ListCardProduct from '@/shared/components/v2/cardProduct/ListCardProduct';

import * as styles from './GenImgCard.css';

const listCardMockData = [
  {
    id: 1,
    title: '리스트 상품명은 최대 한 줄까지 쓸 수 있어요.',
    linkHref: 'https://example.com',
    discountRate: 10,
    discountPrice: 1000000,
  },
  {
    id: 2,
    title: '리스트 상품명은 최대 한 줄까지 쓸 수 있어요.',
    linkHref: 'https://example.com',
    discountRate: 0,
    discountPrice: 500000,
  },
  {
    id: 3,
    title: '리스트 상품명은 최대 한 줄까지 쓸 수 있어요.',
    linkHref: 'https://example.com',
    discountPrice: 800000,
  },
  {
    id: 4,
    title: '리스트 상품명은 최대 한 줄까지 쓸 수 있어요.',
    linkHref: 'https://example.com',
    discountRate: 20,
    discountPrice: 300000,
  },
];

interface GenImgCardProps {}

const GenImgCard = () => {
  const [isSaved1, setIsSaved1] = useState(false);
  return (
    <div className={styles.wrapper}>
      <section className={styles.textContainer}>
        <span className={styles.headingTexxt}>
          침대 외 4개의 가구로 생성된 이미지
        </span>
        {/* 컴포넌트 수정 필요 */}
        <TextButton
          color="secondary"
          size="s"
          rightIcon={<ArrowRight aria-hidden />}
          onClick={() => {}}
        >
          더보기
        </TextButton>
      </section>
      <section className={styles.imgContainer}>
        <img src={TestImage} alt="" className={styles.cardImg} />
      </section>
      <section className={styles.listCardContainer}>
        {listCardMockData.map((item) => (
          <ListCardProduct
            key={item.id}
            cardSize="s"
            title={item.title}
            isSaved={isSaved1}
            onToggleSave={() => setIsSaved1((prev) => !prev)}
            linkHref={item.linkHref}
            discountRate={item.discountRate}
            discountPrice={item.discountPrice}
          />
        ))}
      </section>
    </div>
  );
};
export default GenImgCard;
