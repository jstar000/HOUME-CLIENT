import * as styles from './SettingSection.css';

type SettingItem = {
  id: string;
  label: string;
  onClick: () => void;
};

const handleTerms = () => console.log('약관 클릭');
const handleLogout = () => console.log('로그아웃 클릭');
const handleWithdraw = () => console.log('탈퇴하기 클릭');

const SettingSection = () => {
  const settingItems: SettingItem[] = [
    { id: 'terms', label: '약관 및 정책', onClick: handleTerms },
    { id: 'logout', label: '로그아웃', onClick: handleLogout },
    { id: 'withdraw', label: '탈퇴하기', onClick: handleWithdraw },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>계정 설정</h2>
      <div className={styles.divider} />

      <div className={styles.buttonArea}>
        {settingItems.map(({ id, label, onClick }, index) => (
          <div key={id}>
            <button
              className={styles.settingButton}
              onClick={onClick}
              aria-label={label}
            >
              <span className={styles.buttonText}>{label}</span>
            </button>
            {index < settingItems.length - 1 && (
              <div className={styles.divider} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SettingSection;
