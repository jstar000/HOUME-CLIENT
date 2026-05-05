import { useNavigate } from 'react-router-dom';

import * as styles from '@pages/signup/SignupPage.css';

import ActionButton from '@components/v2/button/actionButton/ActionButton';
import Chip from '@components/v2/chip/Chip';
import TitleNavBar from '@components/v2/navBar/TitleNavBar';
import DateField from '@components/v2/userFormField/DateField';
import TextField from '@components/v2/userFormField/TextField';

import { ERROR_MESSAGES } from '@constants/clientErrorMessage';

import useUserForm from '@hooks/useUserForm';

interface UserInfo {
  nickname: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE' | 'NONBINARY';
}

const mockUserInfo: UserInfo = {
  nickname: '집갈래',
  birthday: '2002-12-18',
  gender: 'FEMALE',
};

const ProfileEditPage = () => {
  // const { data: userInfo } = useGetUserInfo();
  //const birthParts = userInfo?.birthday?.split('-') ?? [];

  const navigate = useNavigate();
  const [year, month, day] = mockUserInfo.birthday.split('-');

  const {
    nickname,
    birthYear,
    birthMonth,
    birthDay,
    gender,
    handleNicknameChange,
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
  } = useUserForm({
    nickname: mockUserInfo.nickname,
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    gender: mockUserInfo.gender,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
  };

  const nameErrorMessage = (() => {
    if (isNameFormatInvalid) return ERROR_MESSAGES.NAME_INVALID;
    if (isNameLengthInvalid) return ERROR_MESSAGES.LENGTH_INVALID;
    return '';
  })();

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
    <>
      <TitleNavBar
        title="설정"
        backLabel="이전"
        onBackClick={() => navigate(-1)}
      />
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.fieldbox}>
            <h2 className={styles.fieldtitle}>닉네임</h2>
            <div className={styles.flexbox}>
              <TextField
                value={nickname}
                onChange={handleNicknameChange}
                isError={isNameFormatInvalid || isNameLengthInvalid}
                errorMessage={nameErrorMessage}
                maxLength={18}
              />
            </div>
          </div>

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

          <div className={styles.fieldbox}>
            <h2 className={styles.fieldtitle}>성별</h2>
            <div className={styles.flexbox}>
              <Chip
                selected={gender === 'MALE'}
                color="weak"
                onClick={() => setGender('MALE')}
              >
                남성
              </Chip>
              <Chip
                selected={gender === 'FEMALE'}
                color="weak"
                onClick={() => setGender('FEMALE')}
              >
                여성
              </Chip>
              <Chip
                selected={gender === 'NONBINARY'}
                color="weak"
                onClick={() => setGender('NONBINARY')}
              >
                밝히고 싶지 않음
              </Chip>
            </div>
          </div>
        </div>

        <div className={styles.btnarea}>
          <ActionButton disabled={!isFormValid} type="submit" fullWidth>
            저장하기
          </ActionButton>
        </div>
      </form>
    </>
  );
};

export default ProfileEditPage;
