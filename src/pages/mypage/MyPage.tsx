import ProfileSection from './components/profile/ProfileSection';
import HistorySection from './components/history/HistorySection';
import * as styles from './MyPage.css';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const MyPage = () => {
  const userName = '';
  const credit = 0;

  const handleChargeClick = () => {
    console.log('충전하기');
  };

  return (
    <div className={styles.contentWrapper}>
      <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
      <ProfileSection
        userName={userName}
        credit={credit}
        onChargeClick={handleChargeClick}
      />
      <HistorySection />
    </div>
  );
};

export default MyPage;
