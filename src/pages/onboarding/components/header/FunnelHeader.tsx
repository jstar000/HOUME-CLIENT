import * as styles from './FunnelHeader.css';
import type { ProgressStep } from '@/shared/components/progressBarKey/ProgressBarKey.types';
import ProgressBarKey from '@/shared/components/progressBarKey/ProgressBarKey';

interface FunnelHeaderProps {
  title: string;
  detail: string;
  currentStep: ProgressStep;
}

const FunnelHeader = ({ title, detail, currentStep }: FunnelHeaderProps) => {
  return (
    <header className={styles.wrapper}>
      <div>
        <ProgressBarKey currentStep={currentStep} />
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.detail}>{detail}</span>
      </div>
    </header>
  );
};

export default FunnelHeader;
