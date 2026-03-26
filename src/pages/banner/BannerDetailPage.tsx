import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';

const BannerDetailPage = () => {
  const { bannerId } = useParams();
  const navigate = useNavigate();

  // 배너 상세 CTA: setFlow(HOME_BANNER) → /imageSetup (ProtectedRoute가 로그인 게이트 처리)
  const handleCta = () => {
    useImageFlowStore.getState().setFlow({
      entryRoute: ENTRY_ROUTE.HOME_BANNER,
      // TODO: answerId는 배너 상세 UI 구현 후 실제 칩 선택값으로 교체
      preset: { type: 'banner', bannerId: Number(bannerId), answerId: 0 },
    });
    navigate(ROUTES.IMAGE_SETUP);
  };

  return (
    <div>
      <div>배너 상세 페이지 / bannerId: {bannerId}</div>
      <button onClick={handleCta}>이 스타일로 우리 집 꾸미기</button>
    </div>
  );
};

export default BannerDetailPage;
