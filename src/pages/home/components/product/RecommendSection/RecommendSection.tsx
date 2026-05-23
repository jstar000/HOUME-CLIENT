import * as styles from './RecommendSection.css';

// TODO: API 연동 후 recommendProducts, selectedProductIds, onSelectProduct 등 props 추가

const RecommendSection = () => {
  return (
    <section className={styles.section} aria-label="추천 상품">
      <h2 className={styles.title}>이런 상품은 어떠세요?</h2>
      <div className={styles.productGrid}>
        {/* TODO: API 연동 시 ProductCard 렌더 */}
      </div>
    </section>
  );
};

export default RecommendSection;
