// Step2FloorPlan.tsx (UI만 담당)
import FloorPlan from './FloorPlan';
import * as styles from './Step2FloorPlan.css';
import FunnelHeader from '../../header/FunnelHeader';
import type {
  CompletedFloorPlan,
  ImageGenerateSteps,
} from '../../../types/funnel';
import { useStep2FloorPlan } from '@/pages/onboarding/hooks/useStep2FloorPlan.hooks';

interface Step2FloorPlanProps {
  context: ImageGenerateSteps['FloorPlan'];
  onNext: (data: CompletedFloorPlan) => void;
}

const Step2FloorPlan = ({ context, onNext }: Step2FloorPlanProps) => {
  const { handleFloorPlanSelection } = useStep2FloorPlan(context, onNext);

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
