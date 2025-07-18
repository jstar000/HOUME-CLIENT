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
  const hasMoved = useRef(false); // 실제로 드래그가 발생했는지 확인

  // 위치 업데이트 함수
  const updateSheetPosition = (deltaY: number) => {
    if (deltaY > 0 && sheetRef.current) {
      hasMoved.current = true; // 움직임 발생
      currentY.current = deltaY;
      sheetRef.current.style.transition = '';
      sheetRef.current.style.transform = `translate(-50%, ${deltaY}px)`;
    }
  };

  // 드래그 취소 함수
  const cancelDrag = useCallback(() => {
    isDragging.current = false;
    hasMoved.current = false;
    currentY.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'transform 0.3s ease';
      sheetRef.current.style.transform = 'translate(-50%, 0)';
    }
  }, []);

  // 드래그 종료 함수
  const finishDrag = useCallback(() => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;

    // 움직임이 없었다면 그냥 취소
    if (!hasMoved.current) {
      cancelDrag();
      return;
    }

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
    hasMoved.current = false;
  }, [threshold, onClose, cancelDrag]);

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

  // 터치 취소 핸들러 추가
  const handleTouchCancel = useCallback(() => {
    cancelDrag();
  }, [cancelDrag]);

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

  // 클린업 및 외부 클릭 감지
  useEffect(() => {
    // backdrop 클릭 시 드래그 상태 초기화
    const handleOutsideClick = () => {
      if (isDragging.current && !hasMoved.current) {
        cancelDrag();
      }
    };

    // 터치 시작 후 움직임이 없으면 취소
    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (isDragging.current && !hasMoved.current) {
        const target = e.target as HTMLElement;
        if (!sheetRef.current?.contains(target)) {
          cancelDrag();
        }
      }
    };

    document.addEventListener('click', handleOutsideClick, true);
    document.addEventListener('touchend', handleGlobalTouchEnd, true);

    return () => {
      isDragging.current = false;
      isClosing.current = false;
      hasMoved.current = false;
      document.removeEventListener('click', handleOutsideClick, true);
      document.removeEventListener('touchend', handleGlobalTouchEnd, true);
    };
  }, [cancelDrag, sheetRef]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
    onMouseDown: handleMouseDown,
  };
}
