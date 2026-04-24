import type { GenerateImageData } from '@pages/generate/types/generate';

import * as styles from './CurationResult.css';
import GeneratedImg from './imgSection/GeneratedImg';

export interface CurationResultProps {
  images: GenerateImageData[];
  onCurrentImgIdChange?: (imageId: number) => void;
}

const CurationResult = ({
  images,
  onCurrentImgIdChange,
}: CurationResultProps) => {
  return (
    <div className={styles.root}>
      <GeneratedImg
        images={images}
        onCurrentImgIdChange={onCurrentImgIdChange}
      />
    </div>
  );
};

export default CurationResult;
