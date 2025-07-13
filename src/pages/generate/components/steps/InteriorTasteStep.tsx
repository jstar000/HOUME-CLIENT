// Step 3
import type {
  CompletedInteriorTaste,
  ImageGenerateSteps,
} from '../../types/funnel';

interface InteriorTasteStepProps {
  context: ImageGenerateSteps['InteriorTaste'];
  onNext: (data: CompletedInteriorTaste) => void;
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
