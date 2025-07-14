// Step2FloorPlan.tsx
import { useState } from 'react';
import FloorPlan from './FloorPlan';
import * as styles from './Step2FloorPlan.css';
import FunnelHeader from '../../header/FunnelHeader';
import type {
  CompletedFloorPlan,
  ImageGenerateSteps,
} from '../../../types/funnel';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

interface Step2FloorPlanProps {
  context: ImageGenerateSteps['FloorPlan'];
  onNext: (data: CompletedFloorPlan) => void;
}

interface SelectedHouseData {
  id: number;
  src: string;
  flipped: boolean;
}

const Step2FloorPlan = ({ context, onNext }: Step2FloorPlanProps) => {
  const [selectedHouseData, setSelectedHouseData] =
    useState<SelectedHouseData | null>(null);

  const handleHouseSelection = (houseData: SelectedHouseData) => {
    setSelectedHouseData(houseData);
  };

  const handleNext = () => {
    if (selectedHouseData) {
      onNext({
        houseType: context.houseType,
        roomType: context.roomType,
        roomSize: context.roomSize,
        floorPlan: {
          floorPlanId: selectedHouseData.id,
          isMirror: selectedHouseData.flipped,
        },
      });
    }
  };

  const isDataComplete = selectedHouseData !== null;

  return (
    <div className={styles.container}>
      <FunnelHeader
        title={`유사한 집 구조를 선택해주세요`}
        detail={`템플릿을 선택하면 좌우반전을 할 수 있어요.`}
        currentStep={2}
      />

      <FloorPlan onHouseSelect={handleHouseSelection} />

      {/* <div className={styles.buttonWrapper}>
        <CtaButton isActive={isDataComplete} onClick={handleNext}>
          다음
        </CtaButton>
      </div> */}
    </div>
  );
};

export default Step2FloorPlan;
