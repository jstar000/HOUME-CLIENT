import * as styles from './LargeFilledButton.css';

interface LargeFilledProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isActive?: boolean;
  isError?: boolean;
  isSelected?: boolean;
}

const LargeFilled = ({
  children,
  isActive = true,
  isError,
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
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default LargeFilled;
