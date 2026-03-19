import * as React from 'react';

import Icon, { type IconName } from '@/shared/components/v2/icon/Icon';

import * as styles from './GhostButton.css';

export interface GhostButtonProps
  extends Omit<
    React.ComponentProps<'button'>,
    'children' | 'leftIcon' | 'rightIcon'
  > {
  children: React.ReactNode;
  leftIcon?: IconName;
  rightIcon?: IconName;
}

const GhostButton = ({
  children,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}: GhostButtonProps) => {
  return (
    <span className={styles.buttonWrapper}>
      <button type={type} className={styles.button} {...props}>
        {leftIcon != null ? <Icon name={leftIcon} size="16" /> : null}
        {children}
        {rightIcon != null ? <Icon name={rightIcon} size="16" /> : null}
      </button>
    </span>
  );
};

export default GhostButton;
