import * as React from 'react';

import * as styles from './ActionButton.css';

interface ActionButtonProps
  extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: React.ReactNode;
  shape?: 'round' | 'square';
  buttonStyle?: 'fill' | 'outline';
  height?: 56 | 44 | 40 | 32 | 26;
  color?: 'primary' | 'inverse';
  icon?: React.ReactNode;
  isActive?: boolean;
}

const ActionButton = ({
  children,
  shape = 'round',
  buttonStyle = 'fill',
  height = 56,
  color = 'primary',
  icon,
  isActive = true,
  type = 'button',
  ...props
}: ActionButtonProps) => {
  const hasIcon = icon != null;

  const iconContent =
    icon != null ? (
      <span className={styles.iconSlot} aria-hidden>
        {icon}
      </span>
    ) : null;

  return (
    <button
      type={type}
      disabled={!isActive}
      className={styles.button({
        shape,
        style: buttonStyle,
        height,
        color,
        hasIcon,
      })}
      {...props}
    >
      {iconContent}
      <span>{children}</span>
    </button>
  );
};

export default ActionButton;
