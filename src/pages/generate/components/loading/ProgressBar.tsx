import { useEffect, useState } from 'react';
import * as styles from './LoadingPage.css';
import { PROGRESS_CONFIG } from '../../constants/progressConfig';
import { useGenerateStore } from '../../stores/useGenerateStore';

interface ProgressLoadingBarProps {
  onComplete?: () => void;
}

const ProgressLoadingBar = ({ onComplete }: ProgressLoadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { isApiCompleted } = useGenerateStore();

  // 90%까지 천천히 증가
  useEffect(() => {
    if (isDone) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= PROGRESS_CONFIG.SLOW_PHASE_END) {
          return PROGRESS_CONFIG.SLOW_PHASE_END;
        }
        return prev + PROGRESS_CONFIG.SLOW_INCREMENT;
      });
    }, PROGRESS_CONFIG.SLOW_INTERVAL);

    return () => clearInterval(interval);
  }, [isDone]);

  // 90%→100% 빠르게 증가
  useEffect(() => {
    if (!isDone) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= PROGRESS_CONFIG.FAST_PHASE_END) {
          console.log(
            '📊 프로그레스 바 100% 완료:',
            new Date().toLocaleTimeString()
          );

          // 100% 완료 시 onComplete 콜백 호출
          if (onComplete) {
            setTimeout(() => onComplete(), 100); // 약간의 지연 후 호출
          }

          return PROGRESS_CONFIG.FAST_PHASE_END;
        }
        return prev + PROGRESS_CONFIG.FAST_INCREMENT;
      });
    }, PROGRESS_CONFIG.FAST_INTERVAL);

    return () => clearInterval(interval);
  }, [isDone]);

  // API 완료 시 isDone = true
  useEffect(() => {
    if (isApiCompleted && !isDone) {
      setIsDone(true);
    }
  }, [isApiCompleted, isDone]);

  return (
    <div className={styles.progressBarBox}>
      <div className={styles.progressBack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.loadText}>
        이미지를 생성하는 중이에요 ({Math.floor(progress)}%)
      </p>
    </div>
  );
};

export default ProgressLoadingBar;
