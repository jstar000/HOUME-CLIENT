// Step 2
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
    <div>
      {/* 테스트 코드 */}
      <span>{context.houseType}</span>
      <button
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
      </button>
    </div>
  );
};

export default Step2HouseStructure;
