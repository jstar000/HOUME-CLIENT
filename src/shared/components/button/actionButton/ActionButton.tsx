import IcnLink from '@assets/icons/icnLink.svg?react';
import IcnRefresh from '@assets/icons/icnRefresh.svg?react';
import IcnTwoStar from '@assets/icons/icnTwoStar.svg?react';

import * as styles from './ActionButton.css';

import type {
  ActionButtonColor,
  ActionButtonHeight,
  ActionButtonIcon,
  ActionButtonShape,
  ActionButtonStyle,
} from './ActionButton.types';

interface ActionButtonProps
  extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: React.ReactNode;
  shape?: ActionButtonShape;
  /** Figma style: fill | outline (DOM style과 구분 위해 buttonStyle) */
  buttonStyle?: ActionButtonStyle;
  height?: ActionButtonHeight;
  color?: ActionButtonColor;
  icon?: ActionButtonIcon;
  isActive?: boolean;
}

function ButtonIcon({ type }: { type: ActionButtonIcon }) {
  if (type === 'none') return null;

  const iconClassName = styles.iconSlot;

  if (type === 'externalLink') {
    return (
      <span className={iconClassName} aria-hidden>
        <IcnLink className={styles.iconSvg} />
      </span>
    );
  }

  if (type === 'twostar') {
    return (
      <span className={iconClassName} aria-hidden>
        <IcnTwoStar className={styles.iconSvg} />
      </span>
    );
  }

  if (type === 'refresh') {
    return (
      <span className={iconClassName} aria-hidden>
        <IcnRefresh className={styles.iconSvg} />
      </span>
    );
  }

  return null;
}

const ActionButton = ({
  children,
  shape = 'round',
  buttonStyle = 'fill',
  height = 56,
  color = 'primary',
  icon = 'none',
  isActive = true,
  type = 'button',
  ...props
}: ActionButtonProps) => {
  const hasIcon = icon !== 'none';

  return (
    <div className={styles.buttonWrapper}>
      <button
        type={type}
        disabled={!isActive}
        aria-disabled={!isActive}
        data-height={height}
        className={styles.button({
          shape,
          style: buttonStyle,
          height,
          color,
          hasIcon,
        })}
        {...props}
      >
        <ButtonIcon type={icon} />
        <span>{children}</span>
      </button>
    </div>
  );
};

export default ActionButton;
