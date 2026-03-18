import CloseBottomSheet from '@components/v2/bottomSheet/CloseBottomSheet';
import Chip from '@components/v2/chip/Chip';

import * as buttonStyles from './ActionButton.css';
import * as styles from './FilterSheet.css';

import type { FilterCategory, FloorPlanFilters } from '../../types/floorPlan';

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  filterCategories: FilterCategory[];
  pendingFilters: FloorPlanFilters;
  onFilterChange: (key: keyof FloorPlanFilters, value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterSheet = ({
  open,
  onClose,
  filterCategories,
  pendingFilters,
  onFilterChange,
  onApply,
  onReset,
}: FilterSheetProps) => {
  return (
    <CloseBottomSheet
      open={open}
      onClose={onClose}
      titleSlot={<p className={styles.title}>필터</p>}
      titleAlign="left"
      contentSlot={
        // content: 버튼 제외 필터칩 영역
        <div className={styles.content}>
          {filterCategories.map((category) => {
            const currentValues =
              pendingFilters[category.id as keyof FloorPlanFilters];

            return (
              <div key={category.id} className={styles.section}>
                <p className={styles.sectionTitle}>{category.label}</p>
                <div className={styles.chipGroup}>
                  {category.options.map((option) => (
                    <Chip
                      key={option.id}
                      selected={
                        option.id === 'ALL'
                          ? currentValues.length === 0
                          : currentValues.includes(option.id)
                      }
                      onClick={() =>
                        onFilterChange(
                          category.id as keyof FloorPlanFilters,
                          option.id
                        )
                      }
                    >
                      {option.label}
                    </Chip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      }
      primaryButton={
        <button
          type="button"
          className={buttonStyles.primary}
          onClick={onApply}
        >
          필터 적용하기
        </button>
      }
      secondaryButton={
        <button
          type="button"
          className={buttonStyles.secondary}
          onClick={onReset}
        >
          {/* TODO: v2 아이콘 반영 — IcnRefresh 초기화 아이콘 */}↻ 초기화
        </button>
      }
    />
  );
};

export default FilterSheet;
