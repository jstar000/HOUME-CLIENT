// useStep2FloorPlan.hooks.ts (로직 담당)
import { useCallback, useEffect } from 'react';
import { useFloorPlanApi } from './useStep2Api.hooks';
import { useFunnelStore } from '../stores/useFunnelStore';
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
  const { data, isLoading, error, isError } = useFloorPlanApi();

  // Zustand 스토어에서 상태 가져오기
  const { step2, setStep2Data, setCurrentStep, clearAfterStep } =
    useFunnelStore();

  // 컴포넌트 마운트 시 현재 스텝 설정
  useEffect(() => {
    setCurrentStep(2);
  }, []);

  const handleFloorPlanSelection = useCallback(
    (selectedFloorPlan: SelectedFloorPlanTypes) => {
      const floorPlanData = {
        floorPlanId: selectedFloorPlan.id,
        isMirror: selectedFloorPlan.flipped,
      };

      setStep2Data(floorPlanData);

      // Step2 이후 데이터 초기화 (Step3, 4 데이터 클리어)
      clearAfterStep(2);

      const payload: CompletedFloorPlan = {
        houseType: context.houseType,
        roomType: context.roomType,
        areaType: context.areaType,
        houseId: context.houseId,
        floorPlan: {
          floorPlanId: selectedFloorPlan.id,
          isMirror: selectedFloorPlan.flipped,
        },
      };

      console.log('선택된 퍼널 페이로드:', payload);
      onNext(payload);
    },
    [context.houseType, context.roomType, context.areaType, onNext]
  );

  return {
    handleFloorPlanSelection,
    floorPlanList: data?.floorPlanList,
    isLoading: isLoading,
    error: error,
    isError: isError,
  };
};
