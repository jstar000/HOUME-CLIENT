import { useState } from 'react';
import clsx from 'clsx';
import * as styles from './SmallFilledButton.css';

interface SmallFilledProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const SmallFilled = ({
  children,
  isSelected,
  onClick,
  ...props
}: SmallFilledProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        styles.smallButtonBase,
        styles.smallButtonVariants[isClicked ? 'on' : 'off']
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SmallFilled;
