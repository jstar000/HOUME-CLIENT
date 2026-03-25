import { useParams } from 'react-router-dom';

const BannerDetailPage = () => {
  const { bannerId } = useParams();

  return <div>배너 상세 페이지 / bannerId: {bannerId}</div>;
};

export default BannerDetailPage;
