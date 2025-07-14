import * as styles from '../StepCommon.css';
import Subtitle from '../title/Subtitle';
import ShowErrorMessage from '@/shared/components/button/showErrorButton/ShowErrorButton';
import LargeFilled from '@/shared/components/button/largeFilledButton/LargeFilledButton';
import Caption from '@/shared/components/text/Caption';

interface SubOption<T = string> {
  code: T;
  label: string;
}

interface SubOptionGroupProps<T = string> {
  subtitle: string;
  caption?: string;
  options: SubOption<T>[]; // '오피스텔', '빌라/다세대', '아파트', '그 외' 등
  selected?: T; // 사용자가 선택한 옵션
  onButtonClick: (value: T) => void;
  error?: string;
}

// 제네릭 사용으로 onButtonClick(value)에서 value의 타입을 T로 설정
// -> OptionGroup 호출부에서 value 사용 시 타입 단언(as) 사용 방지
const SubOptionGroup = <T = string,>({
  subtitle,
  caption,
  options,
  selected,
  onButtonClick,
  error,
}: SubOptionGroupProps<T>) => {
  return (
    <div className={styles.subOptionGroupWrapper}>
      <Subtitle subtitle={subtitle} caption={caption} />
      <div className={styles.buttonBox}>
        {options.map((option) => (
          <LargeFilled
            key={String(option.code)}
            isActive={true}
            isSelected={selected === option.code}
            onClick={() => onButtonClick(option.code)}
          >
            {option.label}
          </LargeFilled>
        ))}
      </div>
      {error && <ShowErrorMessage message={error} />}
    </div>
  );
};

export default SubOptionGroup;
