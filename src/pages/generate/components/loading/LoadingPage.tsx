import { useState } from 'react';
import * as styles from './LoadingPage.css';
import ProgressBar from './ProgressBar';
import { mockimages } from '../../constants/slideMockData';
import LikeButton from '@/shared/components/button/likeButton/LikeButton';
import DislikeButton from '@/shared/components/button/likeButton/DislikeButton';

const LoadingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const currentImage = mockimages[currentIndex];
  const nextImage = mockimages[currentIndex + 1];
  const [selected, setSelected] = useState<'like' | 'dislike' | null>(null);

  const handleVote = (isLike: boolean) => {
    setSelected(isLike ? 'like' : 'dislike');
    setAnimating(true);

    setTimeout(() => {
      if (currentIndex < mockimages.length - 1) {
        setSelected(null);
        setCurrentIndex((prev) => prev + 1);
      } else {
        console.log('이미지 끝');
      }
      setAnimating(false);
    }, 600);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.infoSection}>
        <ProgressBar />
        <p className={styles.infoText}>
          마음에 드는 가구를 선택하면, <br />
          하우미가 사용자님의 취향을 더 잘 이해할 수 있어요!
        </p>
      </section>
      <section className={styles.carouselSection}>
        <div className={styles.imageContainer}>
          {/* 다음 이미지 영역 */}
          {nextImage && (
            <div
              key={nextImage.id}
              className={`${styles.nextImageArea} ${animating ? styles.nextImageAreaActive : ''}`}
            >
              <img
                src={nextImage.img}
                alt={`next ${nextImage.id}`}
                className={styles.imageStyle}
              />
            </div>
          )}

          {/* 현재 이미지 영역 */}
          {currentImage && (
            <div
              key={currentImage.id}
              className={`${styles.currentImageArea} ${animating ? styles.currentImageAreaOut : ''}`}
            >
              <img
                src={currentImage.img}
                alt={`current ${currentImage.id}`}
                className={styles.imageStyle}
              />
            </div>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <LikeButton
            size={'large'}
            onClick={() => handleVote(true)}
            isSelected={selected === 'like'}
          >
            좋아요
          </LikeButton>
          <DislikeButton
            size={'large'}
            onClick={() => handleVote(false)}
            isSelected={selected === 'dislike'}
          >
            별로예요
          </DislikeButton>
        </div>
      </section>
    </div>
  );
};

export default LoadingPage;
