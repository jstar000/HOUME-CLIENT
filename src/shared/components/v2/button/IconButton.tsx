import IconsResponsive, { type IconName, type IconSize } from '../icon/Icon';
import * as styles from '../icon/Icon.css';

export type IconButtonSize = 'S' | 'M' | 'L' | 'XL';

const BTN_ICON_SIZE: Record<IconButtonSize, IconSize> = {
  S: '20',
  M: '24',
  L: '32',
  XL: '40',
} as const;

export interface IconButtonProps {
  name: IconName;
  size?: IconButtonSize;
  disabled?: boolean;
  onClick?: () => void;
}

const IconButton = ({
  name,
  size = 'S',
  disabled = false,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={styles.iconButton({
        size,
        disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      <IconsResponsive size={BTN_ICON_SIZE[size]} name={name} />
    </button>
  );
};

export default IconButton;
