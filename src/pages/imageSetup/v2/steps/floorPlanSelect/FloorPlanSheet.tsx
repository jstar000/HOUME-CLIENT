import clsx from 'clsx';

import IcnDoubleStar from '@assets/v2/svg/IcnDoubleStar.svg?react';

import CloseBottomSheet from '@components/v2/bottomSheet/CloseBottomSheet';
import RoomTypeCard from '@components/v2/roomTypeCard/RoomTypeCard';

import * as buttonStyles from './ActionButton.css';
import * as styles from './FloorPlanSheet.css';
import { useFloorPlanSheet } from '../../hooks/useFloorPlanSheet';

import type { FloorPlanDetailView } from '../../types/floorPlan';

interface FloorPlanSheetProps {
  open: boolean;
  onClose: () => void;
  floorPlanName: string;
  detailViews: FloorPlanDetailView[];
  onConfirm: () => void;
}

const FloorPlanSheet = ({
  open,
  onClose,
  floorPlanName,
  detailViews,
  onConfirm,
}: FloorPlanSheetProps) => {
  const {
    currentView,
    selectedViewIndex,
    isMultiView,
    isMirror,
    toggleMirror,
    handlePrev,
    handleNext,
  } = useFloorPlanSheet(detailViews);

  if (!currentView) return null;

  return (
    <CloseBottomSheet
      open={open}
      onClose={onClose}
      titleSlot={
        <div className={styles.titleRow}>
          <IcnDoubleStar className={styles.titleIcon} aria-hidden="true" />
          <p className={styles.titleText}>
            {floorPlanName} · {currentView.equilibrium}
          </p>
        </div>
      }
      contentSlot={
        <div className={styles.content}>
          <div
            className={clsx(styles.mirrorWrapper, isMirror && styles.mirrored)}
          >
            <RoomTypeCard
              type="default"
              size="l"
              imageSrc={currentView.imageUrl}
              imageAlt={`${floorPlanName} ${currentView.view}`}
              onPrevClick={isMultiView ? handlePrev : undefined}
              onNextClick={isMultiView ? handleNext : undefined}
            />
          </div>
          <p className={styles.viewLabel}>{currentView.view}</p>
        </div>
      }
      primaryButton={
        <button
          type="button"
          className={buttonStyles.primary}
          onClick={onConfirm}
        >
          공간 선택하기
        </button>
      }
      secondaryButton={
        <button
          type="button"
          className={buttonStyles.secondary}
          onClick={toggleMirror}
        >
          {/* TODO: v2 아이콘 반영 — IcnFlipHorizontal 좌우반전 아이콘 */}⇆
          좌우반전
        </button>
      }
    />
  );
};

export default FloorPlanSheet;
