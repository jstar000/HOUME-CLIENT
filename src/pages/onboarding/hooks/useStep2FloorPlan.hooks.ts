// useStep2FloorPlan.hooks.ts (로직 담당)
import { useCallback } from 'react';
import { useFloorPlanQuery } from './useStep2Queries.hooks';
import type { CompletedFloorPlan, ImageGenerateSteps } from '../types/funnel';

interface SelectedFloorPlanTypes {
  id: number;
  src: string;
  flipped: boolean;
}

export const useStep2FloorPlan = (
  context: ImageGenerateSteps['FloorPlan'],
  onNext: (data: CompletedFloorPlan) => void
) => {
  // Step2FloorPlan 컴포넌트 렌더링 -> useStep2FloorPlan 훅 실행
  // -> useFloorPlanQuery 실행 -> 데이터 fetching
  const { data, isLoading, error, isError } = useFloorPlanQuery();

  const handleFloorPlanSelection = useCallback(
    (selectedFloorPlan: SelectedFloorPlanTypes) => {
      const payload: CompletedFloorPlan = {
        houseType: context.houseType!,
        roomType: context.roomType!,
        roomSize: context.roomSize!,
        floorPlan: {
          floorPlanId: selectedFloorPlan.id,
          isMirror: selectedFloorPlan.flipped,
        },
      };

      console.log('선택된 퍼널 페이로드:', payload);
      onNext(payload);
    },
    [context.houseType, context.roomType, context.roomSize, onNext]
  );

  return {
    handleFloorPlanSelection,
    floorPlanList: data?.floorPlanList,
    isLoading: isLoading,
    error: error,
    isError: isError,
  };
};
