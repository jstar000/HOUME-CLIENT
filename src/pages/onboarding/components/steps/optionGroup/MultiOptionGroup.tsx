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
  options: SubOption<T>[]; // 선택 가능한 모든 버튼 배열
  selected?: T[]; // 현재 선택된 항목들의 코드 배열
  onButtonClick: (value: T[]) => void;
  maxSelect?: number;
  isAlertPresented?: boolean;
  error?: string;
  isRequiredFurniture?: (furniture: T) => boolean; // 특정 가구가 필수인지 판단
  currentActivityLabel?: string; // <Caption>의 활동명
  requiredFurnitureLabels?: string[]; // <Caption>의 필수 가구명
}

const MultiOptionGroup = <T = string,>({
  subtitle,
  caption,
  options,
  selected = [],
  onButtonClick,
  maxSelect,
  isAlertPresented = false,
  error,
  isRequiredFurniture,
  currentActivityLabel,
  requiredFurnitureLabels = [],
}: MultiOptionGroupProps<T>) => {
  const handleClick = (optionCode: T) => {
    // 필수 가구인 경우 클릭 무시
    if (isRequiredFurniture && isRequiredFurniture(optionCode)) {
      return;
    }

    const isAlreadySelected = selected.includes(optionCode);
    let newSelected: T[];

    if (isAlreadySelected) {
      newSelected = selected.filter((item) => item !== optionCode); // 선택 해제
    } else {
      newSelected = [...selected, optionCode];
      // maxSelect 도달 시 버튼 disable -> 선택이 아예 불가 -> maxSelect 체크 로직 필요 X
    }

    onButtonClick(newSelected);
  };

  // maxSelect에 도달했는지 확인
  const hasReachedMax = maxSelect ? selected.length >= maxSelect : false;

  return (
    <div className={styles.subOptionGroupWrapper}>
      <div className={styles.subTextBox}>
        <span className={styles.subtitle}>{subtitle}</span>
        <span className={styles.caption}>{caption}</span>
      </div>

      {isAlertPresented &&
        currentActivityLabel &&
        requiredFurnitureLabels.length > 0 && (
          <Caption
            code={currentActivityLabel}
            option={requiredFurnitureLabels.join(', ')}
          />
        )}

      <div className={styles.buttonBox}>
        {options.map((option) => {
          const isRequired = isRequiredFurniture
            ? isRequiredFurniture(option.code)
            : false;
          const isSelected = selected.includes(option.code);

          const isActive = isRequired
            ? false // 필수 가구는 무조건 비활성화
            : isSelected || !hasReachedMax; // 필수가 아닌 경우만 기존 로직 적용

          return (
            <LargeFilled
              key={String(option.code)}
              isActive={isActive}
              isSelected={isRequired ? false : isSelected}
              onClick={() => handleClick(option.code)}
            >
              {option.label}
            </LargeFilled>
          );
        })}
      </div>
      {error && <ShowErrorMessage message={error} />}
    </div>
  );
};

export default MultiOptionGroup;
