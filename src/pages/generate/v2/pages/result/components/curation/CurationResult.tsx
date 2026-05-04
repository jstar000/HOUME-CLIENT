import { useState } from 'react';

import CurationSection from '@pages/generate/pages/result/curationSection/CurationSection';
import type { GenerateImageData } from '@pages/generate/types/generate';

import * as styles from './CurationResult.css';
import ImgFeedback from './feedbackSection/ImgFeedback';
import GeneratedImg from './imgSection/GeneratedImg';

export interface CurationResultProps {
  images: GenerateImageData[];
  onCurrentImgIdChange?: (imageId: number) => void;
  groupId?: number | null;
}

const CurationResult = ({
  images,
  onCurrentImgIdChange,
  groupId = null,
}: CurationResultProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  /** 잠금 프리뷰 슬라이드(activeIndex === images.length) */
  const isLockedSlide = images.length > 0 && slideIndex === images.length;
  const lastImageId = images[images.length - 1]?.imageId;

  return (
    <div className={styles.root}>
      <GeneratedImg
        images={images}
        onCurrentImgIdChange={onCurrentImgIdChange}
        onSlideChange={setSlideIndex}
      />

      <div className={styles.mainArea}>
        {!isLockedSlide && (
          <section
            className={styles.bottomSection}
            aria-label="이 공간의 가구 큐레이션"
          >
            <CurationSection groupId={groupId} />
          </section>
        )}
        {isLockedSlide && lastImageId !== undefined && (
          <section
            className={styles.bottomSection}
            aria-label="생성 이미지 선호도 조사"
          >
            <ImgFeedback imageId={lastImageId} />
          </section>
        )}
      </div>
    </div>
  );
};

export default CurationResult;
