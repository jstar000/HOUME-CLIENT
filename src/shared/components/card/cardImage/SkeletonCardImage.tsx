import * as styles from './CardImage.css.ts';

const SkeletonCard = () => {
  return (
    <div className={styles.cardcontainer({ state: 'default' })}>
      <div className={styles.skeletonCardImg} />
    </div>
  );
};

export default SkeletonCard;
