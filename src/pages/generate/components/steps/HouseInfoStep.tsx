// Step 1
import type { ImgGenerateSteps } from '../../types/funnel.types';

interface HouseInfoStepProps {
  context: ImgGenerateSteps['HouseInfo'];
  onNext: (data: Required<ImgGenerateSteps['HouseInfo']>) => void;
}

const HouseInfoStep = ({ context, onNext }: HouseInfoStepProps) => {
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
          })
        }
      >
        다음 단계
      </button>
    </div>
  );
};

export default HouseInfoStep;
