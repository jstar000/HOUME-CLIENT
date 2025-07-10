import clsx from 'clsx';
import DefaultCardIcon from '@assets/icons/defaultCard.svg?react';
import DragHandle from '@components/dragHandle/DragHandle';
import FilpButton from '@components/button/filpButton/FlipButton';
import CtaButton from '@components/button/ctaButton/CtaButton';
import * as styles from './FlipSheet.css';

interface FlipSheetProps {
  onFlipClick: () => void;
  onChooseClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FlipSheet = ({
  onFlipClick,
  onChooseClick,
  isOpen,
  onClose,
}: FlipSheetProps) => {
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
      >
        <div className={styles.imageArea}>
          <div className={styles.dragHandleContainer}>
            <DragHandle />
          </div>
          <p className={styles.infoText}>이미지를 좌우반전 할 수 있어요</p>
          <DefaultCardIcon />
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
