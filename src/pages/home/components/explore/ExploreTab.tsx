import Banner from '@shared/components/v2/banner/Banner';

import * as styles from './ExploreTab.css';
import RoomTypeSection from './RoomTypeSection/RoomTypeSection';
import StyleSection from './StyleSection/StyleSection';

const ExploreTab = () => {
  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.content}>
        <RoomTypeSection />
        <StyleSection />
      </div>
    </div>
  );
};

export default ExploreTab;
