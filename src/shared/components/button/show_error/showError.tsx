import WarningIcon from '@assets/icons/icn_warning_red.svg?react';
import * as styles from './ShowError.css';

const ShowErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.messageWrapper}>
      <WarningIcon />
      <span className={styles.messageText}>{message}</span>
    </div>
  );
};

export default ShowErrorMessage;
