import { useState } from 'react';
import MoodBoard from '../generate/components/steps/MoodBoard';
import FlipSheet from '@/shared/components/bottomSheet/flipSheet/FlipSheet';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import LargeFilled from '@/shared/components/button/largeFilledButton/LargeFilledButton';

const HomePage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpen = () => setIsSheetOpen(true);
  const handleClose = () => setIsSheetOpen(false);

  const handleFlip = () => {
    console.log('Flip clicked!');
  };

  const handleChoose = () => {
    console.log('Choose clicked!');
    setIsSheetOpen(false);
  };

  return (
    <div>
      <MoodBoard />
    </div>
  );
};

export default HomePage;
