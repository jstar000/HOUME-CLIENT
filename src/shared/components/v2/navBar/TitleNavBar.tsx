import type { ReactNode } from 'react';

import IcnArrowLeftM from '@assets/v2/svg/IcnArrowLeftM.svg?react';

import * as styles from './TitleNavBar.css';

interface TitleNavBarProps extends React.ComponentProps<'nav'> {
  title: string;
  backLabel?: string;
  onBackClick?: () => void;
  rightSlot?: ReactNode;
}

const TitleNavBar = ({
  title,
  backLabel,
  onBackClick,
  rightSlot,
  ...props
}: TitleNavBarProps) => {
  const backAriaLabel = backLabel ?? '뒤로가기';

  return (
    <nav className={styles.container} {...props}>
      <div className={styles.leftSlot}>
        {/* TODO: 공통 컴포넌트로 수정 */}
        <button
          type="button"
          aria-label={backAriaLabel}
          className={styles.backButton}
          onClick={onBackClick}
        >
          <IcnArrowLeftM className={styles.backIcon} aria-hidden="true" />
          {backLabel}
        </button>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.rightSlot}>{rightSlot}</div>
    </nav>
  );
};

export default TitleNavBar;
