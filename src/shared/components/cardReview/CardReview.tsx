import * as styles from '@shared/components/cardReview/CardReview.css.ts';

interface CardReviewProps {
  title: string;
  body: string;
  username: string;
}

export const CardReview = ({ title, body, username }: CardReviewProps) => {
  return (
    <div className={styles.cardReview}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
      <div className={styles.username}>{username}</div>
    </div>
  );
};
