import { useState } from 'react';
import FlipSheet from '@/shared/components/bottomSheet/flipSheet/FlipSheet';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

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
    </div>
  );
};

export default HomePage;
