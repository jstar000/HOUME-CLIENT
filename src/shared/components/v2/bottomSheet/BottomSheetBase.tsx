import type { ReactNode } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import IconButton from '@components/v2/button/IconButton';

import * as styles from './BottomSheetBase.css';
import { SHEET_TRANSITION_MS } from './constants';

type BasePhase = 'closed' | 'opening' | 'open' | 'closing';

interface BottomSheetBaseProps {
  open: boolean;
  headerType: 'dragHandle' | 'close';
  titleSlot?: ReactNode;
  titleAlign?: 'left' | 'center';
  contentSlot: ReactNode;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
  panelStyle?: React.CSSProperties;
  panelRef?: React.Ref<HTMLDivElement>;
  /** DragHandleBottomSheet에서 넘기는 idle/dragging target translateY (px). 미지정 시 0. */
  panelTranslateY?: number;
  dimOpacity?: number;
  disableTransition?: boolean;
  onOverlayClick?: () => void;
  onCloseClick?: () => void;
  handleSlot?: ReactNode;

  // DragHandleBottomSheet의 실제 드래그 영역을 드래그 핸들 버튼을 감싸는 wrapper(DragHeader) 전체로 확장
  dragHandlerProps?: Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onPointerDown'
    | 'onPointerMove'
    | 'onPointerUp'
    | 'onPointerCancel'
    | 'onLostPointerCapture'
  >;
  /** true일 때 overlay/viewportLayer의 터치 이벤트를 통과시켜 뒷배경 터치 가능하게 함 */
  backgroundInteractable?: boolean;
  /** true일 때 body overflow를 hidden으로 설정하여 뒷배경 스크롤을 막음 (기본: true) */
  preventScroll?: boolean;
  /** dragHandle 시트의 펼침 상태. 본문↔버튼 gap을 collapsed 8px / expanded 20px로 분기 (기본: false) */
  expanded?: boolean;
  /** 콘텐츠 스크롤 컨테이너(contentSlot) ref. body 드래그 시 scrollTop 측정용 */
  contentScrollRef?: React.Ref<HTMLDivElement>;
  /** contentSlot에 부착할 body 터치 드래그 핸들러 (DragHandleBottomSheet에서 시트 expand/collapse 제어) */
  contentTouchHandlers?: Pick<
    React.DOMAttributes<HTMLDivElement>,
    'onTouchStart' | 'onTouchMove' | 'onTouchEnd' | 'onTouchCancel'
  >;
}

