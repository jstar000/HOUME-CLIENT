import * as React from 'react';

import clsx from 'clsx';

import Icon, {
  type IconName,
  type IconSize,
} from '@shared/components/v2/icon/Icon';

import * as styles from './ActionButton.css';

export type ActionButtonStyle = 'solid' | 'outlined' | 'ghost';
export type ActionButtonColor = 'primary' | 'inverse';
export type ActionButtonSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

const BUTTON_SIZE_TO_ICON_SIZE: Record<ActionButtonSize, IconSize> = {
  // 각 버튼 size에 맞는 아이콘 size 맵핑
  XS: '14',
  S: '14',
  M: '16',
  L: '16',
  XL: '16',
  '2XL': '16',
};

export interface ActionButtonProps
  extends Omit<React.ComponentProps<'button'>, 'children' | 'style'> {
  children: React.ReactNode;
  style?: ActionButtonStyle;
  color?: ActionButtonColor;
  size?: ActionButtonSize;
  leftIcon?: IconName;
  rightIcon?: IconName;
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
  className,
  ...props
}: ActionButtonProps) => {
  const isDisabled = disabled === true;
  const iconSize = BUTTON_SIZE_TO_ICON_SIZE[size];

  return (
    <span className={styles.buttonWrapper}>
      <button
        type={type}
        className={clsx(
          styles.button({
            style: visualStyle,
            color,
            size,
            ...(isDisabled ? { disabled: true } : {}),
          }),
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {leftIcon != null ? <Icon name={leftIcon} size={iconSize} /> : null}
        <span className={styles.btnlabel}>{children}</span>
        {rightIcon != null ? <Icon name={rightIcon} size={iconSize} /> : null}
      </button>
    </span>
  );
};

export default ActionButton;
