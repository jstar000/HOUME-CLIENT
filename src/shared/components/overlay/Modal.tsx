import * as styles from './Modal.css.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ isOpen, onClose, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.container}
      role="dialog"
      aria-modal="true"
      // 모달 확인용 배경색 설정
      style={{
        border: '1px solid black',
      }}
    >
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <div className={styles.creditBox}>
          <span className={styles.label}>보유 크레딧</span>
          <span className={styles.count}>0</span>
        </div>
        <div className={styles.creditImg} />
      </div>

      <div className={styles.buttonBox}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onClose}
        >
          <span className={styles.primaryText}>크레딧 결제하기</span>
        </button>
        <button type="button" className={styles.exitButton} onClick={onClose}>
          <span className={styles.exitButtonText}>나가기</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
