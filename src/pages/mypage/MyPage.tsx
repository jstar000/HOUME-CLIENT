import ProfileSection from './components/profile/ProfileSection';
import HistorySection from './components/history/HistorySection';
import SettingSection from './components/setting/SettingSection';
import * as styles from './MyPage.css';
import { useMyPageUser } from './hooks/useMypage';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const MyPage = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useMyPageUser();

  // 로딩 상태 처리
  if (isUserLoading) {
    return (
      <div className={styles.contentWrapper}>
        <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
        <div>사용자 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (isUserError || !userData) {
    return (
      <div className={styles.contentWrapper}>
        <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
        <div>사용자 정보를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.contentWrapper}>
      <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
      <ProfileSection
        userName={userData.name}
        credit={userData.CreditCount}
        isChargeDisabled={false}
      />
      <HistorySection />
      <SettingSection />
    </div>
  );
};

export default MyPage;
