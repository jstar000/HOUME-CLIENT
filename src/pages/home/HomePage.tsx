import LogoNavBar from '@shared/components/navBar/LogoNavBar';
import IntroSection from './components/introSection/IntroSection';
import StepGuideSection from './components/stepGuideSection/StepGuideSection';
import ReviewSection from './components/reviewSection/ReviewSection';
import * as styles from './HomePage.css';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

const isLoggedIn = false;

const HomePage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.gradFrame}>
        <LogoNavBar buttonType={isLoggedIn ? 'profile' : 'login'} />
        <div className={styles.introSection}>
          <IntroSection />
        </div>
      </div>
      <div className={styles.contents}>
        <StepGuideSection />
        <ReviewSection />
      </div>
      <div className={styles.buttonContainer}>
        <CtaButton>우리집에 딱 맞는 스타일 보기</CtaButton>
      </div>
    </main>
  );
};

export default HomePage;
