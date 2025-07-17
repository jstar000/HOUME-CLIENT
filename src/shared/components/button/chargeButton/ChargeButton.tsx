import * as styles from './ChargeButton.css';

interface ChargeButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isActive?: boolean;
}
const ChargeButton = ({
  children,
  isActive = true,
  disabled = false,
  ...props
}: ChargeButtonProps) => {
  const isDisabled = disabled || !isActive;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={styles.chargeButton({
        state: isDisabled ? 'disabled' : 'active',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default ChargeButton;
