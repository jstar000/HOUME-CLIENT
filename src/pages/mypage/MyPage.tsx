import ProfileSection from './components/profileSection/ProfileSection';
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
      {/* TODO: 이미지 히스토리, 추천, 계정설정 컴포넌트 추가 예정 */}
    </div>
  );
};

export default MyPage;
