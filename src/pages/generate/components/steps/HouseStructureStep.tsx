// Step 2
import type { ImgGenerateSteps } from '../../types/funnel.types';

interface HouseStructureStepProps {
  context: ImgGenerateSteps['HouseStructure'];
  onNext: (data: Required<ImgGenerateSteps['HouseStructure']>) => void;
}

const HouseStructureStep = ({ context, onNext }: HouseStructureStepProps) => {
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

export default HouseStructureStep;
