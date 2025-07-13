// Step 1
import * as styles from '../StepCommon.css';
import OptionGroup from '../optionGroup/OptionGroup';
import {
  type CompletedHouseInfo,
  type HouseType,
  type ImageGenerateSteps,
  type RoomSize,
  type RoomType,
  HOUSE_INFO_OPTIONS,
} from '../../../types/funnel';
import FunnelHeader from '../../header/FunnelHeader';
import { useStep1HouseInfo } from '@/pages/onboarding/hooks/useStep1HouseInfo.hooks';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

interface Step1HouseInfoProps {
  context: ImageGenerateSteps['HouseInfo'];
  onNext: (data: CompletedHouseInfo) => void;
}

const Step1HouseInfo = ({ context, onNext }: Step1HouseInfoProps) => {
  const { formData, setFormData, errors, handleSubmit, areAllFieldsFilled } =
    useStep1HouseInfo(context);

  const houseTypeOptions = Object.values(HOUSE_INFO_OPTIONS.HOUSING_TYPES);
  const roomTypeOptions = Object.values(HOUSE_INFO_OPTIONS.ROOM_TYPES);
  const roomSizeOptions = Object.values(HOUSE_INFO_OPTIONS.AREA_TYPES);

  return (
    <div className={styles.container}>
      <FunnelHeader
        title={`집 구조에 대해 알려주세요`}
        detail={`하우미가 더 정밀하게 스타일링을 제안할 수 있도록\n주거 형태와 평형, 도면 구조를 알려주세요.`}
      />

      <div className={styles.wrapper}>
        <OptionGroup<HouseType>
          title="주거 형태"
          options={houseTypeOptions}
          selected={formData.houseType}
          onButtonClick={(value) =>
            setFormData((prev) => ({ ...prev, houseType: value }))
          }
          error={errors.houseType}
        />

        <OptionGroup<RoomType>
          title="구조"
          options={roomTypeOptions}
          selected={formData.roomType}
          onButtonClick={(value) =>
            setFormData((prev) => ({ ...prev, roomType: value }))
          }
          error={errors.roomType}
        />

        <OptionGroup<RoomSize>
          title="평형"
          options={roomSizeOptions}
          selected={formData.roomSize}
          onButtonClick={(value) =>
            setFormData((prev) => ({ ...prev, roomSize: value }))
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
    </div>
  );
};

export default Step1HouseInfo;
