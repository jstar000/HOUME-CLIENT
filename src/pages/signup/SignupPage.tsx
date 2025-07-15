import { useState, useMemo } from 'react';
import * as styles from './SignupPage.css';
import {
  VALIDATION_RULES,
  isKoreanOnly,
  isMinLength,
  filterKorean,
  isValidYearFormat,
  isValidMonthFormat,
  isValidDayFormat,
  isMinimumAge,
  isValidDate,
} from './utils/validation';
import type { GenderOption } from './types/formOptions';
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
  const [gender, setGender] = useState<GenderOption | null>(null);

  const isNameValid =
    isKoreanOnly(name) && isMinLength(name, VALIDATION_RULES.NAME_MIN_LENGTH);
  const isNameFormatInvalid = name !== '' && !isKoreanOnly(name);
  const isNameLengthInvalid =
    name !== '' &&
    isKoreanOnly(name) &&
    !isMinLength(name, VALIDATION_RULES.NAME_MIN_LENGTH);

  const handleNameChange = (input: string) => {
    const filtered = filterKorean(input);
    setName(filtered);
  };

  const yearNum = Number.parseInt(birthYear, 10);
  const monthNum = Number.parseInt(birthMonth, 10);
  const dayNum = Number.parseInt(birthDay, 10);

  const yearFormatError = birthYear !== '' && !isValidYearFormat(birthYear);

  const yearAgeError = useMemo(() => {
    if (birthYear === '' || yearFormatError) return false;
    return !isMinimumAge(yearNum, monthNum, dayNum, VALIDATION_RULES.MIN_AGE);
  }, [birthYear, yearFormatError, yearNum, monthNum, dayNum]);

  const handleNumericChange =
    (setter: (val: string) => void) => (val: string) => {
      const numeric = val.replace(/\D/g, '');
      setter(numeric);
    };

  const monthFieldError = useMemo(() => {
    if (birthMonth === '') return false;
    return !isValidMonthFormat(birthMonth) || monthNum < 1 || monthNum > 12;
  }, [birthMonth, monthNum]);

  const dayFieldError = useMemo(() => {
    if (birthDay === '') return false;
    if (!isValidDayFormat(birthDay)) return true;
    if (!isValidMonthFormat(birthMonth) || !isValidYearFormat(birthYear)) {
      return dayNum < 1 || dayNum > 31;
    }
    return !isValidDate(yearNum, monthNum, dayNum);
  }, [birthDay, birthMonth, birthYear, dayNum, monthNum, yearNum]);

  const validationResult = useMemo(() => {
    const allFieldsFilled =
      name !== '' &&
      birthYear !== '' &&
      birthMonth !== '' &&
      birthDay !== '' &&
      gender !== null;

    const noErrors =
      isNameValid &&
      !yearFormatError &&
      !yearAgeError &&
      !monthFieldError &&
      !dayFieldError;

    return {
      allFieldsFilled,
      noErrors,
      isFormValid: allFieldsFilled && noErrors,
    };
  }, [
    name,
    birthYear,
    birthMonth,
    birthDay,
    gender,
    isNameValid,
    yearFormatError,
    yearAgeError,
    monthFieldError,
    dayFieldError,
  ]);

  const { isFormValid } = validationResult;

  return (
    <form>
      <TitleNavBar title="회원가입" isBackIcon={false} isLoginBtn={false} />

      <div className={styles.container}>
        <h1 className={styles.title}>추가 회원가입 정보</h1>

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
          {isNameFormatInvalid && (
            <ShowErrorMessage message={ERROR_MESSAGES.NAME_INVALID} />
          )}
          {!isNameFormatInvalid && isNameLengthInvalid && (
            <ShowErrorMessage message={ERROR_MESSAGES.LENGTH_INVALID} />
          )}
        </div>

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
          {(() => {
            if (yearAgeError)
              return <ShowErrorMessage message={ERROR_MESSAGES.AGE_INVALID} />;
            if (yearFormatError || monthFieldError || dayFieldError)
              return (
                <ShowErrorMessage message={ERROR_MESSAGES.BIRTH_INVALID} />
              );
            return null;
          })()}
        </div>

        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>성별</h2>
          <div className={styles.flexbox}>
            <LargeFilled
              buttonSize="medium"
              isSelected={gender?.value === 'male'}
              onClick={() => setGender({ value: 'male', label: '남성' })}
            >
              남성
            </LargeFilled>
            <LargeFilled
              buttonSize="medium"
              isSelected={gender?.value === 'female'}
              onClick={() => setGender({ value: 'female', label: '여성' })}
            >
              여성
            </LargeFilled>
            <LargeFilled
              buttonSize="medium"
              isSelected={gender?.value === 'nonbinary'}
              onClick={() =>
                setGender({ value: 'nonbinary', label: '논바이너리' })
              }
            >
              논바이너리
            </LargeFilled>
          </div>
        </div>
      </div>

      <div className={styles.btnarea}>
        <CtaButton isActive={isFormValid}>회원가입 완료하기</CtaButton>
      </div>
    </form>
  );
};

export default SignupPage;
