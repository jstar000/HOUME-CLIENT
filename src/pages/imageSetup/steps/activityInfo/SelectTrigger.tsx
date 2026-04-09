import ChevronDown from '@assets/v2/svg/ChevronDown.svg?react';

import { getActivityIcon } from './activityIcons';
import * as styles from './SelectTrigger.css';

import type { ActivityItem } from '../../types/apis/activityInfo';

interface SelectTriggerProps {
  selectedActivity?: ActivityItem;
  onClick: () => void;
}

const SelectTrigger = ({ selectedActivity, onClick }: SelectTriggerProps) => {
  const isSelected = !!selectedActivity;
  const ActivityIcon = selectedActivity
    ? getActivityIcon(selectedActivity.code, 'black')
    : null;
  const requiredFurnitureLabel = selectedActivity?.furnitures[0]?.label;

  return (
    <button type="button" className={styles.trigger} onClick={onClick}>
      <div className={styles.leftContainer}>
        {ActivityIcon && <ActivityIcon width={20} height={20} />}
        {isSelected ? (
          <div className={styles.labelContainer}>
            <span className={styles.selectedLabel}>
              {selectedActivity.label}
            </span>
            {requiredFurnitureLabel && (
              <>
                <span className={styles.divider} />
                <span className={styles.requiredLabel}>
                  {requiredFurnitureLabel}
                </span>
              </>
            )}
          </div>
        ) : (
          <span className={styles.placeholderLabel}>
            활동 형태를 선택해주세요
          </span>
        )}
      </div>
      <ChevronDown className={styles.chevron} />
    </button>
  );
};

export default SelectTrigger;
