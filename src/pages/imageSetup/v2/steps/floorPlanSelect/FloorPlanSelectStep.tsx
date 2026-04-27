import FilterSheet from './FilterSheet';
import FloorPlanSelectGrid from './FloorPlanSelectGrid';
import FloorPlanSheet from './FloorPlanSheet';
import { useFloorPlanSelect } from '../../hooks/useFloorPlanSelect';

import type {
  CompletedFloorPlanSelect,
  ImageSetupSteps,
} from '../../../types/funnel/steps';

interface FloorPlanSelectStepProps {
  context: ImageSetupSteps['FloorPlanSelect'];
  onNext: (data: CompletedFloorPlanSelect) => void;
}

const FloorPlanSelectStep = ({ context, onNext }: FloorPlanSelectStepProps) => {
  const {
    filterCategories,
    floorPlans,
    selectedFloorPlanName,
    selectedEquilibrium,
    selectedDetailViews,
    handleCardClick,
    handleConfirmFloorPlan,
    grid,
    filterSheet,
    floorPlanSheet,
  } = useFloorPlanSelect(context, onNext);

  return (
    <>
      <FloorPlanSelectGrid
        filterCategories={filterCategories}
        floorPlans={floorPlans}
        appliedFilters={grid.appliedFilters}
        onCardClick={handleCardClick}
        onFilterChipClick={grid.onFilterChipClick}
        onFilterChipClear={grid.onFilterChipClear}
      />

      <FilterSheet
        open={filterSheet.open}
        onClose={filterSheet.onClose}
        filterCategories={filterCategories}
        pendingFilters={filterSheet.pendingFilters}
        onFilterChange={filterSheet.onFilterChange}
        onApply={filterSheet.onApply}
        onReset={filterSheet.onReset}
      />

      {/* TODO: overlay-kit에 상태관리 위임, use-funnel에 등록 */}
      <FloorPlanSheet
        open={floorPlanSheet.open}
        onClose={floorPlanSheet.onClose}
        floorPlanName={selectedFloorPlanName}
        equilibrium={selectedEquilibrium}
        detailViews={selectedDetailViews}
        onConfirm={handleConfirmFloorPlan}
      />

      {/* TODO: GET /api/v2/recent-floor-plan swagger 갱신 후 RecentSheet 데이터 바인딩 */}
    </>
  );
};

export default FloorPlanSelectStep;
