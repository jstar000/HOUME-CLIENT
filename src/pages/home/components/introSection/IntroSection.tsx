import { useState } from 'react';
import * as styles from './IntroSection.css';
import SmallFilledButton from '@/shared/components/button/smallFilledButton/SmallFilledButton';

const options = ['휴식형', '재택근무형', '홈카페형', '영화감상형'];

const IntroSection = () => {
  const [selected, setSelected] = useState('휴식형');

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        나답게 꾸미고 살고 싶은
        <br />
        1인 가구를 위한 인테리어 솔루션
      </h2>
      <p className={styles.description}>
        하우미는 집 구조, 인테리어 취향, 주요 활동까지
        <br />
        AI 기반 이미지로 나만의 공간 스타일링을 제안해드려요.
      </p>

      <div className={styles.placeholderBox} />

      <div
        className={styles.buttonGroup}
        role="radiogroup"
        aria-label="옵션선택"
      >
        {options.map((label) => (
          <label key={label} className={styles.radioButtonLabel}>
            <input
              type="radio"
              name="interiorOption"
              value={label}
              checked={selected === label}
              onChange={() => setSelected(label)}
              className={styles.radioButton}
            />
            <SmallFilledButton isSelected={selected === label}>
              {label}
            </SmallFilledButton>
          </label>
        ))}
      </div>
    </section>
  );
};

export default IntroSection;
