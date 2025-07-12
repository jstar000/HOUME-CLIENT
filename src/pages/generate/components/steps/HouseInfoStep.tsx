// Step 1
import { useHouseInfoStep } from '../../hooks/useHouseInfoStep.hooks';
import * as styles from './HouseInfoStep.css';
import OptionGroup from './optionGroup/OptionGroup';
import {
  type CompletedHouseInfo,
  type HouseType,
  type ImageGenerateSteps,
  type RoomSize,
  type RoomType,
  HOUSE_INFO_OPTIONS,
} from '../../types/funnel';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

interface HouseInfoStepProps {
  context: ImageGenerateSteps['HouseInfo'];
  onNext: (data: CompletedHouseInfo) => void;
}

const HouseInfoStep = ({ context, onNext }: HouseInfoStepProps) => {
  const { formData, setFormData, errors, handleSubmit, areAllFieldsFilled } =
    useHouseInfoStep(context);

  const houseTypeOptions = Object.values(HOUSE_INFO_OPTIONS.HOUSING_TYPES);
  const roomTypeOptions = Object.values(HOUSE_INFO_OPTIONS.ROOM_TYPES);
  const roomSizeOptions = Object.values(HOUSE_INFO_OPTIONS.AREA_TYPES);

  return (
    <div className={styles.container}>
      <OptionGroup
        title="주거 형태"
        options={houseTypeOptions}
        selected={formData.houseType}
        onButtonClick={(value) =>
          setFormData((prev) => ({ ...prev, houseType: value as HouseType }))
        }
        error={errors.houseType}
      />

      <OptionGroup
        title="구조"
        options={roomTypeOptions}
        selected={formData.roomType}
        onButtonClick={(value) =>
          setFormData((prev) => ({ ...prev, roomType: value as RoomType }))
        }
        error={errors.roomType}
      />

      <OptionGroup
        title="평형"
        options={roomSizeOptions}
        selected={formData.roomSize}
        onButtonClick={(value) =>
          setFormData((prev) => ({ ...prev, roomSize: value as RoomSize }))
        }
        error={errors.roomSize}
      />

      <div>
        <CtaButton
          isActive={areAllFieldsFilled}
          onClick={() => handleSubmit(onNext)}
        >
          집구조 선택하기
        </CtaButton>
      </div>
    </div>
  );
};

export default HouseInfoStep;
