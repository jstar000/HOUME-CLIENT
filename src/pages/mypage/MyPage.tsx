import ProfileSection from './components/profile/ProfileSection';
import HistorySection from './components/history/HistorySection';
import SettingSection from './components/setting/SettingSection';
import * as styles from './MyPage.css';
import { useUserData, useImageHistory } from './hooks/useUser';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const MyPage = () => {
  const { data: userData } = useUserData();
  const { data: imageData } = useImageHistory();

  const userName = userData?.name ?? '사용자';
  const credit = userData ? userData.creditCount : 0;

  const image = imageData?.generatedImageUrl;
  const hasImage = !!image;

  console.log(credit);

  return (
    <div className={styles.contentWrapper}>
      <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
      <ProfileSection
        userName={userName}
        credit={credit}
        isChargeDisabled={false}
      />
      <HistorySection hasImage={hasImage} />
      <SettingSection />
    </div>
  );
};

export default MyPage;
