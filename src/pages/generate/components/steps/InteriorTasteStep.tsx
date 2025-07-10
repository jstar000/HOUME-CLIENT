// Step 3
import type { ImgGenerateSteps } from '../../types/funnel.types';

interface InteriorTasteStepProps {
  context: ImgGenerateSteps['InteriorTaste'];
  onNext: (data: Required<ImgGenerateSteps['InteriorTaste']>) => void;
}

const InteriorTasteStep = ({ context, onNext }: InteriorTasteStepProps) => {
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
            selectedInteriorTaste: [1, 2, 3, 4],
          })
        }
      >
        다음 단계
      </button>
    </div>
  );
};

export default InteriorTasteStep;
