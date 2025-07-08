import * as styles from './Modal.css.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
}

const Modal = ({ isOpen, onClose, onExit }: ModalProps) => {
  return (
    <div className={styles.container} role="dialog" aria-modal="true">
      <div className={styles.info}>
        <p className={styles.title}>
          스타일링 이미지대로 가구를 추천 받으려면 크레딧이 필요해요
        </p>
        <div className={styles.creditBox}>
          <p className={styles.label}>보유 크레딧</p>
          <p className={styles.count}>0</p>
        </div>
        {/* 실제 이미지로 대체 예정 */}
        <div className={styles.creditImg}></div>
      </div>

      {/* 버튼 디자인은 임시로 적용, 버튼 컴포넌트 나오면 대체하겠습니다 */}
      <div className={styles.buttonBox}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onClose}
        >
          <p className={styles.primaryText}>크레딧 결제하기</p>
        </button>
        <button type="button" className={styles.exitButton} onClick={onClose}>
          <p className={styles.exitButtonText}>나가기</p>
        </button>
      </div>
    </div>
  );
};

export default Modal;
