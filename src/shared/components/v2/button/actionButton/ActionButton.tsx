import * as React from 'react';

import * as styles from './ActionButton.css';

export type ActionButtonStyle = 'solid' | 'outlined';
export type ActionButtonColor = 'primary' | 'inverse';
export type ActionButtonSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

export interface ActionButtonProps
  extends Omit<React.ComponentProps<'button'>, 'children' | 'style'> {
  children: React.ReactNode;
  style?: ActionButtonStyle;
  color?: ActionButtonColor;
  size?: ActionButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ActionButton = ({
  children,
  style: visualStyle = 'solid',
  color = 'primary',
  size = '2XL',
  leftIcon,
  rightIcon,
  type = 'button',
  disabled,
  ...props
}: ActionButtonProps) => {
  const isDisabled = disabled === true;

  return (
    <span className={styles.buttonWrapper}>
      <button
        type={type}
        className={styles.button({
          style: visualStyle,
          color,
          size,
          ...(isDisabled ? { disabled: true } : {}),
        })}
        {...props}
      >
        {leftIcon != null ? (
          <span className={styles.iconSlot} aria-hidden>
            {leftIcon}
          </span>
        ) : null}
        {children}
        {rightIcon != null ? (
          <span className={styles.iconSlot} aria-hidden>
            {rightIcon}
          </span>
        ) : null}
      </button>
    </span>
  );
};

export default ActionButton;
