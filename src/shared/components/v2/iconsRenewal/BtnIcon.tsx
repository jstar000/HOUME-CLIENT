import * as styles from './IconRenewal.css';
import IconsResponsive, {
  type IconName,
  type IconSize,
} from './IconsResponsive';

export type BtnIconSize = 'S' | 'M' | 'L' | 'XL';

const BTN_ICON_SIZE: Record<BtnIconSize, IconSize> = {
  S: '20',
  M: '24',
  L: '32',
  XL: '40',
} as const;

export interface BtnIconProps {
  name: IconName;
  size?: BtnIconSize;
  disabled?: boolean;
  onClick?: () => void;
}

const BtnIcon = ({
  name,
  size = 'S',
  disabled = false,
  onClick,
}: BtnIconProps) => {
  return (
    <button
      type="button"
      className={styles.btnIcon({
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

export default BtnIcon;
