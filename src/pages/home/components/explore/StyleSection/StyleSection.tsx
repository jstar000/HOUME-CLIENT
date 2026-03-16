import IconArrowRight from '@assets/v2/svg/IconArrowRight.svg?react';

import BtnText from '@components/v2/btnText/BtnText';
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
        <BtnText
          color="secondary"
          size="m"
          rightIcon={<IconArrowRight aria-hidden />}
          onClick={() => {}}
        >
          더보기
        </BtnText>
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
