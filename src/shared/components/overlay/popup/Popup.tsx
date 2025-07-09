import * as styles from './Popup.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  detail: string;
}

const Popup = ({ isOpen, onClose, title, detail }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <dialog
        className={styles.container}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.detail}>{detail}</span>
        </div>

        <div className={styles.buttonBox}>
          <button type="button" className={styles.exit} onClick={onClose}>
            나가기
          </button>
          <button type="button" className={styles.cancel} onClick={onClose}>
            취소
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Popup;
