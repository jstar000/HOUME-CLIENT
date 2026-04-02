import * as style from './CreditBox.css';
import Icon from '../icon/Icon';

interface CreditBoxProps {
  creditCount: number;
  maxCredit: number;
}

const CreditBox = ({ creditCount, maxCredit }: CreditBoxProps) => {
  return (
    <div className={style.container}>
      <Icon name="Credit" />

      <p className={style.textWrapper}>
        <span className={style.text['primary']}>{creditCount}</span>
        <span className={style.text['default']}>/</span>
        <span className={style.text['default']}>{maxCredit}</span>
      </p>
    </div>
  );
};

export default CreditBox;
