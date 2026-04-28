import { useRef, useState } from 'react';

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
  onRefresh?: () => void;
}

const TextField = ({
  value: controlledValue,
  onChange,
  isError = false,
  errorMessage,
  maxLength,
  onRefresh,
  ...props
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

    inputRef.current?.focus(); // clear 클릭 시 포커스 복구
  };

  return (
    <div className={styles.wrapper}>
      <TextFieldContainer
        isFocused={isFocused}
        isFilled={isFilled}
        isError={isError}
        errorMessage={errorMessage}
      >
        <input
          {...props}
          ref={inputRef}
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
      <div className={styles.refreshBtnContainer}>
        <IconButton
          name="Refresh"
          onClick={(e) => {
            e.preventDefault();
            onRefresh?.();
          }}
        />
      </div>
    </div>
  );
};

export default TextField;
