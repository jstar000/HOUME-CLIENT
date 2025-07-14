import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './LoadingPage.css';
import { PROGRESS_CONFIG } from '../../constants/progressConfig';

const ProgressLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 90% 까지 (1분 기준 약 49.5초)
    if (!isDone) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= PROGRESS_CONFIG.SLOW_PHASE_END) {
            clearInterval(interval);
            return PROGRESS_CONFIG.SLOW_PHASE_END;
          }

          return prev + PROGRESS_CONFIG.SLOW_INCREMENT;
        });
      }, PROGRESS_CONFIG.SLOW_INTERVAL); // 0.1씩 0.055초마다 = 1% 오르는데 0.55초

      // 완료되는 시간 (완료 신호)
      const totalTime = setTimeout(() => {
        setIsDone(true);
      }, PROGRESS_CONFIG.TOTAL_TIME);

      return () => {
        clearInterval(interval);
        clearTimeout(totalTime);
      };
    }

    // 완료되었을 때
    if (isDone) {
      const doneInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= PROGRESS_CONFIG.FAST_INTERVAL) {
            clearInterval(doneInterval);
            return PROGRESS_CONFIG.FAST_INTERVAL;
          }
          return prev + PROGRESS_CONFIG.FAST_INCREMENT;
        });
      }, 100); // 0.1초마다 1% 씩

      return () => clearInterval(doneInterval);
    }
  }, [isDone]);

  useEffect(() => {
    if (progress === 100) {
      alert('이미지 생성 완료!');
      navigate('/generate/result');
    }
  }, [progress, navigate]);

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
