import clsx from 'clsx';
import * as styles from './SmallFilledButton.css';

interface SmallFilledProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  isSelected: boolean;
}

const SmallFilled = ({ children, isSelected, ...props }: SmallFilledProps) => {
  return (
    <div
      className={clsx(
        styles.smallButtonBase,
        styles.smallButtonVariants[isSelected ? 'on' : 'off']
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default SmallFilled;
