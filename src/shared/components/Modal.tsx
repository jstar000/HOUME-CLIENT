import * as styles from './Modal.css.ts';

const Modal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.creditInfoBox}>
        <p className={styles.modalTitle}>
          스타일링 이미지대로 가구를 추천 받으려면 크레딧이 필요해요
        </p>
        <div className={styles.creditBox}>
          <p className={styles.creditText}>보유 크레딧</p>
          <p className={styles.creditCount}>0</p>
        </div>
        <div className={styles.creditImage}></div>
      </div>

      {/* 버튼 디자인은 임시로 적용, 버튼 컴포넌트 나오면 대체하겠습니다 */}
      <div className={styles.buttonBox}>
        <button type="button" className={styles.creditButton}>
          <p className={styles.creditButtonText}>크레딧 결제하기</p>
        </button>
        <button type="button" className={styles.exitButton}>
          <p className={styles.exitButtonText}>나가기</p>
        </button>
      </div>
    </div>
  );
};

export default Modal;
