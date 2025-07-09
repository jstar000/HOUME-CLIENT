import WarningIcon from '@assets/icons/icn_warning_red.svg?react';
import * as styles from './ShowError.css';

interface ShowErrorMessageProps {
  message: string;
}

const ShowErrorMessage = ({ message }: ShowErrorMessageProps) => {
  return (
    <div className={styles.messageWrapper}>
      <WarningIcon />
      <span className={styles.messageText}>{message}</span>
    </div>
  );
};

export default ShowErrorMessage;
