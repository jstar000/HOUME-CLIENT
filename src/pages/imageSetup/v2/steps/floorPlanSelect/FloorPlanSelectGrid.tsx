import type { ExploreHouseTemplateItemResponse } from '@apis/__generated__/data-contracts';

import emptyImage from '@assets/v2/images/ImgEmpty.png';

import IconButton from '@components/v2/button/IconButton';
import Chip from '@components/v2/chip/Chip';
import Icon, { type IconName } from '@components/v2/icon/Icon';
import RoomTypeCard from '@components/v2/roomTypeCard/RoomTypeCard';

import * as styles from './FloorPlanSelectGrid.css';

import type { FloorPlanAspectRatio } from '../../stores/useFloorPlanRatioStore';
import type { FilterCategory, FloorPlanFilters } from '../../types/floorPlan';

// TODO: 디자인 확정 시 실제 1:1 / 3:2 비율 아이콘으로 교체 (현재는 임시 placeholder)
const RATIO_ICON = {
  '1:1': 'ViewDetail',
  '3:2': 'Search',
} as const satisfies Record<FloorPlanAspectRatio, IconName>;

interface FloorPlanSelectGridProps {
  filterCategories: FilterCategory[];
  floorPlans: ExploreHouseTemplateItemResponse[];
  isExact: boolean;
  appliedFilters: FloorPlanFilters;
  aspectRatio: FloorPlanAspectRatio;
  onCardClick: (floorPlanId: number) => void;
  onFilterChipClick: () => void;
  onFilterChipClear: (key: keyof FloorPlanFilters) => void;
  onAspectRatioChange: (ratio: FloorPlanAspectRatio) => void;
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
  isExact,
  appliedFilters,
  aspectRatio,
  onCardClick,
  onFilterChipClick,
  onFilterChipClear,
  onAspectRatioChange,
}: FloorPlanSelectGridProps) => {
  // 도면 카드 매핑: 정상 그리드와 '이런 공간은 어떠세요?' 유사 섹션 양쪽에서 동일하게 재사용
  const cards = floorPlans.map((plan) => {
    if (plan.id === undefined) return null;
    return (
      <RoomTypeCard
        key={plan.id}
        type="default"
        size="m"
        ratio={aspectRatio}
        label={plan.name ?? ''}
        imageSrc={plan.imageUrl ?? ''}
        showRecentBadge={plan.isLatest}
        onClick={() => onCardClick(plan.id as number)}
      />
    );
  });

  return (
    <div className={styles.container}>
      {/* 필터칩 영역 */}
      <div className={styles.chipBar}>
        {filterCategories.map((category) => {
          const filterValues = appliedFilters[category.id];
          const isFiltered = filterValues.length > 0;

          return (
            <Chip
              key={category.id}
              selected={isFiltered}
              suffixIcon={
                isFiltered ? (
                  <Icon name="Close" size="12" />
                ) : (
                  <Icon name="ChevronDown" size="12" />
                )
              }
              suffixAriaLabel={
                isFiltered ? `${category.label} 필터 초기화` : undefined
              }
              onClick={onFilterChipClick}
              onSuffixClick={
                isFiltered ? () => onFilterChipClear(category.id) : undefined
              }
            >
              {getChipLabel(category, filterValues)}
            </Chip>
          );
        })}
      </div>

      {/* 비율 토글 (1:1 / 3:2) — TODO: 아이콘/스타일 디자인 확정 후 교체 */}
      <div className={styles.ratioToggle}>
        <IconButton
          name={RATIO_ICON['1:1']}
          aria-label="1:1 비율"
          aria-pressed={aspectRatio === '1:1'}
          onClick={() => onAspectRatioChange('1:1')}
        />
        <IconButton
          name={RATIO_ICON['3:2']}
          aria-label="3:2 비율"
          aria-pressed={aspectRatio === '3:2'}
          onClick={() => onAspectRatioChange('3:2')}
        />
      </div>

      {/* 카드 그리드 영역 */}
      <div className={styles.gridScroll}>
        {isExact ? (
          <div className={styles.grid({ ratio: aspectRatio })}>{cards}</div>
        ) : (
          <>
            {/* 상단 이미지 + 공간없음 텍스트 */}
            <img src={emptyImage} alt="필터 결과 없음" />
            <div className={styles.emptyContainer}>
              <p className={styles.emptyTitle}>
                선택한 필터에 맞는 공간이 없어요.
              </p>
              <p className={styles.emptyDescription}>
                {
                  '하우미는 순차적으로 공간 유형을 확장하고 있어요.\n비슷한 공간을 선택해 이미지를 생성해보세요!'
                }
              </p>
            </div>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* '이런 공간은 어떠세요?' — 서버가 대체로 보내준 유사 도면 그리드 */}
            <div className={styles.similarSection}>
              <p className={styles.similarTitle}>이런 공간은 어떠세요?</p>
              <div className={styles.grid({ ratio: aspectRatio })}>{cards}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FloorPlanSelectGrid;
