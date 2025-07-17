import * as styles from './HistorySection.css';
import CardHistory from '@/shared/components/card/cardHistory/CardHistory';
import emptyImage from '@/shared/assets/images/emptyImage.png';

type HistorySectionProps = {
  hasImage?: boolean;
  imageUrl?: string;
  title?: string;
};

const HistorySection = ({ hasImage = true }: HistorySectionProps) => {
  return (
    <section className={styles.container}>
      <p className={styles.title}>이미지 생성 히스토리</p>

      {hasImage ? (
        <CardHistory
          src="/images/cardImage.png"
          title="우드 인테리어에 어울릴 오브제들"
          btnText="가구 추천 보러가기"
        />
      ) : (
        <CardHistory
          src={emptyImage}
          title="생성한 이미지가 없어요"
          btnText="이미지 생성하러 가기"
        />
      )}
    </section>
  );
};

export default HistorySection;
