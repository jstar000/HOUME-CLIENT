import { useState } from 'react';

import DragHandleBottomSheet from '@components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@components/v2/button/actionButton/ActionButton';
import TextHeading from '@components/v2/textHeading/TextHeading';

import { getActivityIcon } from './activityIcons';
import * as styles from './ActivityTypeSheet.css';

import type { ActivityItem } from '../../types/apis/activityInfo';

interface ActivityTypeSheetProps {
  open: boolean;
  activities: ActivityItem[];
  selectedActivityCode?: string;
  onConfirm: (activityCode: string) => void;
  onClose: () => void;
}

const ActivityTypeSheet = ({
  open,
  activities,
  selectedActivityCode,
  onConfirm,
  onClose,
}: ActivityTypeSheetProps) => {
  // 로컬 선택 상태 (확인 버튼 클릭 전까지 context에 미반영)
  const [localSelected, setLocalSelected] = useState<string | undefined>(
    selectedActivityCode
  );

  const handleConfirm = () => {
    if (!localSelected) return;
    onConfirm(localSelected);
  };

  return (
    <DragHandleBottomSheet
      open={open}
      onDismiss={onClose}
      contentSlot={
        <div className={styles.contents}>
          <TextHeading
            type="sub"
            title="주요 활동"
            caption="선택한 활동에 필요한 가구와 함께 이미지를 생성해요."
          />
          <div className={styles.radioList}>
            {activities.map((activity) => {
              const isSelected = localSelected === activity.code;
              const Icon = getActivityIcon(
                activity.code,
                isSelected ? 'black' : 'gray'
              );
              const requiredFurnitureLabel = activity.furnitures[0]?.label;

              return (
                <button
                  key={activity.code}
                  type="button"
                  className={`${styles.radioItem}${isSelected ? ` ${styles.radioItemSelected}` : ''}`}
                  onClick={() => setLocalSelected(activity.code)}
                >
                  <div className={styles.radioContents}>
                    {Icon && <Icon width={20} height={20} />}
                    <span className={styles.radioLabel}>{activity.label}</span>
                    {requiredFurnitureLabel && (
                      <>
                        <span className={styles.divider} />
                        <span className={styles.requiredLabel}>
                          {requiredFurnitureLabel}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      }
      primaryButton={
        <ActionButton
          size="2XL"
          fullWidth
          disabled={!localSelected}
          onClick={handleConfirm}
        >
          선택하기
        </ActionButton>
      }
    />
  );
};

export default ActivityTypeSheet;
