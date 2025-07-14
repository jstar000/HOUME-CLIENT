import clsx from 'clsx';
import DragHandle from '@components/dragHandle/DragHandle';
import FilpButton from '@components/button/filpButton/FlipButton';
import CtaButton from '@components/button/ctaButton/CtaButton';
import * as styles from './FlipSheet.css';

interface FlipSheetProps {
  onFlipClick: () => void;
  onChooseClick: () => void;
  isOpen: boolean;
  onClose: () => void;
  onExited?: () => void;
  src: string;
  isFlipped: boolean;
}

const FlipSheet = ({
  onFlipClick,
  onChooseClick,
  isOpen,
  onClose,
  onExited,
  src,
  isFlipped,
}: FlipSheetProps) => {
  // transitionend 핸들러
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // sheetWrapper에서만, 닫힐 때만 호출
    if (!isOpen && e.propertyName === 'transform') {
      onExited?.();
    }
  };
  return (
    <>
      <div
        className={clsx(styles.backdrop, isOpen && styles.backdropVisible)}
        onClick={onClose}
      />
      <div
        className={clsx(
          styles.sheetWrapper,
          isOpen ? styles.sheetWrapperExpanded : styles.sheetWrapperCollapsed
        )}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.imageArea}>
          <div className={styles.dragHandleContainer}>
            <DragHandle />
          </div>
          <p className={styles.infoText}>이미지를 좌우반전 할 수 있어요</p>
          <div className={styles.imageContainer}>
            <img
              src={src}
              alt="선택된 구조 이미지"
              className={
                isFlipped
                  ? styles.imageVariants.flipped
                  : styles.imageVariants.normal
              }
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <FilpButton onClick={onFlipClick} />
          <CtaButton onClick={onChooseClick}>선택하기</CtaButton>
        </div>
      </div>
    </>
  );
};

export default FlipSheet;
