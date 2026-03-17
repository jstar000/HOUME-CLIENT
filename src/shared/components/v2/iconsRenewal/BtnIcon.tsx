import { useState } from 'react';

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
  size: BtnIconSize;
  disabled?: boolean;
  onClick?: () => void;
}

const BtnIcon = ({
  name,
  size = 'S',
  disabled = false,
  onClick,
}: BtnIconProps) => {
  const [isPressed, setIsPressed] = useState(false);

  // onPointer > 마우스, 터치 등 모두 가능
  const onPointerDown = () => {
    if (!disabled) setIsPressed(true);
  };

  const onPointerUp = () => {
    if (!disabled) setIsPressed(false);
  };

  const onPointerLeave = () => {
    // 터치 및 클릭 취소
    if (!disabled) setIsPressed(false);
  };

  return (
    <button
      className={styles.btnIcon({
        status: isPressed ? 'PRESSED' : 'DEFAULT',
        disabled,
      })}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      <IconsResponsive size={BTN_ICON_SIZE[size]} name={name} />
    </button>
  );
};

export default BtnIcon;