const BottomSheetBase = ({
  open,
  headerType,
  titleSlot,
  titleAlign = 'center',
  contentSlot,
  primaryButton,
  secondaryButton,
  panelStyle,
  panelRef,
  panelTranslateY,
  dimOpacity,
  disableTransition = false,
  onOverlayClick,
  onCloseClick,
  handleSlot,
  dragHandlerProps,
  backgroundInteractable = false,
  preventScroll = true,
  expanded = false,
  contentScrollRef,
  contentTouchHandlers,
}: BottomSheetBaseProps) => {
  const [basePhase, setBasePhase] = useState<BasePhase>('closed');

  const internalPanelRef = useRef<HTMLDivElement>(null);
  const panelHRef = useRef(0);
  const closingPanelHRef = useRef(0);
  const genRef = useRef(0);

  // 외부 panelRef와 내부 ref를 동기화
  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      internalPanelRef.current = node;
      if (typeof panelRef === 'function') {
        panelRef(node);
      } else if (panelRef && 'current' in panelRef) {
        (panelRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
      }
    },
    [panelRef]
  );

  // 뒷배경 스크롤 차단: collapsed Persistent (preventScroll=false) 외에는 lock
  useEffect(() => {
    if (basePhase === 'closed' || !preventScroll) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [basePhase, preventScroll]);

  // open prop 변화 → phase 전환 (open/close 애니메이션 트리거)
  // useLayoutEffect로 두어야 dismiss 시 한 프레임 튐 방지
  //   useEffect였을 때: DragHandle이 setDragY(null) → render에서 panelTranslateY=0 (expanded 위치) → paint → useEffect에서 'closing' 전환
  //   useLayoutEffect: commit 직후 paint 전에 'closing' 전환 → 사용자 눈에 중간 상태 안보임!
  useLayoutEffect(() => {
    if (open) {
      setBasePhase((prev) =>
        prev === 'closed' || prev === 'closing' ? 'opening' : prev
      );
    } else {
      setBasePhase((prev) => {
        if (prev === 'open' || prev === 'opening') {
          // closing 진입 시 panel을 실측 후 snapshot (콘텐츠가 open 후 커진 경우 stale 방지)
          const node = internalPanelRef.current;
          const measured = node ? node.offsetHeight : panelHRef.current;
          closingPanelHRef.current = measured || 0;
          return 'closing';
        }
        return prev;
      });
    }
  }, [open]);

  // opening: 패널 높이 측정 (closing 시 slideOut 거리용)
  useLayoutEffect(() => {
    if (basePhase !== 'opening') return;
    const panel = internalPanelRef.current;
    if (panel) panelHRef.current = panel.offsetHeight;
  }, [basePhase]);

  // closing: animationend fallback
  useEffect(() => {
    if (basePhase !== 'closing') return undefined;

    const myGen = ++genRef.current;
    const timer = window.setTimeout(() => {
      if (myGen !== genRef.current) return;
      setBasePhase('closed');
    }, SHEET_TRANSITION_MS + 50);

    return () => {
      clearTimeout(timer);
    };
  }, [basePhase]);

  // panel animationend 가드 (closeButton scale animation bubble 차단)
  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== internalPanelRef.current) return;
      if (basePhase === 'opening') {
        setBasePhase('open');
      }
      if (basePhase === 'closing') {
        setBasePhase('closed');
      }
    },
    [basePhase]
  );

  if (basePhase === 'closed') return null;

  const panelMotionStyle = (() => {
    if (basePhase === 'opening') {
      return { animation: styles.sheetSlideInAnimation };
    }
    if (basePhase === 'closing') {
      return {
        ['--sheet-close-y' as string]: `${closingPanelHRef.current}px`,
        animation: styles.sheetSlideOutAnimation,
      };
    }
    return {
      transform: `translateY(${panelTranslateY ?? 0}px)`,
      ...(disableTransition ? { transition: 'none' } : {}),
    };
  })();

  // 접근성: title 추출 (스크린리더용)
  const accessibleTitle =
    typeof titleSlot === 'string' && titleSlot.trim().length > 0
      ? titleSlot
      : headerType === 'close'
        ? '닫기형 바텀시트'
        : '드래그 핸들 바텀시트';

  // backgroundInteractable=true일 때 aria-modal=false (스크린리더 트리 ↔ 실제 동작 일치)
  const ariaModal = !backgroundInteractable;

  // closing 중에는 dim도 함께 fade out. 외에는 dimOpacity prop 또는 CSS 기본값 사용
  const overlayStyle = (() => {
    if (basePhase === 'closing') {
      return { animation: styles.overlayFadeOutAnimation };
    }
    if (dimOpacity !== undefined) {
      return { opacity: dimOpacity };
    }
    return undefined;
  })();

  // dragHandle 시트가 collapsed일 땐 콘텐츠 스크롤을 막아야(overflow hidden)
  // body를 위로 끄는 제스처가 native 스크롤과 충돌 없이 expand로만 동작 (close 타입·expanded는 스크롤 허용)
  const contentScrollable = headerType !== 'dragHandle' || expanded;

  return createPortal(
    <div
      className={styles.viewportLayer}
      style={backgroundInteractable ? { pointerEvents: 'none' } : undefined}
    >
      <div
        className={styles.overlay}
        style={{
          ...overlayStyle,
          pointerEvents: backgroundInteractable ? 'none' : 'auto',
        }}
        onClick={onOverlayClick}
        aria-hidden="true"
      />
      <div
        className={styles.content}
        style={backgroundInteractable ? { pointerEvents: 'auto' } : undefined}
        role="dialog"
        aria-modal={ariaModal}
        aria-label={accessibleTitle}
      >
        <span className={styles.srOnlyTitle}>{accessibleTitle}</span>
        <div
          ref={setPanelRef}
          className={styles.panel({ headerType })}
          style={{
            ...panelStyle,
            ...panelMotionStyle,
          }}
          onAnimationEnd={handleAnimationEnd}
        >
          {headerType === 'dragHandle' ? (
            // dragHeader 자체를 button으로 -> 드래그 hit area를 dragHeader 전체로 확장 (모바일 드래그 UX 개선)
            <button
              type="button"
              aria-label="바텀시트 크기 조절"
              className={styles.dragHeader}
              {...dragHandlerProps}
            >
              {handleSlot}
            </button>
          ) : (
            <div className={styles.closeHeader}>
              <div className={styles.titleSlot({ align: titleAlign })}>
                {titleSlot}
              </div>
              <IconButton
                name="Close"
                size="M"
                aria-label="닫기"
                className={styles.closeButton}
                onClick={onCloseClick}
              />
            </div>
          )}
          <div className={styles.body({ headerType, expanded })}>
            <div
              ref={contentScrollRef}
              className={styles.contentSlot}
              style={{
                overflowY: contentScrollable ? 'auto' : 'hidden',
                touchAction: contentScrollable ? 'pan-y' : 'none',
              }}
              {...contentTouchHandlers}
            >
              {contentSlot}
            </div>
            <div className={styles.actionRow}>
              {secondaryButton && (
                <div className={styles.secondaryActionSlot}>
                  {secondaryButton}
                </div>
              )}
              <div className={styles.primaryActionSlot}>{primaryButton}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BottomSheetBase;
