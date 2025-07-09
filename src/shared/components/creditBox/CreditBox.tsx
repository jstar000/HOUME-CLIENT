import ChargeButton from '../button/chargeButton/chargeBtn';
import * as styles from './CreditBox.css';

interface CreditBoxProps {
  credit: number;
}
const CreditBox = ({ credit }: CreditBoxProps) => {
  return (
    <div className={styles.boxWrapper}>
      <div className={styles.textContainer}>
        <span className={styles.infoText}>보유 크레딧</span>
        <span className={styles.creditText}>{credit}</span>
      </div>
      <ChargeButton children="충전하기" />
    </div>
  );
};

export default CreditBox;
