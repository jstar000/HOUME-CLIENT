import * as styles from './HistorySection.css';
import HeadingText from '@/shared/components/text/HeadingText';
import CardHistory from '@/shared/components/card/cardHistory/CardHistory';

const HistoryCard = () => {
  return (
    <section className={styles.container}>
      <HeadingText title="이미지 생성 히스토리" content="" />
      <CardHistory
        src="/images/cardImage.png"
        title="우드 인테리어에 어울릴 오브제들"
        btnText="가구 추천 보러가기"
      />
    </section>
  );
};

export default HistoryCard;
