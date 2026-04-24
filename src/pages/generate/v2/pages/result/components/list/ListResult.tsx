import type { GenerateImageData } from '@pages/generate/types/generate';

import GeneratedImg from './imgSection/GeneratedImg';
import * as styles from './ListResult.css';

export interface ListResultProps {
  image: GenerateImageData;
  onCurrentImgIdChange?: (imageId: number) => void;
}

const ListResult = ({ image, onCurrentImgIdChange }: ListResultProps) => {
  return (
    <div className={styles.root}>
      <GeneratedImg image={image} onCurrentImgIdChange={onCurrentImgIdChange} />
    </div>
  );
};

export default ListResult;
