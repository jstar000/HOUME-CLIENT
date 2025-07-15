import { useRef, useEffect } from 'react';

interface UseBottomSheetDragProps {
  sheetRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  threshold?: number;
}

export function useBottomSheetDrag({
  sheetRef,
  onClose,
  threshold = 150,
}: UseBottomSheetDragProps) {
  const startY = useRef(0); // 드래그 시작 Y좌표
  const currentY = useRef(0); // 현재 드래그된 Y거리
  const isDragging = useRef(false); // 드래그 중 상태

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    startY.current = e.touches[0].clientY; // 터치 시작점
    isDragging.current = true; // 드래그 시작 표시
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !sheetRef.current) return;
    const deltaY = e.touches[0].clientY - startY.current; // 이동 거리
    if (deltaY > 0) {
      currentY.current = deltaY; // 현재 드래그된 Y거리
      sheetRef.current.style.transform = `translate(-50%, ${deltaY}px)`; // 실시간 업데이트 (x축 고정)
    }
  };
  const handleTouchEnd = () => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false; // 드래그 중 상태 종료
    if (currentY.current > threshold) {
      // transform을 원위치로 돌리고 닫기
      sheetRef.current.style.transform = 'translate(-50%, 0)';
      onClose();
    } else {
      sheetRef.current.style.transform = 'translate(-50%, 0)';
    }
    currentY.current = 0;
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    startY.current = e.clientY; // 마우스 시작점
    isDragging.current = true; // 드래그 시작 표시
    document.addEventListener('mousemove', handleMouseMove as any);
    document.addEventListener('mouseup', handleMouseUp as any);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !sheetRef.current) return;
    const deltaY = e.clientY - startY.current; // 이동 거리
    if (deltaY > 0) {
      currentY.current = deltaY; // 현재 드래그된 Y거리
      sheetRef.current.style.transform = `translate(-50%, ${deltaY}px)`; // 실시간 업데이트 (x축 고정)
    }
  };
  const handleMouseUp = () => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false; // 드래그 중 상태 종료
    if (currentY.current > threshold) {
      sheetRef.current.style.transform = 'translate(-50%, 0)';
      onClose();
    } else {
      sheetRef.current.style.transform = 'translate(-50%, 0)';
    }
    currentY.current = 0;
    document.removeEventListener('mousemove', handleMouseMove as any);
    document.removeEventListener('mouseup', handleMouseUp as any);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp as any);
    };
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
  };
}
