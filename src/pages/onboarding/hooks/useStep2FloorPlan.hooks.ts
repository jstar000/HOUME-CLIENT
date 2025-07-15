// useStep2FloorPlan.hooks.ts (로직 담당)
import type { CompletedFloorPlan, ImageGenerateSteps } from '../types/funnel';

interface SelectedHouseData {
  id: number;
  src: string;
  flipped: boolean;
}

export const useStep2FloorPlan = (
  context: ImageGenerateSteps['FloorPlan'],
  onNext: (data: CompletedFloorPlan) => void
) => {
  const handleFloorPlanSelection = (houseData: SelectedHouseData) => {
    // 디버깅용
    const payload = {
      houseType: context.houseType,
      roomType: context.roomType,
      roomSize: context.roomSize,
      floorPlan: {
        floorPlanId: houseData.id,
        isMirror: houseData.flipped,
      },
    };

    console.log('선택된 퍼널 페이로드:', payload);

    onNext({
      houseType: context.houseType,
      roomType: context.roomType,
      roomSize: context.roomSize,
      floorPlan: {
        floorPlanId: houseData.id,
        isMirror: houseData.flipped,
      },
    });
  };

  return {
    handleFloorPlanSelection,
  };
};
