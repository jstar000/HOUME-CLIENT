// Step 2
import FloorPlan from './FloorPlan';
import * as styles from './Step2HouseStructure.css';
import FunnelHeader from '../../header/FunnelHeader';
import type {
  CompletedHouseStructure,
  ImageGenerateSteps,
} from '../../../types/funnel';

interface Step2HouseStructureProps {
  context: ImageGenerateSteps['HouseStructure'];
  onNext: (data: CompletedHouseStructure) => void;
}

const Step2HouseStructure = ({ context, onNext }: Step2HouseStructureProps) => {
  return (
    <div className={styles.container}>
      <FunnelHeader
        title={`유사한 집 구조를 선택해주세요`}
        detail={`템플릿을 선택하면 좌우반전을 할 수 있어요.`}
        currentStep={2}
      />
      {/* 테스트 코드 */}
      {/* <span>{context.houseType}</span> */}
      <FloorPlan />
      {/* <button
        type="button"
        onClick={() =>
          onNext({
            houseType: 'office',
            roomType: 'openOne',
            roomSize: 'sixToTen',
            selectedHouseStructure: [1, 2, 3],
          })
        }
      >
        다음 단계
      </button> */}
    </div>
  );
};

export default Step2HouseStructure;
