import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { useImageMetaQuery } from '@pages/generate/v2/apis/queries/useImageMetaQuery';

import { ROUTES } from '@routes/paths';

import { RESULT_TYPE, useImageFlowStore } from '@store/useImageFlowStore';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';
import TitleNavBar from '@components/v2/navBar/TitleNavBar';

import CurationResult from './components/curation/CurationResult';
import ListResult from './components/list/ListResult';
import * as styles from './ResultPage.css';

import type { ResultImageMeta } from './types';

const ResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const resultType = useImageFlowStore((state) => state.resultType);

  // URL ?houseId= 파싱 (NaN/소수점/음수는 클라이언트에서 차단, 그 외 잘못된 id는 백엔드 응답 에러로 처리)
  const rawHouseId = searchParams.get('houseId')?.trim() ?? '';
  const candidate = Number(rawHouseId);
  const parsedImageId =
    rawHouseId !== '' && Number.isInteger(candidate) && candidate > 0
      ? candidate
      : null;

  // LoadingPage에서 navigate state로 전달한 imageUrl/isMirror (새로고침 시 손실 → /meta로 fallback)
  const locationState = location.state as {
    imageUrl?: string;
    isMirror?: boolean;
  } | null;
  const stateImageUrl = locationState?.imageUrl;
  const stateIsMirror = locationState?.isMirror;

  // /meta API 호출 — 새로고침 등으로 state 손실되었을 때 fallback
  const {
    data: meta,
    isPending: isMetaPending,
    isError: isMetaError,
  } = useImageMetaQuery(parsedImageId ?? 0, {
    enabled: parsedImageId !== null,
  });

  // 잘못된 houseId → HOME으로
  if (parsedImageId === null) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // state 우선, 부재 시 meta 응답으로 보충
  const resolvedImageUrl = stateImageUrl ?? meta?.imageUrl;
  const resolvedIsMirror = stateIsMirror ?? meta?.isMirror ?? false;

  // state도 없고 meta도 아직 로딩 중 → 로딩 UI
  if (!resolvedImageUrl && isMetaPending) {
    return (
      <main className={styles.pageLayout}>
        <TitleNavBar
          background="transparent"
          placement="overContent"
          onBackClick={() => navigate(-1)}
        />
        <Loading />
      </main>
    );
  }

  // state도 없고 meta도 실패 → 에러 UI
  if (!resolvedImageUrl && isMetaError) {
    return (
      <main className={styles.pageLayout}>
        <TitleNavBar
          background="transparent"
          placement="overContent"
          onBackClick={() => navigate(-1)}
        />
        <InlineError message="이미지를 불러올 수 없습니다" />
      </main>
    );
  }

  // 자식 컴포넌트에 전달할 이미지 메타 (자식들은 imageId로 자체 API 호출하여 큐레이션/리스트 데이터 fetch)
  const image: ResultImageMeta = {
    imageId: parsedImageId,
    imageUrl: resolvedImageUrl ?? '',
    isMirror: resolvedIsMirror,
  };

  return (
    <main className={styles.pageLayout}>
      <TitleNavBar
        background="transparent"
        placement="overContent"
        onBackClick={() => navigate(-1)}
      />
      <div className={styles.content}>
        <div className={styles.resultBody}>
          {resultType === RESULT_TYPE.LIST ? (
            <ListResult image={image} />
          ) : (
            <CurationResult images={[image]} />
          )}
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
