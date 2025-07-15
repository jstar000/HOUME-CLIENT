// FloorPlan.tsx
import { useEffect, useState } from 'react';
import * as styles from './FloorPlan.css';
import type { OpenSheetKey } from '@/pages/onboarding/types/OpenSheet';
import type { FloorPlanList } from '@/pages/onboarding/apis/step2';
import FloorCard from '@/shared/components/card/floorCard/FloorCard';
import NoMatchButton from '@/shared/components/button/noMatchButton/NoMatchButton';
import NoMatchSheet from '@/shared/components/bottomSheet/noMatchSheet/NoMatchSheet';
import FlipSheet from '@/shared/components/bottomSheet/flipSheet/FlipSheet';
import { useToast } from '@/shared/components/toast/useToast';

interface FloorPlanProps {
  onFloorPlanSelect: (selectedFloorPlan: {
    id: number;
    src: string;
    flipped: boolean;
  }) => void;
  floorPlanList: FloorPlanList[];
}

const FloorPlan = ({ onFloorPlanSelect, floorPlanList }: FloorPlanProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState<OpenSheetKey>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const selectedImage =
    selectedId == null
      ? null
      : floorPlanList.find((item) => item.id === selectedId);

  const { notify } = useToast();

  // toast를 NoMatchSheet의 상위 컴포넌트인 FloorPlan에서 호출해야
  // toast의 option에 준 autoClose가 정상적으로 적용됨
  const handleAddressSubmit = () => {
    handleCloseSheet();
    notify({
      text: '주소가 성공적으로 제출되었어요',
      type: 'success',
      options: {
        style: { marginBottom: '1.6rem' },
        autoClose: 3000,
      },
    });
  };

  const handleImageClick = (id: number) => {
    setSelectedId(id);
    setIsFlipped(false); // 이미지 선택 시 반전 초기화
    handleOpenSheet('flip');
  };

  const handleOpenSheet = (type: 'noMatch' | 'flip') => {
    setOpenSheet(type);
  };

  useEffect(() => {
    if (openSheet) {
      setIsSheetOpen(true);
    }
  }, [openSheet]);

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
    if (selectedId !== null && selectedImage) {
      const selectedFloorPlan = {
        id: selectedImage.id,
        src: selectedImage.floorPlanImage,
        flipped: isFlipped,
      };

      handleCloseSheet();
      onFloorPlanSelect(selectedFloorPlan);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.gridbox}>
          {floorPlanList.map((item: FloorPlanList) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleImageClick(item.id)}
            >
              <FloorCard
                key={item.id}
                src={item.floorPlanImage}
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
          onSubmit={handleAddressSubmit}
        />
      )}

      {openSheet === 'flip' && (
        <FlipSheet
          isOpen={isSheetOpen}
          onClose={handleCloseSheet}
          onExited={handleExited}
          onFlipClick={handleFlipClick}
          onChooseClick={handleChooseClick}
          src={selectedImage?.floorPlanImage ?? ''}
          isFlipped={isFlipped}
        />
      )}
    </section>
  );
};

export default FloorPlan;
