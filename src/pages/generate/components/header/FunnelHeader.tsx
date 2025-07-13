import * as styles from './FunnelHeader.css';
import ProgressBarKey from '@/shared/components/progressBarKey/ProgressBarKey';

interface GenerateHeaderProps {
  title: string;
  detail: string;
}

const GenerateHeader = ({ title, detail }: GenerateHeaderProps) => {
  return (
    <header className={styles.wrapper}>
      <div>
        <ProgressBarKey currentStep={1} />
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.body}>{detail}</span>
      </div>
    </header>
  );
};

export default GenerateHeader;
