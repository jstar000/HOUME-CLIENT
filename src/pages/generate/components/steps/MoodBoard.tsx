import { useState } from 'react';
import * as styles from './MoodBoard.css';
import { mockimages } from './mockimages';
import CardImage from '@/shared/components/card/cardImage/CardImage';

const MoodBoard = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  return (
    <div className={styles.container}>
      <div className={styles.gridbox}>
        {mockimages.map((image, index) => (
          <CardImage key={image.id} src={image.img} selectOrder={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default MoodBoard;
