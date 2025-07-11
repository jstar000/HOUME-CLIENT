import * as styles from './signuppage.css.ts';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar.tsx';
import TextField from '@/shared/components/textField/TextField.tsx';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton.tsx';
import LargeFilled from '@/shared/components/button/largeFilledButton/LargeFilledButton.tsx';

const SignupPage = () => {
  return (
    <div>
      <TitleNavBar title="회원가입" isBackIcon={false} isLoginBtn={false} />
      <div className={styles.container}>
        <h1 className={styles.title}>추가 회원가입 정보</h1>
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>이름</h2>
          <TextField fieldSize="large" placeholder="이름을 입력해주세요." />
        </div>
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>생년월일</h2>
          <div className={styles.flexbox}>
            <TextField fieldSize="small" placeholder="YYYY" maxLength={4} />
            <TextField fieldSize="small" placeholder="MM" maxLength={2} />
            <TextField fieldSize="small" placeholder="DD" maxLength={2} />
          </div>
        </div>
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>성별</h2>
          <div className={styles.flexbox}>
            <LargeFilled buttonSize={'medium'}>남성</LargeFilled>
            <LargeFilled buttonSize={'medium'}>여성</LargeFilled>
            <LargeFilled buttonSize={'medium'}>논바이너리</LargeFilled>
          </div>
        </div>
      </div>
      <div className={styles.btnarea}>
        <CtaButton isActive={false}>회원가입 완료하기</CtaButton>
      </div>
    </div>
  );
};

export default SignupPage;
