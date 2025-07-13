import * as styles from './SettingSection.css';

const SettingSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>계정 설정</h2>
      <div className={styles.divider} />

      <div className={styles.buttonArea}>
        <button className={styles.settingButton}>
          <span className={styles.buttonText}>약관 및 정책</span>
        </button>
        <div className={styles.divider} />

        <button className={styles.settingButton}>
          <span className={styles.buttonText}>로그아웃</span>
        </button>
        <div className={styles.divider} />

        <button className={styles.settingButton}>
          <span className={styles.buttonText}>탈퇴하기</span>
        </button>
        <div className={styles.divider} />
      </div>
    </section>
  );
};

export default SettingSection;
