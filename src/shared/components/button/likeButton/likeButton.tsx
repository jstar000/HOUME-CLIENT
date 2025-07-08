import LikeIcon from '@assets/icons/likeIcon.svg?react';
import * as styles from './likeButton.css';

interface LikeButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isSelected?: boolean;
}

const LikeButton = ({
  children,
  isSelected = true,
  ...props
}: LikeButtonProps) => {
  return (
    <button
      type="button"
      className={styles.likeButton({
        selected: isSelected ? 'active' : 'disabled',
      })}
      {...props}
    >
      <LikeIcon />
      {children}
    </button>
  );
};

export default LikeButton;
