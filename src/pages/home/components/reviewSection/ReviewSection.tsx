import * as styles from './ReviewSection.css';
import { REVIEW_DATA } from '../../constants/reviewData';
import { CardReview } from '@/shared/components/cardReview/CardReview';

const ReviewSection = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        {REVIEW_DATA.map((review) => (
          <CardReview
            key={review.id}
            title={review.title}
            body={review.body}
            username={review.username}
          />
        ))}
      </section>
      <div className={styles.footerContainer}>
        <p className={styles.copy}>&copy; 2025 HouMe Labs, Inc.</p>
      </div>
    </div>
  );
};

export default ReviewSection;
