import type { ComponentProps, ReactNode } from 'react';

import clsx from 'clsx';

import * as styles from './BtnText.css';

export type BtnTextColor = 'primary' | 'secondary' | 'inverse';
export type BtnTextSize = 's' | 'm';

type BtnTextProps = Omit<ComponentProps<'button'>, 'children' | 'type'> & {
  color?: BtnTextColor;
  size?: BtnTextSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
};

const BtnText = ({
  className,
  color = 'primary',
  size = 'm',
  leftIcon,
  rightIcon,
  children,
  ...rest
}: BtnTextProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.button({ color }), className)}
      {...rest}
    >
      {leftIcon != null ? (
        <span className={styles.iconSlot({ size })} aria-hidden>
          {leftIcon}
        </span>
      ) : null}
      <span className={styles.text({ size })}>{children}</span>
      {rightIcon != null ? (
        <span className={styles.iconSlot({ size })} aria-hidden>
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
};

export default BtnText;
