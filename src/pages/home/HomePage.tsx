import LogoNavBar from '@shared/components/navBar/LogoNavBar';
import IntroSection from './components/introSection/IntroSection';
import StepGuideSection from './components/stepGuideSection/StepGuideSection';
import ReviewSection from './components/reviewSection/ReviewSection';
import * as styles from './HomePage.css';

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
    </main>
  );
};

export default HomePage;
