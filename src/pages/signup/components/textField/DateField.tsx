import { useState } from 'react';

import * as styles from './DateField.css';
import TextFieldContainer from './TextFieldContainer';
import { padToTwoDigits } from '../../utils/validation';

interface DateValue {
  year: string;
  month: string;
  day: string;
}

interface DateError {
  year?: boolean;
  month?: boolean;
  day?: boolean;
}

interface DateFieldProps {
  value: DateValue;
  onChange: (value: DateValue) => void;
  error?: DateError;
  errorMessage?: string;
}

const onlyNumber = (value: string) => value.replace(/\D/g, '');

const DateField = ({
  value,
  onChange,
  error,
  errorMessage,
}: DateFieldProps) => {
  const [focusedPart, setFocusedPart] = useState<
    'year' | 'month' | 'day' | null
  >(null);

  const isFocused = focusedPart !== null;
  const isFilled = !!(value.year || value.month || value.day);
  const isError = !!(error?.year || error?.month || error?.day);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    const key = name as keyof DateValue;

    const maxLength = key === 'year' ? 4 : 2;
    const sliceValue = onlyNumber(inputValue).slice(0, maxLength);

    onChange({
      ...value,
      [key]: sliceValue,
    });
  };

  const handleMonthBlur = () => {
    setFocusedPart(null);
    const paddedMonth = padToTwoDigits(value.month);
    if (paddedMonth !== value.month) {
      onChange({
        ...value,
        month: paddedMonth,
      });
    }
  };

  const handleDayBlur = () => {
    setFocusedPart(null);
    const paddedDay = padToTwoDigits(value.day);
    if (paddedDay !== value.day) {
      onChange({
        ...value,
        day: paddedDay,
      });
    }
  };

  return (
    <TextFieldContainer
      isFocused={isFocused}
      isFilled={isFilled}
      isError={isError}
      errorMessage={errorMessage}
    >
      <div className={styles.dateRow}>
        <input
          name="year"
          value={value.year}
          onChange={handleChange}
          onFocus={() => setFocusedPart('year')}
          onBlur={() => setFocusedPart(null)}
          placeholder="YYYY"
          inputMode="numeric"
          className={styles.dateInput({ isErrorText: !!error?.year })}
        />
        <span className={styles.divider}>|</span>

        <input
          name="month"
          value={value.month}
          onChange={handleChange}
          onFocus={() => setFocusedPart('month')}
          onBlur={handleMonthBlur}
          placeholder="MM"
          inputMode="numeric"
          className={styles.dateInput({ isErrorText: !!error?.month })}
        />
        <span className={styles.divider}>|</span>

        <input
          name="day"
          value={value.day}
          onChange={handleChange}
          onFocus={() => setFocusedPart('day')}
          onBlur={handleDayBlur}
          placeholder="DD"
          inputMode="numeric"
          className={styles.dateInput({ isErrorText: !!error?.day })}
        />
      </div>
    </TextFieldContainer>
  );
};

export default DateField;
