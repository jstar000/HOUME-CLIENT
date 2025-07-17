import LogoNavBar from '@shared/components/navBar/LogoNavBar';
import IntroSection from './components/introSection/IntroSection';
import StepGuideSection from './components/stepGuideSection/StepGuideSection';
import ReviewSection from './components/reviewSection/ReviewSection';
import * as styles from './HomePage.css';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import { useUserStore } from '@/store/useUserStore';
import { useMyPageUser } from '@/pages/mypage/hooks/useMyPage';

const HomePage = () => {
  // useUserStore에서 accessToken을 가져와서 로그인 상태 확인
  const accessToken = useUserStore((state) => state.accessToken);
  // accessToken 존재 여부로 로그인 상태 판단 (!!로 boolean 변환)
  const isLoggedIn = !!accessToken;

  /**
   * 로그인된 사용자의 크레딧 정보 조회
   * - 로그인 상태일 때만 API 호출 (enabled 옵션 활용)
   * - React Query 캐싱으로 중복 호출 방지 (5분 캐시)
   * - 크레딧 기반 플로팅 버튼 분기 처리를 위한 데이터 수집
   */
  const { data: userData, isLoading: isUserDataLoading } = useMyPageUser({
    enabled: isLoggedIn, // 핵심: 로그인 상태일 때만 API 호출
  });

  // 개발용 로그 (추후 제거 예정)
  console.log('HomePage - 로그인 상태:', isLoggedIn);
  console.log('HomePage - 사용자 데이터:', userData);
  console.log('HomePage - 크레딧 정보:', userData?.creditCount);

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
