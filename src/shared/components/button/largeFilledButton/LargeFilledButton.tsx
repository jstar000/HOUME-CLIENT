import * as styles from './LargeFilledButton.css';

interface LargeFilledProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isActive?: boolean;
  isError?: boolean;
  buttonSize?: 'medium' | 'large';
  isSelected?: boolean;
}

const LargeFilled = ({
  children,
  isActive = true,
  isError = false,
  buttonSize = 'large',
  isSelected = false,
  onClick,
  ...props
}: LargeFilledProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.largeFilled({
        state: isError ? 'error' : isActive ? 'active' : 'disabled',
        selected: isSelected,
        buttonSize,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default LargeFilled;
