import { useState } from 'react';
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
      <CtaButton onClick={handleOpen}>시트 열기</CtaButton>
      <FlipSheet
        onFlipClick={handleFlip}
        onChooseClick={handleChoose}
        isOpen={isSheetOpen}
        onClose={handleClose}
      />
      <LargeFilled buttonSize={'medium'}>여성</LargeFilled>
    </div>
  );
};

export default HomePage;
