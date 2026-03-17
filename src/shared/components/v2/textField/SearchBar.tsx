import { useState } from 'react';

import * as styles from './SearchBar.css';
import BtnIcon from '../iconsRenewal/BtnIcon';
import IconsResponsive from '../iconsRenewal/IconsResponsive';

interface SearchBarProps
  extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  maxLength?: number;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SearchBar = ({
  maxLength,
  value: controlledValue,
  onChange: onControlledChange,
  placeholder = '가구 유형, 브랜드, 키워드로 상품을 검색하세요.',
  id,
  ...props
}: SearchBarProps) => {
  const [value, setValue] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const inputValue = isControlled ? controlledValue : value;

  const isTyping = inputValue !== '' && isFocused;
  const isTyped = inputValue !== '' && !isFocused; // 값 입력, focus가 아닌 경우 true

  // 입력 상태: default -> pressed -> focused -> typing -> typed
  const visualState = isTyped
    ? 'typed'
    : isTyping
      ? 'typing'
      : isFocused
        ? 'focused'
        : isPressed
          ? 'pressed'
          : 'default';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setValue(newValue);
    }
    onControlledChange?.(newValue);
  };

  // onPointer > 마우스, 터치 등 모두 가능
  const handlePointerDown = () => {
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  const handlePointerLeave = () => {
    // 터치 및 클릭 취소
    setIsPressed(false);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={styles.wrapper({ state: visualState })}>
      <div className={styles.leftContainer}>
        <IconsResponsive name="Search" size="20" />

        <input
          id={id}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onBlur={handleBlur}
          className={styles.textField({
            state: visualState,
          })}
          maxLength={maxLength}
          {...props}
        />
      </div>

      <div className={styles.rightContainer}>
        {isTyped && (
          <BtnIcon
            name="CloseFillGray"
            size="S"
            onClick={() => console.log('버튼 클릭')}
          />
        )}
      </div>
    </div>
  );
};
export default SearchBar;
