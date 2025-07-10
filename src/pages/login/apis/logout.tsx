import axiosInstance from '@shared/apis/axiosInstance';

export const logout = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error('액세스 토큰이 없습니다.');

    const res = await axiosInstance.post(`${baseUrl}/logout`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true, // 쿠키에서 refreshToken 제거용
    });

    console.log('로그아웃 성공:', res.data);
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  } catch (error) {
    console.error('로그아웃 실패:', error);
    alert('로그아웃 중 오류가 발생했습니다.');
  }
};
