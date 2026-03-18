// 도면 바텀시트 전용 로직
// 도면 상세 바텀시트 안에서의 뷰 전환 + 좌우반전 로직 담당

import { useCallback, useMemo } from 'react';

import { useFloorPlanStore } from '../stores/useFloorPlanStore';

import type { FloorPlanDetailView } from '../types/floorPlan';

export const useFloorPlanSheet = (detailViews: FloorPlanDetailView[]) => {
  const { selectedViewIndex, setViewIndex, isMirror, toggleMirror } =
    useFloorPlanStore();

  const isSingleView = detailViews.length <= 1;
  const isMultiView = detailViews.length > 1;

  const currentView = useMemo(
    () => detailViews[selectedViewIndex] ?? detailViews[0] ?? null,
    [detailViews, selectedViewIndex]
  );

  const handlePrev = useCallback(() => {
    if (detailViews.length === 0) return;
    setViewIndex(
      (selectedViewIndex - 1 + detailViews.length) % detailViews.length
    );
  }, [detailViews.length, selectedViewIndex, setViewIndex]);

  const handleNext = useCallback(() => {
    if (detailViews.length === 0) return;
    setViewIndex((selectedViewIndex + 1) % detailViews.length);
  }, [detailViews.length, selectedViewIndex, setViewIndex]);

  return {
    currentView, // 현재 보고 있는 뷰 (FloorPlanDetailView)
    selectedViewIndex, // 현재 뷰 인덱스
    isSingleView, // 뷰 1개 → prev/next 버튼 숨김
    isMultiView, // 뷰 2개 이상 → prev/next 버튼 표시
    isMirror, // 좌우반전 상태
    toggleMirror, // 좌우반전 토글
    handlePrev, // 이전 뷰 (순환)
    handleNext, // 다음 뷰 (순환)
  };
};
