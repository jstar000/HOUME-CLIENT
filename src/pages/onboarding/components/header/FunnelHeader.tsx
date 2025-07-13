import * as styles from './FunnelHeader.css';
import ProgressBarKey from '@/shared/components/progressBarKey/ProgressBarKey';

interface FunnelHeaderProps {
  title: string;
  detail: string;
}

const FunnelHeader = ({ title, detail }: FunnelHeaderProps) => {
  return (
    <header className={styles.wrapper}>
      <div>
        <ProgressBarKey currentStep={1} />
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.detail}>{detail}</span>
      </div>
    </header>
  );
};

export default FunnelHeader;
