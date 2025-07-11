import { useState } from 'react';
import * as styles from './LoadingPage.css';
import ImageCarousel from './Carousel';
import { mockimages } from '../../constants/slideMockData';
import LikeButton from '@/shared/components/button/likeButton/LikeButton';
import DislikeButton from '@/shared/components/button/likeButton/DislikeButton';

const LoadingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images] = useState(mockimages);

  const handleVote = (isLike: boolean) => {
    const currentImage = mockimages[currentIndex];
    console.log(
      `이미지 ID: ${currentImage.id}, 선택: ${isLike ? '좋아요' : '별로예요'}`
    );

    // 다음 이미지로 이동
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log('캐러셀 이미지 끝');
    }
  };

  const handleComplete = () => {
    console.log('이미지 생성 완료');
  };
  return (
    <div className={styles.wrapper}>
      <section className={styles.infoSection}>
        <p className={styles.infoText}>
          마음에 드는 가구를 선택하면, <br />
          하우미가 사용자님의 취향을 더 잘 이해할 수 있어요!
        </p>
      </section>
      <section className={styles.carouselSection}>
        <div className={styles.imageArea}>
          <ImageCarousel currentIndex={currentIndex} />
        </div>
        <div className={styles.buttonGroup}>
          <LikeButton size={'large'} onClick={() => handleVote(true)}>
            좋아요
          </LikeButton>
          <DislikeButton size={'large'} onClick={() => handleVote(false)}>
            별로예요
          </DislikeButton>
        </div>
      </section>
    </div>
  );
};

export default LoadingPage;
