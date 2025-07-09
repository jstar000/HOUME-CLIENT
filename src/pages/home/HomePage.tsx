import { useState } from 'react';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import NoMatchSheet from '@/shared/components/bottomSheet/noMatchSheet/NoMatchSheet';

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
      <NoMatchSheet
        onFlipClick={handleFlip}
        onChooseClick={handleChoose}
        isOpen={isSheetOpen}
        onClose={handleClose}
        user="박소이"
      />
    </div>
  );
};

export default HomePage;
