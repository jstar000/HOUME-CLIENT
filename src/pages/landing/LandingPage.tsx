import IcnTwoStarInverse from '@assets/icons/icnTwoStarInverse.svg?react';
import IcnTwoStarPrimary from '@assets/icons/icnTwoStarPrimary.svg?react';

import ActionButton from '@/shared/components/button/actionButton/ActionButton';

import NavBar from './components/NavBar';
import * as styles from './LandingPage.css';

const LandingPage = () => {
  return (
    <main className={styles.page}>
      <NavBar />
      <section className={styles.mainSection}>
        <div className={styles.contentBlock}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              '재택근무가 필요한'
              <br />
              나를 위한 맞춤형 인테리어는?
            </h2>
            <p className={styles.text}>
              집 구조, 취향, 생활 방식까지 반영하는 AI 홈 스타일링
            </p>
          </div>
          <ActionButton kind="pillLight" icon={<IcnTwoStarPrimary />}>
            우리 집 바꾸러 가기
          </ActionButton>
          <ActionButton kind="pillGhost" icon={<IcnTwoStarInverse />}>
            우리 집 바꾸러 가기
          </ActionButton>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
