// Step 4
import * as common from '../StepCommon.css';
import * as styles from './Step4MainActivity.css';
import FunnelHeader from '../../header/FunnelHeader';
import {
  MAIN_ACTIVITY_OPTIONS,
  type BedType,
  type ImageGenerateSteps,
  type OtherFurnitures,
  type PrimaryUsage,
} from '../../../types/funnel';
import OptionGroup from '../optionGroup/OptionGroup';
import { CtaButton } from '@/shared/components/button/ctaButton/CtaButton.css';

interface Step4MainActivityProps {
  context: ImageGenerateSteps['MainActivity'];
}

const Step4MainActivity = ({ context }: Step4MainActivityProps) => {
  const primaryUsageOptions = Object.values(
    MAIN_ACTIVITY_OPTIONS.PRIMARY_USAGE
  );
  const bedTypeOptions = Object.values(MAIN_ACTIVITY_OPTIONS.BED_TYPE);
  const otherFurnituresOptions = Object.values(
    MAIN_ACTIVITY_OPTIONS.OTHER_FURNITURES
  );

  return (
    <div className={common.container}>
      <FunnelHeader
        title={`마지막 단계예요!`}
        detail={`집에서 주로 하는 활동과\n현재 갖고 있는 가구에 대해 알려주세요`}
      />

      <div className={common.wrapper}>
        <OptionGroup<PrimaryUsage>
          title="주요 활동"
          options={primaryUsageOptions}
          selected={formData.primaryUsage}
          onButtonClick={(value) =>
            setFormData((prev) => ({ ...prev, primaryUsage: value }))
          }
          error={errors.primaryUsage}
        />

        <OptionGroup<BedType>
          title="주요 활동"
          options={bedTypeOptions}
          selected={formData.bedType}
          onButtonClick={(value) =>
            setFormData((prev) => ({ ...prev, bedType: value }))
          }
          error={errors.bedType}
        />

        <OptionGroup<OtherFurnitures>
          title="주요 활동"
          options={otherFurnituresOptions}
          selected={formData.otherFurnitures}
          onButtonClick={(value) =>
            setFormData((prev) => ({ ...prev, otherFurnitures: value }))
          }
          error={errors.otherFurnitures}
        />

        <div>
          <CtaButton isActive={areAllFieldsFilled}>이미지 생성하기</CtaButton>
        </div>
      </div>
    </div>
  );
};

export default Step4MainActivity;
