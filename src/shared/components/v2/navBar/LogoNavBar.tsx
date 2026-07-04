import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import { GA_EVENTS } from '@shared/analytics/events';
import { SCREEN_NAME, type ScreenName } from '@shared/analytics/screenNames';
import { trackCallback } from '@shared/analytics/track';

import imgProfile from '@assets/v2/images/ImgProfile.svg';
import logotypeBlack from '@assets/v2/images/LogotypeBlack.svg';
import logotypeWhite from '@assets/v2/images/LogotypeWhite.svg';

import * as styles from './LogoNavBar.css';
import TextButton from '../btnText/TextButton';

type AuthSlot = 'none' | 'login' | 'profile';
type Page = 'landing' | 'home';

interface LogoNavBarProps extends React.ComponentProps<'nav'> {
  screenName: ScreenName;
  page?: Page;
  showGenerateButton?: boolean;
  authSlot?: AuthSlot;
  onGenerateClick?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
}

const LogoNavBar = ({
  screenName,
  page = 'home',
  showGenerateButton = false,
  authSlot = 'none',
  onGenerateClick,
  onLoginClick,
  onProfileClick,
  ...props
}: LogoNavBarProps) => {
  const navigate = useNavigate();
  const logoSrc = page === 'home' ? logotypeBlack : logotypeWhite;
  const hasAction = showGenerateButton || authSlot !== 'none';

  const handleLogoClick = trackCallback(
    GA_EVENTS.component.TOP_NAV_LOGO_CLICK,
    screenName,
    () => navigate(ROUTES.HOME),
    { return_screen_name: SCREEN_NAME.HOME }
  );

  const handleGenerateClick = trackCallback(
    GA_EVENTS.component.TOP_NAV_CREATE_IMG_CLICK,
    screenName,
    onGenerateClick,
    { return_screen_name: SCREEN_NAME.ROOM_TYPE }
  );

  const handleLoginClick = trackCallback(
    GA_EVENTS.component.TOP_NAV_LOGIN_CLICK,
    screenName,
    onLoginClick,
    { return_screen_name: SCREEN_NAME.LOGIN_SOCIAL }
  );

  const handleProfileClick = trackCallback(
    GA_EVENTS.component.TOP_NAV_MYPAGE_CLICK,
    screenName,
    onProfileClick,
    { return_screen_name: SCREEN_NAME.MYPAGE }
  );

  return (
    <nav className={styles.container} {...props}>
      <div className={styles.leftContainer}>
        <button
          type="button"
          className={styles.logoButton}
          onClick={handleLogoClick}
          aria-label="홈으로 이동"
        >
          <img src={logoSrc} alt="Houme" className={styles.logoImage} />
        </button>
      </div>
      <div className={styles.rightContainer({ hasAction })}>
        {showGenerateButton && (
          // TODO: 공컴 button으로 교체
          <button
            type="button"
            className={styles.generateButton}
            onClick={handleGenerateClick}
          >
            <span className={styles.generateLabel}>이미지 생성</span>
          </button>
        )}
        {authSlot === 'login' && (
          <div className={styles.actionContainer}>
            <TextButton color="primary" size="s" onClick={handleLoginClick}>
              로그인
            </TextButton>
          </div>
        )}
        {authSlot === 'profile' && (
          <div className={styles.actionContainer}>
            <button
              type="button"
              aria-label="프로필"
              className={styles.profileButton}
              onClick={handleProfileClick}
            >
              <img
                src={imgProfile}
                alt=""
                aria-hidden="true"
                className={styles.profileImage}
              />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LogoNavBar;
