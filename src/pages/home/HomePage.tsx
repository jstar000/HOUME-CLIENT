import LogoNavBar from '@shared/components/navBar/LogoNavBar';
import IntroSection from './components/introSection/IntroSection';
import StepGuideSection from './components/stepGuideSection/StepGuideSection';
import ReviewSection from './components/reviewSection/ReviewSection';
import * as styles from './HomePage.css';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import { useAuthStore } from '@/store/useAuthStore';

const HomePage = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  // 인증 여부: prop이 있으면 우선 사용, 없으면 accessToken 존재 여부로 판단
  const isAuthenticated = !!accessToken;

  return (
    <main className={styles.page}>
      <div className={styles.gradFrame}>
        <LogoNavBar buttonType={isAuthenticated ? 'profile' : 'login'} />
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
