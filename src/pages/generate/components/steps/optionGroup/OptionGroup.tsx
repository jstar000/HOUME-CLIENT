import * as styles from '../HouseInfoStep.css';
import ShowErrorMessage from '@/shared/components/button/showErrorButton/ShowErrorButton';
import LargeFilled from '@/shared/components/button/largeFilledButton/LargeFilledButton';

interface Option {
  value: string;
  label: string;
}

interface OptionGroupProps {
  title: string;
  options: Option[];
  selected?: string;
  onButtonClick: (value: string) => void;
  error?: string;
}

const OptionGroup = ({
  title,
  options,
  selected,
  onButtonClick,
  error,
}: OptionGroupProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <div className={styles.buttonBox}>
        {options.map((option) => (
          <LargeFilled
            key={option.value}
            isActive={true}
            isSelected={selected === option.value}
            onClick={() => onButtonClick(option.value)}
          >
            {option.label}
          </LargeFilled>
        ))}
      </div>
      {error && <ShowErrorMessage message={error} />}
    </div>
  );
};

export default OptionGroup;
