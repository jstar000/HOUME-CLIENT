import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    console.log('code:', code);

    if (code) {
      axios
        .get(`${baseUrl}/oauth/kakao/callback?code=${code}`)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          navigate('/');
        })
        .catch((error) => {
          console.log('error', error);
          alert('로그인 실패');
        });
    }
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
