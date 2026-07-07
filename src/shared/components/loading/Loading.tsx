import React from 'react';

import { LOTTIE_SPEED } from '@assets/lottie/lottieAssets';

import DotLottiePlayer from '@components/lottie/DotLottiePlayer';

import * as styles from './Loading.css';

interface LoadingProps {
  text?: string;
  show?: boolean;
  /** true면 부모 영역 안에서만 표시 (viewport fixed 오버레이 사용 안 함) */
  inline?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  text = '로딩 중입니다',
  show = true,
  inline = false,
}) => {
  if (!show) return null;

  return (
    <div
      className={inline ? styles.loadingInline : styles.loadingOverlay}
      aria-busy={show}
      aria-live="polite"
    >
      <div className={styles.loadingContainer}>
        <DotLottiePlayer
          variant="loading"
          speed={LOTTIE_SPEED.LOADING}
          size="loading"
          ariaLabel="로딩 애니메이션"
        />
        {text ? <div className={styles.loadingText}>{text}</div> : null}
      </div>
    </div>
  );
};

export default Loading;
