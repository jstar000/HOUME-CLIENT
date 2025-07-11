import LoadingBar from '@assets/loading.svg?react';
import * as styles from './LoadingPage.css';
import LikeButton from '@/shared/components/button/likeButton/LikeButton';
import DislikeButton from '@/shared/components/button/likeButton/DislikeButton';

const LoadingPage = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.infoSection}>
        <div className={styles.progressBarBox}>
          <LoadingBar width={'27rem'} />
          <p className={styles.loadText}>이미지를 생성하는 중이에요 (13%)</p>
        </div>
        <p className={styles.infoText}>
          마음에 드는 가구를 선택하면, <br />
          하우미가 사용자님의 취향을 더 잘 이해할 수 있어요!
        </p>
      </section>
      <section className={styles.carouselSection}>
        <div className={styles.imageArea}></div>
        <div className={styles.buttonGroup}>
          <LikeButton size={'large'}>좋아요</LikeButton>
          <DislikeButton size={'large'}>별로예요</DislikeButton>
        </div>
      </section>
    </div>
  );
};

export default LoadingPage;
