import LogoNavBar from '@shared/components/navBar/LogoNavBar';
import IntroSection from './introSection/IntroSection';
import StepGuideSection from './stepGuideSection/StepGuideSection';
import ReviewSection from './reviewSection/ReviewSection';
import * as styles from './HomePage.css';

const isLoggedIn = false;

const HomePage = () => {
  return (
    <main className={styles.page}>
      <LogoNavBar buttonType={isLoggedIn ? 'profile' : 'login'} />
      <div className={styles.contents}>
        <IntroSection />
        <StepGuideSection />
        <ReviewSection />
      </div>
    </main>
  );
};

export default HomePage;
