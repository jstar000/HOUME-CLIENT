import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

export type MotionPhase = 'opening' | 'open' | 'closing';

interface UseMountMotionPhaseOptions {
  /** 닫힘 transition 소요 시간(ms) */
  exitDurationMs: number;
  /** transitionend로 닫힘 완료를 감지할 CSS property (기본: opacity) */
  exitEndProperty?: string;
}

interface UseMountMotionPhaseReturn {
  phase: MotionPhase;
  isVisible: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  requestClose: (action: () => void) => void;
  handleTransitionEnd: (e: React.TransitionEvent<HTMLElement>) => void;
  /** opening → none, open → enter, closing → exit */
  resolveTransition: (
    enterTransition: string,
    exitTransition: string
  ) => string;
}

/**
 * mount 시 enter 애니메이션, dismiss 시 exit 애니메이션 후 콜백 실행
 * Popup 등 {show && <Overlay />} 패턴에서 닫힘 motion을 보여주기 위한 phase 관리
 */
export const useMountMotionPhase = ({
  exitDurationMs,
  exitEndProperty = 'opacity',
}: UseMountMotionPhaseOptions): UseMountMotionPhaseReturn => {
  const [phase, setPhase] = useState<MotionPhase>('opening');
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingActionRef = useRef<(() => void) | null>(null);
  const genRef = useRef(0);

  // opening: 첫 프레임 hidden → rAF×2 후 open (enter transition 트리거)
  useLayoutEffect(() => {
    if (phase !== 'opening') return undefined;

    const myGen = ++genRef.current;
    let raf2: number | null = null;
    const raf1 = requestAnimationFrame(() => {
      if (myGen !== genRef.current) return;
      raf2 = requestAnimationFrame(() => {
        if (myGen !== genRef.current) return;
        setPhase('open');
        raf2 = null;
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
    };
  }, [phase]);

  const finishClose = useCallback(() => {
    const action = pendingActionRef.current;
    if (!action) return;
    pendingActionRef.current = null;
    action();
  }, []);

  // closing: transitionend fallback
  useEffect(() => {
    if (phase !== 'closing') return undefined;

    const myGen = ++genRef.current;
    const timer = window.setTimeout(() => {
      if (myGen !== genRef.current) return;
      finishClose();
    }, exitDurationMs + 50);

    return () => {
      clearTimeout(timer);
    };
  }, [phase, finishClose, exitDurationMs]);

  const requestClose = useCallback(
    (action: () => void) => {
      if (phase === 'closing') return;
      pendingActionRef.current = action;
      setPhase('closing');
    },
    [phase]
  );

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLElement>) => {
      if (e.target !== containerRef.current) return;
      if (e.propertyName !== exitEndProperty) return;
      if (phase === 'closing') {
        finishClose();
      }
    },
    [phase, finishClose, exitEndProperty]
  );

  const isVisible = phase === 'open';

  const resolveTransition = useCallback(
    (enterTransition: string, exitTransition: string) => {
      if (phase === 'opening') return 'none';
      return isVisible ? enterTransition : exitTransition;
    },
    [phase, isVisible]
  );

  return {
    phase,
    isVisible,
    containerRef,
    requestClose,
    handleTransitionEnd,
    resolveTransition,
  };
};
