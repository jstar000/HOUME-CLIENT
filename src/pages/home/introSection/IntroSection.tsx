import * as styles from './IntroSection.css';
import SmallFilledButton from '@/shared/components/button/smallFilledButton/SmallFilledButton';

const IntroSection = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        나답게 꾸미고 살고 싶은
        <br />
        1인 가구를 위한 인테리어 솔루션
      </h2>
      <p className={styles.description}>
        하우미는 집 구조, 인테리어 취향, 주요 활동까지
        <br />
        AI 기반 이미지로 나만의 공간 스타일링을 제안해드려요.
      </p>

      <div className={styles.placeholderBox} />

      <div className={styles.buttonGroup}>
        <SmallFilledButton>휴식형</SmallFilledButton>
        <SmallFilledButton>재택근무형</SmallFilledButton>
        <SmallFilledButton>홈카페형</SmallFilledButton>
        <SmallFilledButton>영화감상형</SmallFilledButton>
      </div>
    </section>
  );
};

export default IntroSection;
