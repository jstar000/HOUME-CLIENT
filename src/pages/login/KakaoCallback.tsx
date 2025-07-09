import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('[KakaoCallback] 인가 코드:', code);

    if (code) {
      axios
        .get(`${baseUrl}/oauth/kakao/callback?code=${code}`)
        .then((res) => {
          console.log('[KakaoCallback] 서버 응답:', res.data);
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          navigate('/');
        })
        .catch((error) => {
          console.error('[KakaoCallback] 로그인 실패:', error);
          alert('로그인 실패');
        });
    }
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
