import BannerSection from './BannerSection/BannerSection';
import * as styles from './ExploreTab.css';
import RoomTypeSection from './RoomTypeSection/RoomTypeSection';
import StyleSection from './StyleSection/StyleSection';

const ExploreTab = () => {
  return (
    <div className={styles.container}>
      <BannerSection />
      <RoomTypeSection />
      <StyleSection />
    </div>
  );
};

export default ExploreTab;
