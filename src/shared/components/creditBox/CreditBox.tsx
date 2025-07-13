import ChargeButton from '@components/button/chargeButton/ChargeButton';
import * as styles from './CreditBox.css';

interface CreditBoxProps {
  credit: number;
  disabled?: boolean;
  onClick?: () => void;
}
const CreditBox = ({ credit, disabled = false, onClick }: CreditBoxProps) => {
  return (
    <div className={styles.boxWrapper}>
      <div className={styles.textContainer}>
        <span className={styles.infoText} id="credit-label">
          보유 크레딧
        </span>
        <span className={styles.creditText} aria-labelledby="credit-label">
          {credit}
        </span>
      </div>
      <ChargeButton disabled={disabled} onClick={onClick}>
        충전하기
      </ChargeButton>
    </div>
  );
};

export default CreditBox;
