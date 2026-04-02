import { useState } from 'react';

import DragHandleBottomSheet from '@shared/components/v2/bottomSheet/DragHandleBottomSheet';
import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';

import IntroSection from './IntroSection/IntroSection';
import * as styles from './ProductTab.css';
import SearchSection from './SearchSection/SearchSection';
import SelectedFurnitureSheet from './SelectedFurnitureSheet/SelectedFurnitureSheet';

const ProductTab = () => {
  const [sheetExpanded, setSheetExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <IntroSection />
      <SearchSection />

      <DragHandleBottomSheet
        open
        onExpandedChange={setSheetExpanded}
        contentSlot={<SelectedFurnitureSheet expanded={sheetExpanded} />}
        primaryButton={
          // TODO: 이 가구들로 우리 집 꾸미기 버튼 Action Button 업데이트 시 width-full 옵션 추가
          <ActionButton size="2XL" leftIcon="DoubleStar" onClick={() => {}}>
            이 가구들로 우리 집 꾸미기
          </ActionButton>
        }
      />
    </div>
  );
};

export default ProductTab;
