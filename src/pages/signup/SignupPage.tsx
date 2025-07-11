import { useState } from 'react';
import * as styles from './signuppage.css.ts';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar.tsx';
import TextField from '@/shared/components/textField/TextField.tsx';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton.tsx';
import LargeFilled from '@/shared/components/button/largeFilledButton/LargeFilledButton.tsx';
import ShowErrorMessage from '@/shared/components/button/showErrorButton/ShowErrorButton.tsx';
import { ERROR_MESSAGES } from '@/shared/constants/clientErrorMessage.ts';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'nonbinary' | null>(
    null
  );

  const nameRegex = /^[\p{Script=Hangul}a-zA-Z]+$/u;
  const isNameValid = nameRegex.test(name);

  // 숫자 여부 확인
  const isYearNumeric = /^\d{4}$/.test(birthYear);
  const isMonthNumeric = /^\d{1,2}$/.test(birthMonth);
  const isDayNumeric = /^\d{1,2}$/.test(birthDay);

  const yearNum = parseInt(birthYear, 10);
  const monthNum = parseInt(birthMonth, 10);
  const dayNum = parseInt(birthDay, 10);

  // 연령 유효성 검사 (만 14세 이상)
  const isAgeValid = (() => {
    if (!isYearNumeric || birthYear.length !== 4) return false;
    const today = new Date();
    const age =
      today.getFullYear() -
      yearNum -
      (today.getMonth() + 1 < monthNum ||
      (today.getMonth() + 1 === monthNum && today.getDate() < dayNum)
        ? 1
        : 0);
    return age > 14;
  })();

  // 연도 에러
  const yearFieldError =
    birthYear !== '' &&
    (birthYear.length !== 4 || !isYearNumeric || !isAgeValid);

  // 월 에러는 '1~12 범위를 벗어난 경우'만 체크
  const monthFieldError = (() => {
    if (birthMonth === '') return false;
    if (!/^\d{2}$/.test(birthMonth)) return true;

    const month = parseInt(birthMonth, 10);
    return month < 1 || month > 12;
  })();

  // 일 에러는 날짜 조합이 실제 존재하지 않을 때만 체크
  const dayFieldError = (() => {
    if (birthDay === '') return false;
    if (!/^\d{2}$/.test(birthDay)) return true;
    if (!isDayNumeric || birthDay.length !== 2) return false;

    if (!isMonthNumeric || monthNum < 1 || monthNum > 12 || !isYearNumeric) {
      return dayNum < 1 || dayNum > 31;
    }

    const date = new Date(yearNum, monthNum - 1, dayNum);
    return !(
      date.getFullYear() === yearNum &&
      date.getMonth() === monthNum - 1 &&
      date.getDate() === dayNum
    );
  })();

  const isFormValid =
    isNameValid &&
    !yearFieldError &&
    !monthFieldError &&
    !dayFieldError &&
    gender !== null;

  return (
    <div>
      <TitleNavBar title="회원가입" isBackIcon={false} isLoginBtn={false} />

      <div className={styles.container}>
        <h1 className={styles.title}>추가 회원가입 정보</h1>

        {/* 이름 */}
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>이름</h2>
          <TextField
            fieldSize="large"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={setName}
            isError={name !== '' && !isNameValid}
          />
          {!isNameValid && name !== '' && (
            <ShowErrorMessage message={ERROR_MESSAGES.NAME_INVALID} />
          )}
        </div>

        {/* 생년월일 */}
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>생년월일</h2>
          <div className={styles.flexbox}>
            <TextField
              fieldSize="small"
              placeholder="YYYY"
              maxLength={4}
              value={birthYear}
              onChange={setBirthYear}
              isError={birthYear !== '' && yearFieldError}
            />
            <TextField
              fieldSize="small"
              placeholder="MM"
              maxLength={2}
              value={birthMonth}
              onChange={setBirthMonth}
              isError={birthMonth !== '' && monthFieldError}
            />
            <TextField
              fieldSize="small"
              placeholder="DD"
              maxLength={2}
              value={birthDay}
              onChange={setBirthDay}
              isError={birthDay !== '' && dayFieldError}
            />
          </div>

          {/* 단 하나의 에러만 보여줌: 연도 → 월 → 일 우선순위 */}
          {yearFieldError && (
            <ShowErrorMessage message={ERROR_MESSAGES.AGE_INVALID} />
          )}
          {!yearFieldError && monthFieldError && (
            <ShowErrorMessage message={ERROR_MESSAGES.BIRTH_INVALID} />
          )}
          {!yearFieldError && !monthFieldError && dayFieldError && (
            <ShowErrorMessage message={ERROR_MESSAGES.BIRTH_INVALID} />
          )}
        </div>

        {/* 성별 */}
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>성별</h2>
          <div className={styles.flexbox}>
            <LargeFilled
              buttonSize="medium"
              isSelected={gender === 'male'}
              onClick={() => setGender('male')}
            >
              남성
            </LargeFilled>
            <LargeFilled
              buttonSize="medium"
              isSelected={gender === 'female'}
              onClick={() => setGender('female')}
            >
              여성
            </LargeFilled>
            <LargeFilled
              buttonSize="medium"
              isSelected={gender === 'nonbinary'}
              onClick={() => setGender('nonbinary')}
            >
              논바이너리
            </LargeFilled>
          </div>
        </div>
      </div>

      {/* CTA 버튼 */}
      <div className={styles.btnarea}>
        <CtaButton isActive={isFormValid}>회원가입 완료하기</CtaButton>
      </div>
    </div>
  );
};

export default SignupPage;
