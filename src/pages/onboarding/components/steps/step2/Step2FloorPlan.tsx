// Step2FloorPlan.tsx
import FloorPlan from './FloorPlan';
import * as styles from './Step2FloorPlan.css';
import FunnelHeader from '../../header/FunnelHeader';
import type {
  CompletedFloorPlan,
  ImageGenerateSteps,
} from '../../../types/funnel';

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
  const handleFloorPlanSelection = (houseData: SelectedHouseData) => {
    // 디버깅용
    const payload = {
      houseType: context.houseType,
      roomType: context.roomType,
      roomSize: context.roomSize,
      floorPlan: {
        floorPlanId: houseData.id,
        isMirror: houseData.flipped,
      },
    };

    // 여기서 콘솔에 찍어보기
    console.log('선택된 퍼널 페이로드:', payload);

    onNext({
      houseType: context.houseType,
      roomType: context.roomType,
      roomSize: context.roomSize,
      floorPlan: {
        floorPlanId: houseData.id,
        isMirror: houseData.flipped,
      },
    });
  };

  return (
    <div className={styles.container}>
      <FunnelHeader
        title={`유사한 집 구조를 선택해주세요`}
        detail={`템플릿을 선택하면 좌우반전을 할 수 있어요.`}
        currentStep={2}
      />

      <FloorPlan onFloorPlanSelect={handleFloorPlanSelection} />
    </div>
  );
};

export default Step2FloorPlan;
