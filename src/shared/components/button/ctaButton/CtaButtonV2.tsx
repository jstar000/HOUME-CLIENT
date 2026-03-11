import IcnLink from '@assets/icons/icnLink.svg?react';
import IcnRefresh from '@assets/icons/icnRefresh.svg?react';
import IcnTwoStar from '@assets/icons/icnTwoStar.svg?react';

import * as styles from './CtaButtonV2.css';

import type {
  CtaButtonColor,
  CtaButtonHeight,
  CtaButtonIcon,
  CtaButtonShape,
  CtaButtonStyle,
} from './CtaButtonV2.types';

interface CtaButtonV2Props
  extends Omit<React.ComponentProps<'button'>, 'children'> {
  children: React.ReactNode;
  shape?: CtaButtonShape;
  /** Figma style: fill | outline (DOM style과 구분 위해 buttonStyle) */
  buttonStyle?: CtaButtonStyle;
  height?: CtaButtonHeight;
  color?: CtaButtonColor;
  icon?: CtaButtonIcon;
  isActive?: boolean;
}

function ButtonIcon({ type }: { type: CtaButtonIcon }) {
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

const CtaButtonV2 = ({
  children,
  shape = 'round',
  buttonStyle = 'fill',
  height = 56,
  color = 'primary',
  icon = 'none',
  isActive = true,
  type = 'button',
  ...props
}: CtaButtonV2Props) => {
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

export default CtaButtonV2;
