import { useState } from 'react';
import * as styles from './LargeFilledButton.css';

interface LargeFilledProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isActive?: boolean;
  isError?: boolean;
  buttonSize?: 'medium' | 'large';
}

const LargeFilled = ({
  children,
  isActive = true,
  isError,
  buttonSize = 'large',
  ...props
}: LargeFilledProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.largeFilled({
        state: isError ? 'error' : isActive ? 'active' : 'disabled',
        selected: isSelected ? true : false,
        buttonSize,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default LargeFilled;
