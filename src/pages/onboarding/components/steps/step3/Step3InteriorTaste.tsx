// Step 3
import { useState } from 'react';
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
  // 선택된 이미지들의 ID를 순서대로 저장하는 상태
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  // 이미지 선택/해제를 처리하는 함수
  const handleImageSelect = (imageId: number) => {
    setSelectedImages((prev) => {
      const isSelected = prev.includes(imageId);

      if (isSelected) {
        // 이미 선택된 경우: 선택 해제
        return prev.filter((id) => id !== imageId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, imageId];
    });
  };

  const handleNext = () => {
    // 디버깅용
    const payload = {
      houseType: context.houseType,
      roomType: context.roomType,
      roomSize: context.roomSize,
      floorPlan: {
        floorPlanId: context.floorPlan.floorPlanId,
        isMirror: context.floorPlan.isMirror,
      },
      moodBoardIds: selectedImages,
    };

    console.log('선택된 퍼널 페이로드:', payload);

    onNext({
      houseType: context.houseType,
      roomType: context.roomType,
      roomSize: context.roomSize,
      floorPlan: context.floorPlan,
      moodBoardIds: selectedImages,
    });
  };

  // 최소 1개 이상 선택
  const isDataComplete = selectedImages.length > 0;

  return (
    <div className={styles.container}>
      {/* 테스트 코드 */}
      <span>{context.houseType}</span>
      <FunnelHeader
        title={`인테리어 취향을 알려주세요`}
        detail={`인테리어 취향에 맞는 이미지를\n최대 5개까지 선택해주세요.`}
        currentStep={3}
      />

      <MoodBoard
        selectedImages={selectedImages}
        onImageSelect={handleImageSelect}
      />
      <div className={styles.buttonWrapper}>
        <CtaButton isActive={isDataComplete} onClick={handleNext}>
          집구조 선택하기
        </CtaButton>
      </div>
    </div>
  );
};

export default Step3InteriorTaste;
