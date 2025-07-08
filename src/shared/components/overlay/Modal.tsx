import React from 'react';
import * as styles from './Modal.css.ts';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.container}
      role="dialog"
      aria-modal="true"
      // 모달 확인용 배경색 설정
      style={{
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '16px',
        borderRadius: '8px',
      }}
    >
      <header className={styles.info}>
        <p className={styles.title}>{children}</p>
        <div className={styles.creditBox}>
          <span className={styles.label}>보유 크레딧</span>
          <span className={styles.count}>0</span>
        </div>
        <div className={styles.creditImg} />
      </header>

      <footer className={styles.buttonBox}>
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
      </footer>
    </div>
  );
};
