import * as styles from '../StepCommon.css';

interface SubtitleProps {
  subtitle: string;
  caption?: string;
}

const Subtitle = ({ subtitle, caption }: SubtitleProps) => {
  return (
    <div className={styles.subTextBox}>
      <span className={styles.subtitle}>{subtitle}</span>
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  );
};

export default Subtitle;
