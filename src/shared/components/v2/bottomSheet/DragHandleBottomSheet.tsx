import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import BottomSheetBase from './BottomSheetBase';
import * as styles from './BottomSheetBase.css';

interface DragHandleBottomSheetProps {
  open: boolean;
  collapsedHeight: string;
  contentSlot: ReactNode;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
}

const DRAG_THRESHOLD = 56;
const EXPANDED_HEIGHT = 'calc(100dvh - 10.4rem)';

const DragHandleBottomSheet = ({
  open,
  collapsedHeight,
  contentSlot,
  primaryButton,
  secondaryButton,
}: DragHandleBottomSheetProps) => {
  const [expanded, setExpanded] = useState(false);
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerUp = (event: PointerEvent) => {
      if (startYRef.current === null) return;

      const deltaY = event.clientY - startYRef.current;

      if (deltaY <= -DRAG_THRESHOLD) {
        setExpanded(true);
      } else if (expanded && deltaY >= DRAG_THRESHOLD) {
        setExpanded(false);
      }

      startYRef.current = null;
    };

    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [expanded]);

  return (
    <BottomSheetBase
      open={open}
      headerType="dragHandle"
      contentSlot={contentSlot}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      panelStyle={{ height: expanded ? EXPANDED_HEIGHT : collapsedHeight }}
      handleSlot={
        <button
          type="button"
          aria-label="바텀시트 크기 조절"
          className={styles.dragHandleButton}
          onPointerDown={(event) => {
            startYRef.current = event.clientY;
          }}
        />
      }
    />
  );
};

export default DragHandleBottomSheet;
