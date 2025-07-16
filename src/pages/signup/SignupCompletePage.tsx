import { useState } from 'react';
import * as styles from './SignupCompletePage.css';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const SignupCompletePage = () => {
  // 사용자 이름을 상태로 관리 (추후 API 연동 시 setUserName 사용)
  const [userName] = useState('사용자 이름');

  return (
    <div className={styles.container}>
      <TitleNavBar title="시작하기" isBackIcon={false} isLoginBtn={false} />
      <div className={styles.textbox}>
        <h1 className={styles.title}>
          {userName}님, 지금 바로 <br /> 집 꾸미기 시작해봐요!
        </h1>
        <p className={styles.content}>
          24시간 동안 무료로 이미지를 생성할 수 있는 <br />
          토큰 1개를 선물로 드렸어요.
        </p>
      </div>
      <div className={styles.imgbox}></div>
      <div className={styles.btnarea}>
        <CtaButton>이미지 만들러가기</CtaButton>
      </div>
    </div>
  );
};

export default SignupCompletePage;
