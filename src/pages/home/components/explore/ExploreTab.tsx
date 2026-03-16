import BannerSection from './BannerSection/BannerSection';
import * as styles from './ExploreTab.css';
import RoomTypeSection from './RoomTypeSection/RoomTypeSection';
import StyleSection from './StyleSection/StyleSection';

const ExploreTab = () => {
  return (
    <div className={styles.container}>
      <BannerSection />
      <div className={styles.content}>
        <RoomTypeSection />
        <StyleSection />
      </div>
    </div>
  );
};

export default ExploreTab;
