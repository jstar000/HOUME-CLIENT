import * as styles from './TitleStep.css.ts';

interface TitleStepProps {
  stepLabel: string;
  title: string;
}

const TitleStep = ({ stepLabel, title }: TitleStepProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stepLabelBox}>
        <span className={styles.stepLabel}>{stepLabel}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default TitleStep;
