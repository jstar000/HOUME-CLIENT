import { useId, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import ActionButton from '@shared/components/v2/button/actionButton/ActionButton';
import Icon from '@shared/components/v2/icon/Icon';
import TitleNavBar from '@shared/components/v2/navBar/TitleNavBar';

import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import * as styles from './BannerDetailPage.css';

const BANNER_TAGLINE_MOCK = '잦은 재택근무하기 좋은 우리 집';

/** 추후 API 연동 */
const QUESTION_MOCK = '브런치로 어떤 음식을 주로 드시나요?';

const OPTION_MOCK = [
  '간단한 커피와 디저트',
  '파스타 같은 양식',
  '밥과 국이 있는 한식',
  '편리한 배달음식',
] as const;

const BannerDetailPage = () => {
  const navigate = useNavigate();
  const { bannerId = '' } = useParams<{ bannerId: string }>();
  const questionId = useId();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className={styles.page} key={bannerId}>
      <TitleNavBar
        title="원하는 공간 선택하기"
        backLabel="이전"
        onBackClick={() => navigate(-1)}
      />
      <main className={styles.body}>
        <div className={styles.bannerContainer}>
          <StyleCard
            size="L"
            scaleOnPress={false}
            imageSrc=" "
            title={BANNER_TAGLINE_MOCK}
          />
        </div>

        <div className={styles.questionContainer}>
          <h2 className={styles.question} id={questionId}>
            {QUESTION_MOCK}
          </h2>
          <ul
            className={styles.optionList}
            role="radiogroup"
            aria-labelledby={questionId}
          >
            {OPTION_MOCK.map((label, index) => {
              const selected = selectedIndex === index;
              return (
                <li key={label}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={styles.optionRow}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <span className={styles.optionIcon} aria-hidden>
                      <Icon
                        name={selected ? 'RadioSelected' : 'RadioDefault'}
                        size="20"
                      />
                    </span>
                    <span className={styles.optionLabel}>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      <div className={styles.ctaBar}>
        <ActionButton
          variant="solid"
          color="primary"
          size="2XL"
          width="fill"
          disabled={selectedIndex === null}
          onClick={() => {}}
        >
          이 스타일로 우리 집 꾸미기
        </ActionButton>
      </div>
    </div>
  );
};

export default BannerDetailPage;
