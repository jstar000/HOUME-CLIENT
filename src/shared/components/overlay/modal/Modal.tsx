import { useState } from 'react';
import CreditIcon from '@assets/icons/modalCoin.png';
import CtaButton from '../../button/ctaButton/CtaButton';
import { useToast } from '../../toast/useToast';
import * as styles from './Modal.css';
import { useMyPageUser } from '@/pages/mypage/hooks/useMypage';
import { useUserStore } from '@/store/useUserStore';

export interface ModalProps {
  onClose: () => void;
  title: string;
  onCreditAction?: () => void;
}

const Modal = ({ onClose, title, onCreditAction }: ModalProps) => {
  const { notify } = useToast();
  const [isButtonActive, setIsButtonActive] = useState(true);

  // 로그인 상태 확인
  const accessToken = useUserStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;

  // 사용자 크레딧 정보 조회
  const { data: userData, isLoading: isUserDataLoading } = useMyPageUser({
    enabled: isLoggedIn, // 로그인 상태일 때만 API 호출
  });

  const handleOpenToast = () => {
    // 크레딧 액션 콜백이 있으면 실행
    onCreditAction?.();

    notify({
      text: '결제는 아직 준비 중인 기능이에요',
      type: 'warning',
    });
    setIsButtonActive(false);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.container}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.creditBox}>
            <span className={styles.label}>보유 크레딧</span>
            <span className={styles.count}>
              {isUserDataLoading ? '로딩중...' : (userData?.CreditCount ?? 0)}
            </span>
          </div>
          <img src={CreditIcon} alt="크레딧 아이콘" />
        </div>

        <div className={styles.buttonBox}>
          <CtaButton
            onClick={handleOpenToast}
            isActive={isButtonActive}
            buttonSize="large"
          >
            크레딧 결제하기
          </CtaButton>
          <button type="button" className={styles.exitButton} onClick={onClose}>
            <span className={styles.exitButtonText}>나가기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
