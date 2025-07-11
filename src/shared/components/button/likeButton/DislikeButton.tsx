import { useState } from 'react';
import React from 'react';
import DislikeIconGray from '@assets/icons/dislikeGray.svg?react';
import DislikeIconColor from '@assets/icons/dislikeColor.svg?react';
import * as styles from './LikeButton.css';

interface DislikeButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  size?: 'small' | 'large';
}

const DislikeButton = ({
  children,
  size = 'small',
  ...props
}: DislikeButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.likeButton({
        selected: isSelected,
        size,
      })}
      {...props}
    >
      {isSelected ? <DislikeIconColor /> : <DislikeIconGray />}
      {children}
    </button>
  );
};

export default DislikeButton;
