import Step1Icon from '@shared/assets/icons/Step1Icon.svg?react';
import Step2Icon from '@shared/assets/icons/Step2Icon.svg?react';
import Step3Icon from '@shared/assets/icons/Step3Icon.svg?react';
import Step4Icon from '@shared/assets/icons/Step4Icon.svg?react';
import * as styles from './progressBarKey.css';
import type { ProgressBarKeyProps } from './progressBarKey.types';

const stepIcons = [Step1Icon, Step2Icon, Step3Icon, Step4Icon];

export default function ProgressBarKey({ currentStep }: ProgressBarKeyProps) {
  return (
    <div className={styles.container}>
      <div className={styles.track} />
      <div className={styles.stepsWrapper}>
        {stepIcons.map((Icon, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum <= currentStep;
          return (
            <div key={stepNum} className={styles.step}>
              <Icon
                className={styles.icon({
                  variant: isActive ? 'active' : 'inactive',
                })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
