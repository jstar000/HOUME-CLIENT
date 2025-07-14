import { useState } from 'react';
import axios from 'axios';

const TestTokenSetter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSetToken = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await axios.get('/access');
      // 응답 구조에 따라 accessToken 키가 다를 수 있으니 확인 필요
      const token = res.data.accessToken || res.data.token || res.data;
      if (!token) throw new Error('토큰이 응답에 없습니다.');
      localStorage.setItem('accessToken', token);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || '토큰 저장 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <button onClick={handleSetToken} disabled={loading}>
        {loading ? '토큰 발급 중...' : '테스트 토큰 발급 및 저장'}
      </button>
      {success && <div style={{ color: 'green' }}>토큰 저장 성공!</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default TestTokenSetter;
