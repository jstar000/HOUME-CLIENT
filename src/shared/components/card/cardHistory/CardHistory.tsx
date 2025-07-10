import CtaButton from '@shared/components/button/ctaButton/CtaButton.tsx';
import example from '@assets/images/example.png';
import * as styles from './CardHistory.css.ts';

interface CardHistoryProps extends React.ComponentProps<'div'> {
  title: string;
  btnText: string;
}

const CardHistory = ({ title, btnText }: CardHistoryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgbox}>
        <img src={example} className={styles.imgbox} />
      </div>
      <div className={styles.textbox}>
        <h1 className={styles.title}>{title}</h1>
        <CtaButton>{btnText}</CtaButton>
      </div>
    </div>
  );
};

export default CardHistory;
