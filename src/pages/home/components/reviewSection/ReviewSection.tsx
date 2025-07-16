import * as styles from './ReviewSection.css';
import { CardReview } from '@/shared/components/cardReview/CardReview';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';

const ReviewSection = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        <CardReview
          title="이제야 나에게 맞는 집이 된 것 같아요!"
          body={`평소 퇴근 후에 OTT 보는 게 유일한 낙이었는\n데,제가 평소 집에서 하는 활동에 맞는 가구 배\n치를 바꿔보고 나니 퇴근 후에 제 취미에 더 집 \n중할 수 있게 된 것 같아요.`}
          username="28세 마케터, K님"
        />
        <CardReview
          title="어떻게 꾸며야 할지 감이 좀 생긴 것 같아요!"
          body={`첫 자취를 시작하면서 항상 집을 예쁘게 \n꾸미고 싶다는 욕심이 있었는데제가 감각이 \n부족한 건지.. 잘 안 되더라구요.\n그런데 하우미에서 우리 집 공간을 똑같이 \n구현한 AI이미지를 보니까 어떻게 꾸며야 \n할지 감이 좀 생긴 것 같아요!`}
          username="23세 대학생, L님"
        />
      </section>
      <div className={styles.footerContainer}>
        <p className={styles.copy}>&copy; 2025 HouMe Labs, Inc.</p>
        <CtaButton>우리집에 딱 맞는 스타일 보기</CtaButton>
      </div>
    </div>
  );
};

export default ReviewSection;
