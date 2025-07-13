import ProfileSection from './components/profile/ProfileSection';
import HistorySection from './components/history/HistorySection';
import SettingSection from './components/setting/SettingSection';
import * as styles from './MyPage.css';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const MyPage = () => {
  const userName = '하우미';
  const credit = 0;

  return (
    <div className={styles.contentWrapper}>
      <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
      <ProfileSection
        userName={userName}
        credit={credit}
        isChargeDisabled={false}
      />
      <HistorySection />
      <SettingSection />
    </div>
  );
};

export default MyPage;
