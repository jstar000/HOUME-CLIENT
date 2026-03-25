import { useParams } from 'react-router-dom';

const StyleDetailPage = () => {
  const { styleId } = useParams();

  return <div>스타일 상세 페이지 / styleId: {styleId}</div>;
};

export default StyleDetailPage;
