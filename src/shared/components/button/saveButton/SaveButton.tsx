import React from 'react';

import SaveOnIcon from '@assets/icons/icnHeartColor.svg?react';
import SaveOffIcon from '@assets/icons/icnHeartGray.svg?react';

import * as styles from './SaveButton.css';

interface SaveButtonProps extends React.ComponentProps<'button'> {
  isSelected: boolean;
  onClick: () => void;
}

const SaveButton = ({
  isSelected,
  onClick,
  className,
  ...props
}: SaveButtonProps) => {
  const mergedClassName = `${styles.buttonWrapper}${
    className ? ` ${className}` : ''
  }`;

  return (
    <button
      {...props}
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={mergedClassName}
    >
      {isSelected ? <SaveOnIcon /> : <SaveOffIcon />}
    </button>
  );
};

export default SaveButton;
