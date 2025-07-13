import { useState } from 'react';
import * as styles from './MoodBoard.css';
import CardImage from '@/shared/components/card/cardImage/CardImage';
import Example from '@/shared/assets/images/example.png';

const MoodBoard = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  return (
    <div className={styles.container}>
      <div className={styles.gridbox}>
        <CardImage src={Example} selectOrder={1} />
        <CardImage src={Example} selectOrder={0} />
        <CardImage src={Example} selectOrder={2} />
        <CardImage src={Example} selectOrder={3} />
        <CardImage src={Example} selectOrder={4} />
        <CardImage src={Example} selectOrder={0} />
        <CardImage src={Example} selectOrder={0} />
        <CardImage src={Example} selectOrder={0} />
      </div>
    </div>
  );
};

export default MoodBoard;
