import BackIcon from '@shared/assets/icons/backIcon.svg?react';
import * as styles from './TitleNavBar.css';

interface TitleNavBarProps extends React.ComponentProps<'button'> {
  title: string;
  isBackIcon?: boolean;
  isLoginBtn?: boolean;
}

const TitleNavBar = ({
  title,
  isBackIcon = true,
  isLoginBtn = true,
  ...props
}: TitleNavBarProps) => {
  return (
    <nav className={styles.container} {...props}>
      <div className={styles.leftdiv}>{isBackIcon && <BackIcon />}</div>
      <h1>{title}</h1>
      <div className={styles.rightdiv}>
        {isLoginBtn && <button>로그인</button>}
      </div>
    </nav>
  );
};

export default TitleNavBar;
