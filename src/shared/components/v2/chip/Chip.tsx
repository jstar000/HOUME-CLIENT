import type { ReactNode } from 'react';

import * as styles from './Chip.css';

interface ChipProps extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: ReactNode;
  selected?: boolean;
  suffixIcon?: ReactNode;
  suffixAriaLabel?: string;
  onSuffixClick?: () => void;
}

const Chip = ({
  children,
  selected = false,
  suffixIcon,
  suffixAriaLabel,
  onSuffixClick,
  type = 'button',
  className,
  onClick,
  ...props
}: ChipProps) => {
  const hasSuffix = suffixIcon !== undefined;
  const chipClassName = `${styles.chip({ selected })}${className ? ` ${className}` : ''}`;

  if (hasSuffix && onSuffixClick) {
    return (
      <div className={chipClassName}>
        <button
          type={type}
          className={styles.mainButton}
          aria-pressed={selected}
          onClick={onClick}
          {...props}
        >
          <span className={styles.label({ selected, hasSuffix: true })}>
            {children}
          </span>
        </button>
        <button
          type="button"
          className={styles.suffixButton}
          aria-label={suffixAriaLabel}
          onClick={onSuffixClick}
        >
          <span className={styles.suffixIcon} aria-hidden="true">
            {suffixIcon}
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      type={type}
      className={chipClassName}
      aria-pressed={selected}
      onClick={onClick}
      {...props}
    >
      <span className={styles.content}>
        <span className={styles.label({ selected, hasSuffix })}>
          {children}
        </span>
        {hasSuffix && (
          // TODO: 아이콘
          <span className={styles.suffix} aria-hidden="true">
            {suffixIcon}
          </span>
        )}
      </span>
    </button>
  );
};

export default Chip;
