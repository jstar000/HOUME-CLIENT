import * as React from 'react';

import * as styles from './ActionButton.css';

type ActionButtonKind =
  | 'cta'
  | 'ctaOutline'
  | 'pillLight'
  | 'pillDark'
  | 'labelSquare'
  | 'labelRound'
  | 'pillGhost';

interface ActionButtonProps
  extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: React.ReactNode;
  kind?: ActionButtonKind;
  icon?: React.ReactNode;
  isActive?: boolean;
}

const ActionButton = ({
  children,
  kind = 'cta',
  icon,
  isActive = true,
  type = 'button',
  ...props
}: ActionButtonProps) => {
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
      className={styles.button({ kind })}
      {...props}
    >
      {iconContent}
      <span>{children}</span>
    </button>
  );
};

export default ActionButton;
