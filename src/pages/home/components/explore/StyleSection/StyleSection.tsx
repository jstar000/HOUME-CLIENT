import IcnArrowRightS from '@assets/v2/svg/IcnArrowRightS.svg?react';

import StyleCard from '@components/v2/styleCard/StyleCard';

import * as styles from './StyleSection.css';

const STYLE_MOCK = [
  {
    id: 'minimal',
    imageSrc: ' ',
    title: '미니멀한 개발자의 집',
  },
  {
    id: 'kistch',
    imageSrc: ' ',
    title: '키치한 무드의 집',
  },
  {
    id: 'animal',
    imageSrc: ' ',
    title: '반려동물과 함께 하는 집',
  },
  {
    id: 'blue',
    imageSrc: ' ',
    title: '블루 아이템이 포인트인 집',
  },
] as const;

const StyleSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>다른 스타일로 꾸며보기</h2>
        <button type="button" className={styles.moreButton}>
          <span>더보기</span>
          <IcnArrowRightS className={styles.moreButtonIcon} aria-hidden />
        </button>
      </div>
      <div className={styles.cardGrid}>
        {STYLE_MOCK.map((style) => (
          <StyleCard
            key={style.id}
            imageSrc={style.imageSrc}
            title={style.title}
            onClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default StyleSection;
