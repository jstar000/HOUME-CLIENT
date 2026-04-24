import { useState } from 'react';

import IconButton from '@components/v2/button/IconButton';

import * as styles from './TextField.css';
import TextFieldContainer from './TextFieldContainer';

interface TextFieldProps
  extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
  maxLength?: number;
}

const TextField = ({
  value: controlledValue,
  onChange,
  isError = false,
  errorMessage,
  maxLength,
  ...props
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const isFilled = value.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.('');
  };

  return (
    <TextFieldContainer
      isFocused={isFocused}
      isFilled={isFilled}
      isError={isError}
      errorMessage={errorMessage}
    >
      <input
        {...props}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxLength}
        className={styles.input({
          isErrorText: isError,
        })}
      />

      {value ? (
        <IconButton name="CloseFillGray" size="S" onClick={handleClear} />
      ) : null}
    </TextFieldContainer>
  );
};

export default TextField;
