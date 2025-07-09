import Warning from '@assets/icn_warning_toast.svg?react';
import * as styles from './Toast.css';

interface ToastProps {
  text: string;
}

const Toast = ({ text }: ToastProps) => {
  return (
    <div className={styles.container}>
      <Warning />
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Toast;
