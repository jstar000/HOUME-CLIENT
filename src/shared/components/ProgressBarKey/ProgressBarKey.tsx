import React from 'react';
import Step1Icon from '@shared/assets/icons/Step1Icon.svg?react';
import Step2Icon from '@shared/assets/icons/Step2Icon.svg?react';
import Step3Icon from '@shared/assets/icons/Step3Icon.svg?react';
import Step4Icon from '@shared/assets/icons/Step4Icon.svg?react';
import * as styles from './progressBarKey.css';
import type { ProgressBarKeyProps } from './progressBarKey.types';

const STEP_ICONS = [Step1Icon, Step2Icon, Step3Icon, Step4Icon];

/**
 * 4단계 진행 상황을 시각적으로 표시하는 진행률 바 컴포넌트
 */
const ProgressBarKey = React.memo(({ currentStep }: ProgressBarKeyProps) => {
  // currentStep 유효성 검사 (1~4)
  const normalizedStep = Math.max(1, Math.min(4, currentStep));

  return (
    <div
      className={styles.container}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={4}
      aria-valuenow={normalizedStep}
      aria-label={`진행 상황: ${normalizedStep}단계 (총 4단계)`}
    >
      <div className={styles.track} />
      <div className={styles.stepsWrapper}>
        {STEP_ICONS.map((Icon, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum <= normalizedStep;

          return (
            <div key={stepNum} className={styles.step}>
              <Icon
                className={styles.icon({
                  variant: isActive ? 'active' : 'inactive',
                })}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

ProgressBarKey.displayName = 'ProgressBarKey';

export default ProgressBarKey;
