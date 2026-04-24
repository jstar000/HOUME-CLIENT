import { useEffect } from 'react';

import type { GenerateImageData } from '@pages/generate/types/generate';

import * as styles from './GeneratedImg.css';

export interface GeneratedImgListProps {
  /** 단일 생성 이미지 */
  image: GenerateImageData;
  onCurrentImgIdChange?: (currentImgId: number) => void;
}

/**
 * v2 리스트 결과 — 단일 이미지 (DetectionHotspots 없이 표시만)
 */
const GeneratedImg = ({
  image,
  onCurrentImgIdChange,
}: GeneratedImgListProps) => {
  const imageId = image.imageId ?? 0;

  useEffect(() => {
    if (imageId > 0) {
      onCurrentImgIdChange?.(imageId);
    }
  }, [imageId, onCurrentImgIdChange]);

  return (
    <div className={styles.container}>
      <div className={styles.listImageFrame}>
        <img
          src={image.imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className={styles.imgArea({ mirrored: image.isMirror })}
        />
      </div>
    </div>
  );
};

export default GeneratedImg;
