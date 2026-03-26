import type { ReactNode } from 'react';

import * as styles from './Chip.css';
import Icon, { type IconName } from '../icon/Icon';

interface ChipProps extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: ReactNode;
  selected?: boolean;
  suffixIcon?: IconName;
}

const Chip = ({
  children,
  selected = false,
  suffixIcon,
  type = 'button',
  ...props
}: ChipProps) => {
  const hasSuffix = suffixIcon !== undefined;

  return (
    <button
      type={type}
      className={styles.chip({ selected })}
      aria-pressed={selected}
      {...props}
    >
      <span className={styles.content}>
        <span className={styles.label({ selected, hasSuffix })}>
          {children}
        </span>
        {suffixIcon && (
          <span className={styles.suffix} aria-hidden="true">
            <span className={styles.suffixIcon}>
              <Icon name={suffixIcon} size="12" />
            </span>
          </span>
        )}
      </span>
    </button>
  );
};

export default Chip;
