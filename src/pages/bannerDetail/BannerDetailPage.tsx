import { useNavigate } from 'react-router-dom';

import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import Icon from '@shared/components/v2/icon/Icon';
import TitleNavBar from '@shared/components/v2/navBar/TitleNavBar';

import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import * as styles from './BannerDetailPage.css';

const BANNER_TAGLINE_MOCK = '잦은 재택근무하기 좋은 우리 집';

/** 스켈레톤용 복수 선택 문항 (추후 API·상태 연동) */
const QUESTION_MOCK = '브런치로 어떤 음식을 주로 드시나요?';

const OPTION_MOCK = [
  '간단한 커피와 디저트',
  '파스타 같은 양식',
  '밥과 국이 있는 한식',
  '편리한 배달음식',
] as const;

const BannerDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <TitleNavBar
        title="원하는 공간 선택하기"
        backLabel="이전"
        onBackClick={() => navigate(-1)}
      />
      <main className={styles.body}>
        <div className={styles.hero}>
          <StyleCard imageSrc=" " />
        </div>

        <h2 className={styles.question}>{QUESTION_MOCK}</h2>
        <ul className={styles.optionList}>
          {OPTION_MOCK.map((label) => (
            <li key={label} className={styles.optionRow}>
              <span className={styles.optionRadio} aria-hidden />
              <span className={styles.optionLabel}>{label}</span>
            </li>
          ))}
        </ul>
      </main>

      <div className={styles.ctaBar}>
        <ActionButton
          variant="solid"
          color="primary"
          size="2XL"
          onClick={() => {}}
        >
          이 스타일로 우리 집 꾸미기
        </ActionButton>
      </div>
    </div>
  );
};

export default BannerDetailPage;
