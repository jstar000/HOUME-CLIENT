import Chip from '@components/v2/chip/Chip';
import RoomTypeCard from '@components/v2/roomTypeCard/RoomTypeCard';

import * as styles from './FloorPlanSelectGrid.css';

import type {
  FilterCategory,
  FloorPlanData,
  FloorPlanFilters,
} from '../../types/floorPlan';

interface FloorPlanSelectGridProps {
  filterCategories: FilterCategory[];
  floorPlans: FloorPlanData[];
  appliedFilters: FloorPlanFilters;
  onCardClick: (floorPlanId: number) => void;
  onFilterChipClick: () => void;
  onFilterChipClear: (key: keyof FloorPlanFilters) => void;
}

const getChipLabel = (category: FilterCategory, filterValues: string[]) => {
  if (filterValues.length === 0) return category.label;

  const selectedOptions = filterValues
    .map((filterValue) => category.options.find((o) => o.id === filterValue))
    .filter(
      (option): option is NonNullable<typeof option> => option !== undefined
    );

  if (selectedOptions.length === 0) return category.label;
  if (selectedOptions.length === 1) return selectedOptions[0].label;

  return `${selectedOptions[0].label} 외 ${selectedOptions.length - 1}개`;
};

const FloorPlanSelectGrid = ({
  filterCategories,
  floorPlans,
  appliedFilters,
  onCardClick,
  onFilterChipClick,
  onFilterChipClear,
}: FloorPlanSelectGridProps) => {
  return (
    <div className={styles.container}>
      {/* 필터칩 영역 */}
      <div className={styles.chipBar}>
        {filterCategories.map((category) => {
          const filterValues =
            appliedFilters[category.id as keyof FloorPlanFilters];
          const isFiltered = filterValues.length > 0;

          return (
            <Chip
              key={category.id}
              selected={isFiltered}
              // TODO: v2 아이콘 반영 미적용
              suffixIcon={
                <span className={styles.chipIcon}>
                  {isFiltered ? '✕' : '▾'}
                </span>
              }
              suffixAriaLabel={
                isFiltered ? `${category.label} 필터 초기화` : undefined
              }
              onClick={onFilterChipClick}
              onSuffixClick={
                isFiltered
                  ? () =>
                      onFilterChipClear(category.id as keyof FloorPlanFilters)
                  : undefined
              }
            >
              {getChipLabel(category, filterValues)}
            </Chip>
          );
        })}
      </div>

      {/* 카드 그리드 영역 */}
      <div className={styles.gridScroll}>
        {/* TODO: 필터 결과 없을 때 화면 추가 */}
        {floorPlans.length === 0 ? (
          <>
            <div className={styles.emptyContainer}>
              {/* TODO: v2 아이콘 반영 */}
              <p className={styles.emptyTitle}>
                선택한 필터에 맞는 공간이 없어요.
              </p>
              <p className={styles.emptyDescription}>
                {
                  '하우미는 순차적으로 공간 유형을 확장하고 있어요.\n비슷한 공간을 선택해 이미지를 생성해보세요!'
                }
              </p>
            </div>
            {/* TODO: API isExact: false일 때 유사 공간 카드 렌더 */}
            <div className={styles.similarSection}>
              <p className={styles.similarTitle}>선택한 필터와 유사한 공간</p>
              <div className={styles.grid}>
                {/* 유사 공간 카드 — API 연동 시 데이터 바인딩 */}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.grid}>
            {floorPlans.map((plan) => (
              <RoomTypeCard
                key={plan.id}
                type="default"
                size="m"
                label={plan.name}
                imageSrc={plan.imageUrl}
                showRecentBadge={plan.isLatest}
                onClick={() => onCardClick(plan.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorPlanSelectGrid;
