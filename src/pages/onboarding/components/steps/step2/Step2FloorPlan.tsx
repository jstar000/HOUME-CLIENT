// Step2FloorPlan.tsx (UI만 담당)
import FloorPlan from './FloorPlan';
import * as styles from './Step2FloorPlan.css';
import FunnelHeader from '../../header/FunnelHeader';
import type {
  CompletedFloorPlan,
  ImageGenerateSteps,
} from '../../../types/funnel';
import { useStep2FloorPlan } from '@/pages/onboarding/hooks/useStep2FloorPlan.hooks';
import Loading from '@/shared/components/loading/Loading';

interface Step2FloorPlanProps {
  context: ImageGenerateSteps['FloorPlan'];
  onNext: (data: CompletedFloorPlan) => void;
}

const Step2FloorPlan = ({ context, onNext }: Step2FloorPlanProps) => {
  const {
    floorPlanList,
    isLoading,
    error,
    isError,
    selectedId,
    isMirror,
    selectedImage,
    handleImageSelect,
    handleFlipToggle,
    handleFloorPlanSelection,
  } = useStep2FloorPlan(context, onNext);

  /* 아래 if문들은 임시로 적용했습니다 */
  // 로딩 상태 처리
  if (isLoading) {
    return <Loading text="Floor Plan 데이터를 불러오는 중..." />;
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <div className={styles.container}>
        <div>데이터를 불러오는데 실패했습니다: {error?.message}</div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!floorPlanList || floorPlanList.length === 0) {
    return (
      <div className={styles.container}>
        <FunnelHeader
          title={`유사한 집 구조를 선택해주세요`}
          detail={`템플릿을 선택하면 좌우반전을 할 수 있어요.`}
          currentStep={2}
        />
        <div>사용 가능한 집 구조 템플릿이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <FunnelHeader
        title={`유사한 집 구조를 선택해주세요`}
        detail={`템플릿을 선택하면 좌우반전을 할 수 있어요.`}
        currentStep={2}
      />

      <FloorPlan
        floorPlanList={floorPlanList}
        selectedId={selectedId}
        isMirror={isMirror}
        selectedImage={selectedImage}
        onImageSelect={handleImageSelect}
        onFlipToggle={handleFlipToggle}
        onFloorPlanSelection={handleFloorPlanSelection}
      />
    </div>
  );
};

export default Step2FloorPlan;
