import * as styles from '../StepCommon.css';
import ShowErrorMessage from '@/shared/components/button/showErrorButton/ShowErrorButton';
import LargeFilled from '@/shared/components/button/largeFilledButton/LargeFilledButton';
import Caption from '@/shared/components/text/Caption';

interface SubOption<T = string> {
  code: T;
  label: string;
}

interface MultiOptionGroupProps<T = string> {
  subtitle: string;
  caption?: string;
  options: SubOption<T>[];
  selected?: T[]; // 다중 선택된 값들의 배열
  onButtonClick: (value: T[]) => void; // 배열을 반환
  maxSelect?: number; // 최대 선택 가능 개수 (예: 3개)
  isAlertPresented?: boolean;
  error?: string;
}

// 다중 선택 전용 컴포넌트
const MultiOptionGroup = <T = string,>({
  subtitle,
  caption,
  options,
  selected = [],
  onButtonClick,
  maxSelect,
  isAlertPresented = false,
  error,
}: MultiOptionGroupProps<T>) => {
  const handleClick = (optionCode: T) => {
    const isAlreadySelected = selected.includes(optionCode);
    let newSelected: T[];

    if (isAlreadySelected) {
      newSelected = selected.filter((item) => item !== optionCode);
    } else {
      if (maxSelect && selected.length >= maxSelect) {
        newSelected = [...selected.slice(1), optionCode];
      } else {
        newSelected = [...selected, optionCode];
      }
    }

    onButtonClick(newSelected);
  };

  return (
    <div className={styles.subOptionGroupWrapper}>
      <div className={styles.subTextBox}>
        <span className={styles.subtitle}>{subtitle}</span>
        <span className={styles.caption}>{caption}</span>
      </div>
      {isAlertPresented && <Caption code={'휴식형'} option={'소파'} />}
      <div className={styles.buttonBox}>
        {options.map((option) => (
          <LargeFilled
            key={String(option.code)}
            isActive={true}
            isSelected={selected.includes(option.code)}
            onClick={() => handleClick(option.code)}
          >
            {option.label}
          </LargeFilled>
        ))}
      </div>
      {error && <ShowErrorMessage message={error} />}
    </div>
  );
};

export default MultiOptionGroup;
