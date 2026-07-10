import { useMemo } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import Banner, {
  type BannerSlide,
} from '@pages/home/components/explore/banner/Banner';
import { useLandingQuery } from '@pages/landing/apis/queries/useLandingQuery';

import { ROUTES } from '@routes/paths';

import promoBanner from '@assets/v2/svg/PromoBanner.svg?url';

import * as styles from './ExploreTab.css';
import RoomTypeSection from './RoomTypeSection/RoomTypeSection';
import StyleSection from './StyleSection/StyleSection';

type ExploreTabProps = {
  exploreSeedBannerId?: number;
  onPromoBannerClick?: () => void;
};

const ExploreTab = ({
  exploreSeedBannerId,
  onPromoBannerClick,
}: ExploreTabProps) => {
  const navigate = useNavigate();
  const { data: landingData } = useLandingQuery();

  const seedBannerId = useMemo(() => {
    if (exploreSeedBannerId != null && exploreSeedBannerId > 0) {
      return exploreSeedBannerId;
    }
    const first = landingData?.landings?.[0]?.bannerId;
    if (first != null && first > 0) {
      return first;
    }
    return 0;
  }, [exploreSeedBannerId, landingData?.landings]);

  const handleBannerSlideClick = (slide: BannerSlide) => {
    navigate(
      // React Router generatePath 기반 동적 라우팅 적용
      generatePath(ROUTES.BANNER_DETAIL, { bannerId: String(slide.id) })
    );
  };

  return (
    <div className={styles.container}>
      <Banner
        seedBannerId={seedBannerId}
        onSlideClick={handleBannerSlideClick}
      />
      <div className={styles.content}>
        <RoomTypeSection />
      </div>
      <div className={styles.promoBannerSection}>
        <button
          type="button"
          className={styles.promoBannerButton}
          aria-label="상품 탭으로 이동"
          onClick={onPromoBannerClick}
        >
          <img src={promoBanner} alt="" className={styles.promoBannerImage} />
        </button>
      </div>
      <div className={styles.content}>
        <StyleSection />
      </div>
    </div>
  );
};

export default ExploreTab;
