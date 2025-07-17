import LogoNavBar from '@shared/components/navBar/LogoNavBar';
import IntroSection from './components/introSection/IntroSection';
import StepGuideSection from './components/stepGuideSection/StepGuideSection';
import ReviewSection from './components/reviewSection/ReviewSection';
import * as styles from './HomePage.css';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import { useAuthStore } from '@/store/useAuthStore';

const HomePage = () => {
  // useAuthStore에서 accessToken을 가져와서 로그인 상태 확인
  const accessToken = useAuthStore((state) => state.accessToken);
  // accessToken 존재 여부로 로그인 상태 판단 (!!로 boolean 변환)
  const isLoggedIn = !!accessToken;

  return (
    <main className={styles.page}>
      <div className={styles.gradFrame}>
        {/* 로그인 상태에 따라 LogoNavBar 버튼 타입 동적 변경 */}
        {/* 로그인 전: 'login' → "로그인" 버튼, 로그인 후: 'profile' → 프로필 아이콘 */}
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
        {/* 로그인 상태에 따라 하단 플로팅 버튼 텍스트 동적 변경 */}
        <CtaButton>
          {isLoggedIn
            ? '우리집에 딱 맞는 스타일 보기'
            : '로그인하고 스타일 보기'}
        </CtaButton>
      </div>
    </main>
  );
};

export default HomePage;
