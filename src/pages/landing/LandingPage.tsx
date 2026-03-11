import CtaButtonV2 from '@/shared/components/button/ctaButton/CtaButtonV2';

import * as styles from './LandingPage.css';

const LandingPage = () => {
  return (
    <main className={styles.page}>
      <header className={styles.headerSection}>{/* 네비바 영역 */}</header>
      <section className={styles.mainSection}>
        <div className={styles.contentBlock}>
          <p className={styles.text}>텍스트 영역</p>
          <CtaButtonV2
            height={56}
            buttonStyle="fill"
            color="inverse"
            icon="doublestar"
          >
            우리 집 바꾸러 가기
          </CtaButtonV2>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
