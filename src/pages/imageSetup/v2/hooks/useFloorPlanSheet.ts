// 도면 바텀시트 전용 로직
// 도면 상세 바텀시트 안에서의 도면 이미지 전환 + 좌우반전 로직 담당

import { useCallback, useMemo } from 'react';

import { useFloorPlanStore } from '../stores/useFloorPlanStore';

export const useFloorPlanSheet = (imageUrls: string[]) => {
  const { selectedViewIndex, setViewIndex, isMirror, toggleMirror } =
    useFloorPlanStore();

  const isSingleView = imageUrls.length <= 1;
  const isMultiView = imageUrls.length > 1;

  const currentImageUrl = useMemo(
    () => imageUrls[selectedViewIndex] ?? imageUrls[0] ?? null,
    [imageUrls, selectedViewIndex]
  );

  const handlePrev = useCallback(() => {
    if (imageUrls.length === 0) return;
    setViewIndex((selectedViewIndex - 1 + imageUrls.length) % imageUrls.length);
  }, [imageUrls.length, selectedViewIndex, setViewIndex]);

  const handleNext = useCallback(() => {
    if (imageUrls.length === 0) return;
    setViewIndex((selectedViewIndex + 1) % imageUrls.length);
  }, [imageUrls.length, selectedViewIndex, setViewIndex]);

  return {
    currentImageUrl, // 현재 보고 있는 이미지 URL
    selectedViewIndex, // 현재 뷰 인덱스
    isSingleView, // 이미지 1개 → prev/next 버튼 숨김
    isMultiView, // 이미지 2개 이상 → prev/next 버튼 표시
    isMirror, // 좌우반전 상태
    toggleMirror, // 좌우반전 토글
    handlePrev, // 이전 뷰 (순환)
    handleNext, // 다음 뷰 (순환)
  };
};
