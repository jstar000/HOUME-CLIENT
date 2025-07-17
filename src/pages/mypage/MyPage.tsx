import { useEffect } from 'react';
import ProfileSection from './components/profile/ProfileSection';
import HistorySection from './components/history/HistorySection';
import SettingSection from './components/setting/SettingSection';
import * as styles from './MyPage.css';
import { useMyPageUser } from './hooks/useMyPage';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';
import Loading from '@/shared/components/loading/Loading';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

const MyPage = () => {
  const { handleError } = useErrorHandler('mypage');

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error,
  } = useMyPageUser();

  useEffect(() => {
    if (isUserError || !userData) {
      handleError(error || new Error('User data load failed'), 'api');
    }
  }, [isUserError, userData, error, handleError]);

  // 로딩 상태 처리
  if (isUserLoading) {
    return (
      <>
        <div className={styles.contentWrapper}>
          <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
        </div>
        <Loading text="사용자 정보를 불러오는 중..." />
      </>
    );
  }

  // 에러 상태 처리
  if (isUserError || !userData) {
    return null;
  }

  return (
    <div className={styles.contentWrapper}>
      <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
      <ProfileSection
        userName={userData.name}
        credit={userData.creditCount}
        isChargeDisabled={false}
      />
      <HistorySection />
      <SettingSection />
    </div>
  );
};

export default MyPage;
