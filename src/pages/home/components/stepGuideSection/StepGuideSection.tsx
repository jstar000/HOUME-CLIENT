import AiLandingImage from '@assets/icons/landingAIImage.png';
import InfoLandingImage from '@assets/icons/landingInfoImage.png';
import * as styles from './StepGuideSection.css.ts';
import TitleStep from '@/shared/components/titleStep/TitleStep';

const StepGuideSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.landingImage}>
        <img src={InfoLandingImage} alt="안내 랜딩 이미지" />
        <div className={styles.headingText}>
          <p>간단하게 정보를 입력하고</p>
          <p>나에게 딱 맞는 이미지를 받아보세요</p>
        </div>
      </div>
      <TitleStep stepNumber={1} title="우리 집과 유사한 구조를 선택하기" />
      <div className={`${styles.stepLandImage} ${styles.imageGap}`} />

      <TitleStep stepNumber={2} title="내 취향인 인테리어 이미지 선택하기" />
      <div className={`${styles.stepLandImage} ${styles.imageGap}`} />

      <TitleStep stepNumber={3} title="집에서 하는 주요 활동과 가구 선택하기" />
      <div className={`${styles.stepLandImage} ${styles.imageGap}`} />

      <div className={styles.landingImage}>
        <img src={AiLandingImage} alt="ai 랜딩 이미지" />
        <div className={styles.headingText}>
          <p>AI 이미지로 나와 집에 딱 맞는</p>
          <p>스타일링 이미지를 받아보세요</p>
        </div>
      </div>

      <div className={styles.resultLandImage} />
    </section>
  );
};

export default StepGuideSection;
