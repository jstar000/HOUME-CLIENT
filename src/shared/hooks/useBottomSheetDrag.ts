import { useRef, useEffect } from 'react';

interface UseBottomSheetDragProps {
  sheetRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  threshold?: number;
}

const DRAG_CLOSE_THRESHOLD_PX = 200;

export function useBottomSheetDrag({
  sheetRef,
  onClose,
  threshold = DRAG_CLOSE_THRESHOLD_PX,
}: UseBottomSheetDragProps) {
  const startY = useRef(0); // 드래그 시작 Y좌표
  const currentY = useRef(0); // 현재 드래그된 Y거리
  const isDragging = useRef(false); // 드래그 중 상태

  // 위치 업데이트 함수
  const updateSheetPosition = (deltaY: number) => {
    if (deltaY > 0 && sheetRef.current) {
      currentY.current = deltaY;
      sheetRef.current.style.transition = '';
      sheetRef.current.style.transform = `translate(-50%, ${deltaY}px)`;
    }
  };

  // 드래그 종료 함수
  const finishDrag = () => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;
    sheetRef.current.style.transition = 'transform 0.3s ease';
    sheetRef.current.style.transform = 'translate(-50%, 0)';
    if (currentY.current > threshold) {
      onClose();
    }
    currentY.current = 0;
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.touches[0].clientY - startY.current;
    updateSheetPosition(deltaY);
  };
  const handleTouchEnd = () => {
    finishDrag();
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    startY.current = e.clientY;
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove as any);
    document.addEventListener('mouseup', handleMouseUp as any);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.clientY - startY.current;
    updateSheetPosition(deltaY);
  };
  const handleMouseUp = () => {
    finishDrag();
    document.removeEventListener('mousemove', handleMouseMove as any);
    document.removeEventListener('mouseup', handleMouseUp as any);
  };

  useEffect(() => {
    // 언마운트 시 이벤트 해제
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
