import IcnDoubleStarInverse from '@assets/icons/icnDoubleStarInverse.svg?react';
import IcnDoubleStarPrimary from '@assets/icons/icnDoubleStarPrimary.svg?react';

import { useABTest } from '@/pages/generate/hooks/useABTest';
import ActionButton from '@/shared/components/v2/button/actionButton/ActionButton';
import LogoNavBar from '@/shared/components/v2/navBar/LogoNavBar';

import * as styles from './LandingPage.css';

const LandingPage = () => {
  const { variant, isLoading } = useABTest();
  const isPillLight = !isLoading && variant === 'single';

  return (
    <main className={styles.page}>
      <LogoNavBar page="landing" />
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
          <ActionButton
            kind={isPillLight ? 'pillLight' : 'pillGhost'}
            icon={
              isPillLight ? <IcnDoubleStarPrimary /> : <IcnDoubleStarInverse />
            }
          >
            우리 집 바꾸러 가기
          </ActionButton>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
