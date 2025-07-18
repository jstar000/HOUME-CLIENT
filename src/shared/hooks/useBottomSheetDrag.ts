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
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const isClosing = useRef(false);

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

  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.touches[0].clientY - startY.current;
    updateSheetPosition(deltaY);
  }, []);

  const handleTouchEnd = useCallback(() => {
    finishDrag();
  }, [finishDrag]);

  // 마우스 이벤트 핸들러
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      startY.current = e.clientY;
      isDragging.current = true;

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const deltaY = e.clientY - startY.current;
        updateSheetPosition(deltaY);
      };

      const handleMouseUp = () => {
        finishDrag();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [finishDrag]
  );

  // 클린업
  useEffect(() => {
    return () => {
      isDragging.current = false;
      isClosing.current = false;
    };
  }, []);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
  };
}
