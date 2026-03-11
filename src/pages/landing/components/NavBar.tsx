import LogotypeWhite from '@assets/icons/logotypeWhite.svg?react';

import * as styles from './NavBar.css';

const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.leftDiv}>
        <LogotypeWhite />
      </div>
      <div className={styles.rightDiv}></div>
    </nav>
  );
};

export default NavBar;
