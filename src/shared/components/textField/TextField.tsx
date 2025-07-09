import { useState } from 'react';
import * as styles from './TextField.css';

interface TextFieldProps extends React.ComponentProps<'input'> {
  isError?: boolean;
  fieldSize?: 'thin' | 'small' | 'large';
  maxLength?: number;
}

const TextField = ({
  isError = false,
  fieldSize = 'small',
  maxLength,
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = value !== '' && !isFocused;

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={styles.textField({
        state: isError ? 'error' : isFilled ? 'filled' : 'default',
        fieldSize,
      })}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default TextField;
