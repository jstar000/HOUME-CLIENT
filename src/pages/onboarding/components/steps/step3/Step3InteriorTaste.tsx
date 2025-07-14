// Step 3
import MoodBoard from './MoodBoard';
import * as styles from './Step3InteriorTaste.css';
import FunnelHeader from '../../header/FunnelHeader';
import type {
  CompletedInteriorTaste,
  ImageGenerateSteps,
} from '../../../types/funnel';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

interface Step3InteriorTasteProps {
  context: ImageGenerateSteps['InteriorTaste'];
  onNext: (data: CompletedInteriorTaste) => void;
}

const Step3InteriorTaste = ({ context, onNext }: Step3InteriorTasteProps) => {
  return (
    <div className={styles.container}>
      {/* 테스트 코드 */}
      <span>{context.houseType}</span>
      <FunnelHeader
        title={`인테리어 취향을 알려주세요`}
        detail={`인테리어 취향에 맞는 이미지를\n최대 5개까지 선택해주세요.`}
        currentStep={3}
      />
      <MoodBoard />
      <div className={styles.buttonWrapper}>
        <CtaButton
          isActive={true}
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
          집구조 선택하기
        </CtaButton>
      </div>
    </div>
  );
};

export default Step3InteriorTaste;
