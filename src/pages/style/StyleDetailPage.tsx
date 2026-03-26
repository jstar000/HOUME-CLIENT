import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';

const StyleDetailPage = () => {
  const { styleId } = useParams();
  const navigate = useNavigate();

  // 스타일 상세 CTA: setFlow(STYLE_RESTYLE) → /imageSetup (ProtectedRoute가 로그인 게이트 처리)
  const handleCta = () => {
    useImageFlowStore.getState().setFlow({
      entryRoute: ENTRY_ROUTE.STYLE_RESTYLE,
      preset: { type: 'style', styleId: Number(styleId) },
    });
    navigate(ROUTES.IMAGE_SETUP);
  };

  return (
    <div>
      <div>스타일 상세 페이지 / styleId: {styleId}</div>
      <button onClick={handleCta}>이 스타일로 우리 집 꾸미기</button>
    </div>
  );
};

export default StyleDetailPage;
