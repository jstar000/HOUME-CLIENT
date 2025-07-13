import { useState } from 'react';
import ProfileSection from './components/profile/ProfileSection';
import HistorySection from './components/history/HistorySection';
import SettingSection from './components/setting/SettingSection';
import * as styles from './MyPage.css';
import { useToast } from '@/shared/components/toast/useToast';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const MyPage = () => {
  const userName = '';
  const credit = 0;
  const { notify } = useToast();
  const [isChargeDisabled, setIsChargeDisabled] = useState(false);

  const handleChargeClick = () => {
    setIsChargeDisabled(true);
    notify({
      text: '결제는 아직 준비 중인 기능이에요',
      type: 'warning',
      options: {
        style: { marginBottom: '2rem' },
      },
    });
  };

  return (
    <div className={styles.contentWrapper}>
      <TitleNavBar title="마이페이지" isBackIcon isLoginBtn={false} />
      <ProfileSection
        userName={userName}
        credit={credit}
        onChargeClick={handleChargeClick}
        isChargeDisabled={isChargeDisabled}
      />
      <HistorySection />
      <SettingSection />
    </div>
  );
};

export default MyPage;
