import clsx from 'clsx';
import DragHandle from '@components/dragHandle/DragHandle';
import TextField from '@components/textField/TextField';
import CtaButton from '@components/button/ctaButton/CtaButton';
import * as styles from './NoMatchSheet.css';

interface NoMatchSheetProps {
  isOpen: boolean;
  onClose: () => void;
  user?: string;
}

const NoMatchSheet = ({ isOpen, onClose, user }: NoMatchSheetProps) => {
  const displayName = user?.trim() || '사용자';

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
        <div className={styles.contentWapper}>
          <div className={styles.dragHandleContainer}>
            <DragHandle />
          </div>
          <div className={styles.infoTextContainer}>
            <span className={styles.infoText}>
              하우미는 점차 집 구조 템플릿을 <br />
              확대해 나갈 예정이에요!
            </span>
            <span className={styles.descriptionText}>
              아래 버튼을 통해 주소를 공유해주시면, <br />
              {displayName}님의 스타일링을 위해 빠르게 반영해드릴게요!
            </span>
          </div>
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldContainer}>
              <p className={styles.title}>시/군/구</p>
              <TextField
                fieldSize="thin"
                placeholder="ex) 솝트특별자치시 앱잼구"
              />
            </div>
            <div className={styles.fieldContainer}>
              <p className={styles.title}>상세 주소</p>
              <TextField fieldSize="thin" placeholder="ex) 하우미로 123" />
            </div>
          </div>
          <CtaButton isActive={false}>제출하기</CtaButton>
        </div>
      </div>
    </>
  );
};

export default NoMatchSheet;
