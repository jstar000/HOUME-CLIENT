import { useRef, useEffect, useCallback } from 'react';

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
  const isClosing = useRef(false); // 닫기 중 상태
  const dragHandleRef = useRef<HTMLDivElement | null>(null);

  // 위치 업데이트 함수
  const updateSheetPosition = (deltaY: number) => {
    if (deltaY > 0 && sheetRef.current) {
      currentY.current = deltaY;
      sheetRef.current.style.transition = '';
      sheetRef.current.style.transform = `translate(-50%, ${deltaY}px)`;
    }
  };

  // 드래그 종료 함수
  const finishDrag = useCallback(() => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;
    sheetRef.current.style.transition = 'transform 0.3s ease';

    if (currentY.current > threshold && !isClosing.current) {
      isClosing.current = true;
      sheetRef.current.style.transform = 'translate(-50%, 100%)';
      setTimeout(() => {
        onClose();
        isClosing.current = false;
      }, 300);
    } else {
      sheetRef.current.style.transform = 'translate(-50%, 0)';
    }
    currentY.current = 0;
  }, [threshold, onClose]);

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };
  const handleTouchMove = () => {
    // React 이벤트에서는 preventDefault를 호출하지 않음
    // useEffect에서 등록한 non-passive 리스너가 처리함
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

  // Passive 이벤트 리스너 문제 해결을 위한 useEffect
  useEffect(() => {
    const element = dragHandleRef.current;
    if (!element) return;

    const touchMoveHandler = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const deltaY = e.touches[0].clientY - startY.current;
      updateSheetPosition(deltaY);
    };

    // non-passive 리스너로 등록
    element.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      element.removeEventListener('touchmove', touchMoveHandler);
      isDragging.current = false;
      isClosing.current = false;
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp as any);
    };
  }, []);

  return {
    ref: dragHandleRef,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
  };
}
