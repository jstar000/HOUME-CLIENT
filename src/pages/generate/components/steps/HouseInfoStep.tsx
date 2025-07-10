// Step 1
import { useHouseInfoStep } from '../../hooks/useHouseInfoStep.hooks';
import { HOUSE_INFO_OPTIONS } from '../../types/funnel.types';
import * as styles from './HouseInfoStep.css';
import type { ImgGenerateSteps } from '../../types/funnel.types';
import LargeFilled from '@/shared/components/button/largeFilledButton/LargeFilledButton';

interface HouseInfoStepProps {
  context: ImgGenerateSteps['HouseInfo'];
  onNext: (data: Required<ImgGenerateSteps['HouseInfo']>) => void;
}

const HouseInfoStep = ({ context, onNext }: HouseInfoStepProps) => {
  const { formData, setFormData, errors, handleSubmit, isValid } =
    useHouseInfoStep(context);

  const houseTypeOptions = Object.values(HOUSE_INFO_OPTIONS.HOUSING_TYPES);
  const roomTypeOptions = Object.values(HOUSE_INFO_OPTIONS.ROOM_TYPES);
  const roomSizeOptions = Object.values(HOUSE_INFO_OPTIONS.AREA_TYPES);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.title}>주거 형태</span>
        <div className={styles.buttonBox}>
          {houseTypeOptions.map((option) => (
            <LargeFilled
              key={option.value}
              isActive={true}
              isSelected={formData.houseType === option.value}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  houseType: option.value,
                }))
              }
            >
              {option.label}
            </LargeFilled>
          ))}
        </div>
      </div>

      <div className={styles.wrapper}>
        <span className={styles.title}>구조</span>
        <div className={styles.buttonBox}>
          {roomTypeOptions.map((option) => (
            <LargeFilled
              key={option.value}
              isActive={true}
              isSelected={formData.roomType === option.value}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  roomType: option.value,
                }))
              }
            >
              {option.label}
            </LargeFilled>
          ))}
        </div>
      </div>

      <div className={styles.wrapper}>
        <span className={styles.title}>평형</span>
        <div className={styles.buttonBox}>
          {roomSizeOptions.map((option) => (
            <LargeFilled
              key={option.value}
              isActive={true}
              isSelected={formData.roomSize === option.value}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  roomSize: option.value,
                }))
              }
            >
              {option.label}
            </LargeFilled>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseInfoStep;
