// 도면 바텀시트 전용 로직
// 도면 상세 바텀시트 안에서의 도면 이미지 전환 + 좌우반전 로직 담당

import { useCallback, useMemo } from 'react';

import { useFloorPlanStore } from '../stores/useFloorPlanStore';

import type { FloorPlanData } from '../types/floorPlan';

export const useFloorPlanSheet = (floorPlan: FloorPlanData | null) => {
  const { selectedViewIndex, setViewIndex, isMirror, toggleMirror } =
    useFloorPlanStore();

  const views = floorPlan?.views ?? [];
  const isSingleView = views.length === 1;
  const isMultiView = views.length > 1;

  const currentView = useMemo(
    () => views[selectedViewIndex] ?? null,
    [views, selectedViewIndex]
  );

  const handlePrev = useCallback(() => {
    if (views.length === 0) return;
    setViewIndex((selectedViewIndex - 1 + views.length) % views.length);
  }, [views.length, selectedViewIndex, setViewIndex]);

  const handleNext = useCallback(() => {
    if (views.length === 0) return;
    setViewIndex((selectedViewIndex + 1) % views.length);
  }, [views.length, selectedViewIndex, setViewIndex]);

  return {
    currentView, // 지금 보고 있는 view (이미지 URL + 라벨)
    isSingleView, // view가 1개면 true, prev/next 버튼 안보여줌
    isMultiView, // view가 2개 이상, prev/next 버튼 보여줌
    isMirror, // 좌우반전 상태
    toggleMirror, // 좌우반전 토글
    handlePrev, // 이전 뷰 (순환: 처음에서 prev 시 마지막으로)
    handleNext, // 다음 뷰 (순환: 마지막에서 next 시 첫번째로)
  };
};
