import { generatePath, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';
import StyleCard from '@/shared/components/v2/styleCard/StyleCard';

import { STYLELIST_MOCK } from './mocks/styleDetail';
import * as styles from './StyleListPage.css';

const StyleListPage = () => {
  const navigate = useNavigate();
  const handleStyleClick = (styleId: number) => {
    navigate(generatePath(ROUTES.STYLE_DETAIL, { styleId: String(styleId) }));
  };

  return (
    <section className={styles.wrapper}>
      <TitleNavBar title="스타일 전체 보기" />
      <div className={styles.cardList}>
        {/* TODO: 컴포넌트 수정 반영 필요 */}
        {STYLELIST_MOCK.data.otherStyles.map((style) => (
          <StyleCard
            key={style.id}
            imageSrc={style.imageUrl}
            title={style.name}
            onClick={() => handleStyleClick(style.id)}
            imageLoading="eager"
          />
        ))}
      </div>
    </section>
  );
};

export default StyleListPage;
