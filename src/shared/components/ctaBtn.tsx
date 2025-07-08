import * as styles from './ctaBtn.css';

interface CtaButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  isActive?: boolean;
}

const CtaButton = ({ children, isActive = true, ...props }: CtaButtonProps) => {
  return (
    <button
      type="button"
      className={styles.CtaButton({
        state: isActive ? 'active' : 'disabled',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default CtaButton;
