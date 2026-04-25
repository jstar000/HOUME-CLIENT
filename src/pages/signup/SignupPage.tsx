import { useEffect, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import ActionButton from '@components/v2/button/actionButton/ActionButton';
import IconButton from '@components/v2/button/IconButton';
import Chip from '@components/v2/chip/Chip';
import Icon from '@components/v2/icon/Icon';

import { ERROR_MESSAGES } from '@constants/clientErrorMessage';

import { usePostSignupMutation } from './apis/mutations/usePostSignupMutation';
import DateField from './components/textField/DateField';
import TextField from './components/textField/TextField';
import useSignupForm from './hooks/useSignupForm';
import * as styles from './SignupPage.css';
import {
  logSignupFormClickBtnCTA,
  logSignupFormViewError,
} from './utils/analytics';

interface SignupLocationState {
  signupToken?: string | null;
}

// Type Guard: SignupLocationState 검증
const isSignupLocationState = (
  value: unknown
): value is SignupLocationState => {
  if (!value || typeof value !== 'object') return false;

  const state = value as Record<string, unknown>;
  if (!('signupToken' in state)) return false;

  const signupToken = state.signupToken;
  return signupToken == null || typeof signupToken === 'string';
};

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeSignupToken = isSignupLocationState(location.state)
    ? (location.state.signupToken ?? null)
    : null;
  const signupToken = routeSignupToken ?? sessionStorage.getItem('signupToken');

  useEffect(() => {
    if (routeSignupToken) {
      sessionStorage.setItem('signupToken', routeSignupToken);
    }
  }, [routeSignupToken]);

  useEffect(() => {
    if (!signupToken) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [signupToken, navigate]);

  const {
    name,
    birthYear,
    birthMonth,
    birthDay,
    gender,
    handleNameChange,
    handleBirthYearChange,
    handleBirthMonthChange,
    handleBirthDayChange,
    setGender,
    isNameFormatInvalid,
    isNameLengthInvalid,
    yearFormatError,
    yearAgeError,
    monthFieldError,
    dayFieldError,
    isFormValid,
    hasError,
  } = useSignupForm();

  const { mutate: signUp } = usePostSignupMutation();

  const errorSentRef = useRef(false);

  // 에러가 표시될 때 이벤트 전송 (최초 1회)
  useEffect(() => {
    if (hasError && !errorSentRef.current) {
      logSignupFormViewError();
      errorSentRef.current = true;
    } else if (!hasError) {
      // 에러가 사라지면 ref 초기화 (다시 에러가 발생하면 이벤트 전송)
      errorSentRef.current = false;
    }
  }, [hasError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // CTA 버튼 클릭 시 GA 이벤트 전송
    logSignupFormClickBtnCTA();

    if (!isFormValid || !gender || !signupToken) return;

    const formattedBirthday = `${birthYear}-${birthMonth}-${birthDay}`;

    // console.log(name, gender.value, formattedBirthday);

    signUp({
      signupToken,
      name,
      gender: gender.value,
      birthday: formattedBirthday,
    });
  };

  if (!signupToken) return null;

  // 닉네임 필드 유효
  const isNameSectionValid =
    name !== '' && !isNameFormatInvalid && !isNameLengthInvalid;

  // 생년월일 필드 유효
  const isBirthSectionValid =
    birthYear !== '' &&
    birthMonth !== '' &&
    birthDay !== '' &&
    !yearFormatError &&
    !yearAgeError &&
    !monthFieldError &&
    !dayFieldError;

  // 닉네임 에러 메시지
  const nameErrorMessage = (() => {
    if (isNameFormatInvalid) return ERROR_MESSAGES.NAME_INVALID;
    if (isNameLengthInvalid) return ERROR_MESSAGES.LENGTH_INVALID;
    return '';
  })();

  // 생년월일 에러 메시지
  const birthErrorMessage = (() => {
    if (yearAgeError) return ERROR_MESSAGES.AGE_INVALID;
    if (yearFormatError || monthFieldError || dayFieldError)
      return ERROR_MESSAGES.BIRTH_INVALID;
    return '';
  })();

  const dateErrorStatus = {
    year: birthYear !== '' && (yearFormatError || yearAgeError),
    month: birthMonth !== '' && monthFieldError,
    day: birthDay !== '' && dayFieldError,
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon name="StepDefault" size="12" />
          <Icon name="StepActive" size="12" />
        </div>
        <h1 className={styles.title}>완료까지 한 걸음 남았어요!</h1>
      </header>

      <div className={styles.container}>
        {/* 닉네임 입력 */}
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>닉네임</h2>
          <div className={styles.flexbox}>
            <TextField
              value={name}
              onChange={handleNameChange}
              placeholder="플레이스홀더"
              isError={isNameFormatInvalid || isNameLengthInvalid}
              errorMessage={nameErrorMessage}
              maxLength={18}
            />
            <div className={styles.refreshBtnContainer}>
              <IconButton name="Refresh" onClick={() => handleNameChange('')} />
            </div>
          </div>
        </div>

        {/* 생년월일 입력 */}
        {isNameSectionValid && (
          <div className={styles.fieldbox}>
            <h2 className={styles.fieldtitle}>생년월일</h2>
            <div className={styles.flexbox}>
              <DateField
                value={{ year: birthYear, month: birthMonth, day: birthDay }}
                onChange={(value) => {
                  handleBirthYearChange(value.year);
                  handleBirthMonthChange(value.month);
                  handleBirthDayChange(value.day);
                }}
                error={dateErrorStatus}
                errorMessage={birthErrorMessage}
              />
            </div>
          </div>
        )}

        {/* 성별 선택 */}
        {isNameSectionValid && isBirthSectionValid && (
          <div className={styles.fieldbox}>
            <h2 className={styles.fieldtitle}>성별</h2>
            <div className={styles.flexbox}>
              <Chip
                selected={gender?.value === 'MALE'}
                className={gender?.value === 'MALE' ? styles.chipSelected : ''}
                color="weak"
                onClick={() => setGender({ value: 'MALE', label: '남성' })}
              >
                남성
              </Chip>
              <Chip
                selected={gender?.value === 'FEMALE'}
                className={
                  gender?.value === 'FEMALE' ? styles.chipSelected : ''
                }
                color="weak"
                onClick={() => setGender({ value: 'FEMALE', label: '여성' })}
              >
                여성
              </Chip>
              <Chip
                selected={gender?.value === 'NONBINARY'}
                className={
                  gender?.value === 'NONBINARY' ? styles.chipSelected : ''
                }
                color="weak"
                onClick={() =>
                  setGender({ value: 'NONBINARY', label: '밝히고 싶지 않음' })
                }
              >
                밝히고 싶지 않음
              </Chip>
            </div>
          </div>
        )}
      </div>

      <div className={styles.btnarea}>
        <ActionButton
          disabled={!isFormValid || !signupToken}
          type="submit"
          fullWidth
        >
          이미지 생성 시작하기
        </ActionButton>
      </div>
    </form>
  );
};

export default SignupPage;
