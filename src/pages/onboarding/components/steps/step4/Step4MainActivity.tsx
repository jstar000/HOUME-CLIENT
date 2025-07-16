// Step 4
import * as common from '../StepCommon.css';
import FunnelHeader from '../../header/FunnelHeader';
import {
  MAIN_ACTIVITY_OPTIONS,
  type ImageGenerateSteps,
  type PrimaryUsage,
} from '../../../types/funnel';
import OptionGroup from '../optionGroup/OptionGroup';
import MainTitle from '../title/Maintitle';
import SubOptionGroup from '../optionGroup/SubOptionGroup';
import MultiOptionGroup from '../optionGroup/MultiOptionGroup';
import { useStep4MainActivity } from '@/pages/onboarding/hooks/useStep4MainActivity.hooks';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

interface Step4MainActivityProps {
  context: ImageGenerateSteps['MainActivity'];
}

const Step4MainActivity = ({ context }: Step4MainActivityProps) => {
  const {
    formData,
    setFormData,
    // errors,
    isFormCompleted,
    isRequiredFurniture,
    getCurrentActivityLabel,
    getRequiredFurnitureLabels,
    handleOnClick,
  } = useStep4MainActivity(context);

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
        detail={`집에서 주로 하는 활동과\n현재 갖고 있는 가구에 대해 알려주세요.`}
        currentStep={4}
      />

      <div className={common.wrapper}>
        <OptionGroup<PrimaryUsage>
          title="주요 활동"
          body="선택한 활동에 최적화된 동선을 알려드려요."
          options={primaryUsageOptions}
          selected={formData.primaryUsage}
          onButtonClick={(value) =>
            setFormData((prev) => ({ ...prev, primaryUsage: value }))
          }
          // error={errors.primaryUsage}
        />

        <div className={common.subWrapper}>
          <MainTitle title="가구" body="선택한 가구가 이미지에 반영돼요." />

          <SubOptionGroup<string>
            subtitle="침대"
            options={bedTypeOptions}
            selected={formData.bedTypeId}
            onButtonClick={(value) =>
              setFormData((prev) => ({ ...prev, bedTypeId: value as number }))
            }
            useId={true}
            // error={errors.bedType}
          />

          <MultiOptionGroup<string>
            subtitle="기타 가구"
            caption="(최대 4개 선택)"
            options={otherFurnituresOptions}
            selected={formData.otherFurnitureIds}
            onButtonClick={(value) =>
              setFormData((prev) => ({
                ...prev,
                otherFurnitureIds: value as number[],
              }))
            }
            maxSelect={4}
            isAlertPresented={true}
            // error={errors.otherFurnitures}
            isRequiredFurniture={isRequiredFurniture}
            currentActivityLabel={getCurrentActivityLabel()} // 추가!
            requiredFurnitureLabels={getRequiredFurnitureLabels()} // 추가!
            useId={true}
          />
        </div>

        <div>
          <CtaButton isActive={isFormCompleted} onClick={handleOnClick}>
            이미지 생성하기
          </CtaButton>
        </div>
      </div>
    </div>
  );
};

export default Step4MainActivity;
