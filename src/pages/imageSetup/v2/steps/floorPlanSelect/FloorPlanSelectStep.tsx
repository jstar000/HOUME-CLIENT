import PageLayout from '@components/pageLayout/PageLayout';

import FilterSheet from './FilterSheet';
import FloorPlanSelectGrid from './FloorPlanSelectGrid';
import FloorPlanSheet from './FloorPlanSheet';
import { useFloorPlanSelect } from '../../hooks/useFloorPlanSelect';
import { useFloorPlanStore } from '../../stores/useFloorPlanStore';

import type {
  CompletedFloorPlan,
  ImageSetupSteps,
} from '../../../types/funnel/steps';

interface FloorPlanSelectStepProps {
  context: ImageSetupSteps['FloorPlan'];
  onNext: (data: CompletedFloorPlan) => void;
}

const FloorPlanSelectStep = ({ context, onNext }: FloorPlanSelectStepProps) => {
  const {
    filterCategories,
    filteredFloorPlans,
    selectedFloorPlan,
    selectedDetailViews,
    recentFloorPlan,
    hasRecentFloorPlan,
    handleCardClick,
    handleConfirmFloorPlan,
    handleConfirmRecentFloorPlan,
  } = useFloorPlanSelect(context, onNext);

  const store = useFloorPlanStore();

  return (
    <PageLayout
      header={{
        type: 'title',
        title: '원하는 공간 선택하기',
        backLabel: '이전',
      }}
    >
      <FloorPlanSelectGrid
        filterCategories={filterCategories} // 더미데이터
        floorPlans={filteredFloorPlans} // 더미데이터
        appliedFilters={store.appliedFilters}
        onCardClick={handleCardClick}
        onFilterChipClick={store.openFilterSheet}
        onFilterChipClear={store.clearAppliedFilter}
      />

      <FilterSheet
        open={store.isFilterSheetOpen}
        onClose={store.closeFilterSheet}
        filterCategories={filterCategories}
        pendingFilters={store.pendingFilters}
        onFilterChange={store.setPendingFilter}
        onApply={() => {
          store.applyFilters();
          store.closeFilterSheet();
        }}
        onReset={store.resetFilters}
      />

      {/* TODO: overlay-kit에 상태관리 위임, use-funnel에 등록 */}
      <FloorPlanSheet
        open={store.isFloorPlanSheetOpen}
        onClose={store.closeFloorPlanSheet}
        floorPlanName={selectedFloorPlan?.name ?? ''}
        detailViews={selectedDetailViews}
        onConfirm={handleConfirmFloorPlan}
      />

      {hasRecentFloorPlan && recentFloorPlan && (
        <FloorPlanSheet
          open={store.isRecentSheetOpen}
          onClose={store.closeRecentSheet}
          floorPlanName={recentFloorPlan.name}
          detailViews={[recentFloorPlan]}
          onConfirm={handleConfirmRecentFloorPlan}
        />
      )}
    </PageLayout>
  );
};

export default FloorPlanSelectStep;
