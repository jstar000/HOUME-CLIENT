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

  // 이름: 한글만 허용, 2글자 이상
  const nameRegex = /^[\p{Script=Hangul}]+$/u;
  const isNameValid = nameRegex.test(name) && name.length >= 2;
  const isNameFormatInvalid = name !== '' && !nameRegex.test(name);
  const isNameLengthInvalid =
    name !== '' && nameRegex.test(name) && name.length < 2;

  // 이름 입력 시 한글, 숫자, 특수문자 필터링
  const handleNameChange = (input: string) => {
    const filtered = input.replace(/[A-Za-z\u{1F000}-\u{1FFFF}]/gu, '');
    setName(filtered);
  };

  // 숫자 여부 확인
  const isYearNumeric = /^\d{4}$/.test(birthYear);
  const isMonthNumeric = /^\d{1,2}$/.test(birthMonth);
  const isDayNumeric = /^\d{1,2}$/.test(birthDay);

  // 입력값을 숫자로 변환
  const yearNum = Number.parseInt(birthYear, 10);
  const monthNum = Number.parseInt(birthMonth, 10);
  const dayNum = Number.parseInt(birthDay, 10);

  // 연도 형식 에러: 4자리 숫자가 아니거나 숫자가 아닐 때
  const yearFormatError =
    birthYear !== '' && (birthYear.length !== 4 || !isYearNumeric);

  // 만 14세 이상 체크 (형식 문제 없을 때만)
  const yearAgeError = (() => {
    if (birthYear === '' || yearFormatError) return false;

    const today = new Date();
    const age =
      today.getFullYear() -
      yearNum -
      (today.getMonth() + 1 < monthNum ||
      (today.getMonth() + 1 === monthNum && today.getDate() < dayNum)
        ? 1
        : 0);
    return age < 15;
  })();

  // 숫자만 입력받도록 처리하는 함수
  const handleNumericChange =
    (setter: (val: string) => void) => (val: string) => {
      const numeric = val.replace(/\D/g, '');
      setter(numeric);
    };

  // 월 에러: 형식이 아니거나 범위 벗어남 (단, '00'은 허용)
  const monthFieldError = (() => {
    if (birthMonth === '') return false;
    if (!/^\d{2}$/.test(birthMonth)) return true;
    const month = Number.parseInt(birthMonth, 10);
    if (month === 0) return false;
    return month < 1 || month > 12;
  })();

  // 일 에러: 날짜 조합이 실제 존재하지 않을 때
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

  // 모든 필드가 입력되었는지 확인
  const allFieldsFilled =
    name !== '' &&
    birthYear !== '' &&
    birthMonth !== '' &&
    birthDay !== '' &&
    gender !== null;

  // 모든 에러가 없는지 확인
  const noErrors =
    isNameValid &&
    !yearFormatError &&
    !yearAgeError &&
    !monthFieldError &&
    !dayFieldError;

  // 폼이 유효한지 여부
  const isFormValid = allFieldsFilled && noErrors;

  return (
    <div>
      {/* 상단 네비게이션 바 */}
      <TitleNavBar title="회원가입" isBackIcon={false} isLoginBtn={false} />

      <div className={styles.container}>
        {/* 페이지 타이틀 */}
        <h1 className={styles.title}>추가 회원가입 정보</h1>

        {/* 이름 입력 섹션 */}
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>이름</h2>
          <TextField
            fieldSize="large"
            placeholder="이름을 입력해주세요."
            maxLength={25}
            value={name}
            onChange={handleNameChange}
            isError={isNameFormatInvalid || isNameLengthInvalid}
          />
          {/* 이름 형식 에러 메시지 */}
          {isNameFormatInvalid && (
            <ShowErrorMessage message={ERROR_MESSAGES.NAME_INVALID} />
          )}
          {/* 이름 길이 에러 메시지 */}
          {!isNameFormatInvalid && isNameLengthInvalid && (
            <ShowErrorMessage message={ERROR_MESSAGES.LENGTH_INVALID} />
          )}
        </div>

        {/* 생년월일 입력 섹션 */}
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>생년월일</h2>
          <div className={styles.flexbox}>
            <TextField
              fieldSize="small"
              placeholder="YYYY"
              maxLength={4}
              value={birthYear}
              onChange={handleNumericChange(setBirthYear)}
              isError={birthYear !== '' && (yearFormatError || yearAgeError)}
              inputMode="numeric"
            />
            <TextField
              fieldSize="small"
              placeholder="MM"
              maxLength={2}
              value={birthMonth}
              onChange={handleNumericChange(setBirthMonth)}
              isError={birthMonth !== '' && monthFieldError}
              inputMode="numeric"
            />
            <TextField
              fieldSize="small"
              placeholder="DD"
              maxLength={2}
              value={birthDay}
              onChange={handleNumericChange(setBirthDay)}
              isError={birthDay !== '' && dayFieldError}
              inputMode="numeric"
            />
          </div>

          {/* 생년월일 관련 에러 메시지: 우선순위에 따라 하나만 출력 */}
          {(() => {
            if (yearAgeError)
              return <ShowErrorMessage message={ERROR_MESSAGES.AGE_INVALID} />;
            if (yearFormatError || monthFieldError || dayFieldError) {
              return (
                <ShowErrorMessage message={ERROR_MESSAGES.BIRTH_INVALID} />
              );
            }
            return null;
          })()}
        </div>

        {/* 성별 선택 섹션 */}
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

      {/* 회원가입 완료 CTA 버튼 */}
      <div className={styles.btnarea}>
        <CtaButton isActive={isFormValid}>회원가입 완료하기</CtaButton>
      </div>
    </div>
  );
};

export default SignupPage;
