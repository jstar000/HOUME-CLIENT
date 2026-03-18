import IcnDoubleStar from '@assets/v2/svg/IcnDoubleStar.svg?react';

import CloseBottomSheet from '@components/v2/bottomSheet/CloseBottomSheet';
import RoomTypeCard from '@components/v2/roomTypeCard/RoomTypeCard';

import * as buttonStyles from './ActionButton.css';
import * as styles from './FloorPlanSheet.css';

import type { RecentFloorPlanData } from '../../types/floorPlan';

interface RecentFloorPlanSheetProps {
  open: boolean;
  onClose: () => void;
  recentFloorPlan: RecentFloorPlanData;
  onConfirm: () => void;
  onSelectOther: () => void;
}

const RecentFloorPlanSheet = ({
  open,
  onClose,
  recentFloorPlan,
  onConfirm,
  onSelectOther,
}: RecentFloorPlanSheetProps) => {
  return (
    <CloseBottomSheet
      open={open}
      onClose={onClose}
      titleSlot={
        <div className={styles.titleRow}>
          <IcnDoubleStar className={styles.titleIcon} aria-hidden="true" />
          <span className={styles.titleMain}>{recentFloorPlan.name}</span>
          <span className={styles.titleMeta}>·</span>
          <span className={styles.titleMeta}>
            {recentFloorPlan.equilibrium}
          </span>
        </div>
      }
      contentSlot={
        <div className={styles.content}>
          <RoomTypeCard
            type="default"
            size="l"
            imageSrc={recentFloorPlan.imageUrl}
            imageAlt={`${recentFloorPlan.name} ${recentFloorPlan.view}`}
          />
          <p className={styles.viewLabel}>{recentFloorPlan.view}</p>
        </div>
      }
      primaryButton={
        <button
          type="button"
          className={buttonStyles.primary}
          onClick={onConfirm}
        >
          선택 완료
        </button>
      }
      secondaryButton={
        <button
          type="button"
          className={buttonStyles.secondary}
          onClick={onSelectOther}
        >
          다른 공간 선택
        </button>
      }
    />
  );
};

export default RecentFloorPlanSheet;
