import * as styles from './CommunityComingSoonModal.css';

interface CommunityComingSoonModalProps {
  onClose: () => void;
}

const CommunityComingSoonModal = ({ onClose }: CommunityComingSoonModalProps) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.container}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.contentArea}>
          <div className={styles.headingText}>
            <p className={styles.title}>커뮤니티 기능은 아직 준비 중이에요</p>
            <p className={styles.body}>
              우리 집과 비슷한 유저들의{'\n'}인테리어 이미지를 곧 둘러볼 수
              있어요!
            </p>
          </div>
        </div>
        <div className={styles.buttonArea}>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityComingSoonModal;

