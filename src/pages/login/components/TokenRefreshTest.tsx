// 엑세스 토큰 만료 및 리프레시 토큰 재발급 테스트용 컴포넌트

import axiosInstance from '@shared/apis/axiosInstance';

const TokenRefreshTest = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleTest = async () => {
    try {
      const res = await axiosInstance.get(`${baseUrl}/access-test`);

      console.log('API 응답:', res);
    } catch (err: any) {
      const message = err?.response?.data?.message || err.message;
      console.error('API 요청 에러:', err, message);
    }
  };

  return (
    <div>
      <button
        onClick={handleTest}
        style={{ padding: '8px 16px', marginBottom: '12px' }}
      >
        토큰 만료 테스트
      </button>
    </div>
  );
};

export default TokenRefreshTest;
