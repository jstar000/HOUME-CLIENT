// Step 1
import { useHouseInfoStep } from '../../hooks/useHouseInfoStep.hooks';
import { HOUSE_INFO_OPTIONS } from '../../types/funnel.types';
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
    <div>
      <h2>집 정보 선택</h2>

      <button
        type="button"
        onClick={() => handleSubmit(onNext)}
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? '#007bff' : '#ccc',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
      >
        다음 단계
      </button>
    </div>
  );
};

export default HouseInfoStep;
