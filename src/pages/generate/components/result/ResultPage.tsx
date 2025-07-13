import { useState } from 'react';
import BlurImage from '@assets/img_recommend_blur.svg?react';
import * as styles from './ResultPage.css';
import type { GenerateTypes } from '../../types/GenerateType';
import LikeButton from '@/shared/components/button/likeButton/LikeButton';
import DislikeButton from '@/shared/components/button/likeButton/DislikeButton';
import HeadingText from '@/shared/components/text/HeadingText';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

interface GenerateProps {
  data: GenerateTypes;
}

const ResultPage = ({ data }: GenerateProps) => {
  const [selected, setSelected] = useState<'like' | 'dislike' | null>(null);

  const handleVote = (isLike: boolean) => {
    console.log(`선택: ${isLike ? '만족스러워요' : '아쉬워요'}`);
    setSelected(isLike ? 'like' : 'dislike');
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.headerSection}>
        <HeadingText title="이미지 생성이 완료됐어요!" content="" />
        <div className={styles.infoSection}>
          <p className={styles.infoText}>
            {data.sqft}평 오피스텔에 살며 {data.style}한 취향을 가진 <br />
            {data.user}님을 위한 맞춤 인테리어 스타일링이에요!
          </p>
        </div>
      </section>
      <section className={styles.resultSection}>
        <div className={styles.imgArea}></div>
        <div className={styles.buttonGroup}>
          <LikeButton
            size={'large'}
            onClick={() => handleVote(true)}
            isSelected={selected === 'like'}
          >
            만족스러워요
          </LikeButton>
          <DislikeButton
            size={'large'}
            onClick={() => handleVote(false)}
            isSelected={selected === 'dislike'}
          >
            아쉬워요
          </DislikeButton>
        </div>
      </section>
      <section className={styles.curationSection}>
        <div className={styles.textContainer}>
          <p className={styles.headerText}>생성한 이미지처럼 방을 꾸며봐요</p>
          <p className={styles.bodyText}>
            이미지의 분위기를 기반으로, <br />
            좋아하실 만한 가구를 골라봤어요!
          </p>
        </div>
        <div className={styles.blurSection}>
          <BlurImage />
          <div className={styles.ctaButtonOverlay}>
            <CtaButton>가구 추천받기</CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultPage;
