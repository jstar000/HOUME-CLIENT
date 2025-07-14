// Step 2
import { useState } from 'react';
import FunnelHeader from '../../header/FunnelHeader';
import * as styles from './FloorPlan.css';
import FloorCard from '@/shared/components/card/floorCard/FloorCard';
import { mockimages } from '@/pages/onboarding/constants/step2MockData';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';
import NoMatchButton from '@/shared/components/button/noMatchButton/NoMatchButton';
import NoMatchSheet from '@/shared/components/bottomSheet/noMatchSheet/NoMatchSheet';
import FlipSheet from '@/shared/components/bottomSheet/flipSheet/FlipSheet';

const FloorPlan = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState<null | 'noMatch' | 'flip'>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenImage, setChosenImage] = useState<{
    id: number;
    src: string;
    flipped: boolean;
  } | null>(null);

  const handleImageClick = (id: number) => {
    setSelectedId(id);
    setIsFlipped(false); // 이미지 선택 시 반전 초기화
    handleOpenSheet('flip');
  };
  const handleOpenSheet = (type: 'noMatch' | 'flip') => {
    setOpenSheet(type);
    setTimeout(() => setIsSheetOpen(true), 0); // 다음 이벤트 루프에 열림 (애니메이션) bottomSheet 컴포넌트 렌더링 후 열림
  };
  const handleCloseSheet = () => {
    setIsSheetOpen(false); // 닫힘 애니메이션 시작
  };
  const handleExited = () => {
    setOpenSheet(null); // 애니메이션 끝나면 DOM에서 제거
  };
  const handleFlipClick = () => {
    // 좌우반전 버튼 클릭시
    setIsFlipped((prev) => !prev);
  };
  const handleChooseClick = () => {
    if (selectedId !== null) {
      const selected = mockimages.find((item) => item.id === selectedId);
      if (selected) {
        setChosenImage({
          id: selected.id,
          src: selected.img,
          flipped: isFlipped,
        });
        handleCloseSheet();
      }
    }
  };
  return (
    <section className={styles.wrapper}>
      <TitleNavBar
        title={'스타일링 이미지 생성'}
        isBackIcon={true}
        isLoginBtn={false}
      />
      <FunnelHeader
        title={'유사한 집 구조를 선택해주세요'}
        detail={'템플릿을 선택하면 좌우반전을 할 수 있어요.'}
        currentStep={2}
      />
      <div className={styles.container}>
        <div className={styles.gridbox}>
          {mockimages.map((item) => (
            <button key={item.id} onClick={() => handleImageClick(item.id)}>
              <FloorCard
                key={item.id}
                src={item.img}
                selected={selectedId === item.id}
              />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <NoMatchButton
          message={'우리 집 구조와 유사한 템플릿이 없어요'}
          onClick={() => handleOpenSheet('noMatch')}
        />
      </div>
      {openSheet === 'noMatch' && (
        <NoMatchSheet
          isOpen={isSheetOpen}
          onClose={handleCloseSheet}
          onExited={handleExited}
        />
      )}
      {openSheet === 'flip' && (
        <FlipSheet
          isOpen={isSheetOpen}
          onClose={handleCloseSheet}
          onExited={handleExited}
          onFlipClick={handleFlipClick}
          onChooseClick={handleChooseClick}
          src={
            selectedId !== null
              ? (mockimages.find((item) => item.id === selectedId)?.img ?? '')
              : ''
          }
          isFlipped={isFlipped}
        />
      )}
    </section>
  );
};

export default FloorPlan;
