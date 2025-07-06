// ------------------------------
// 앱 라우팅 설정 파일
// ------------------------------
// React Router v7의 createBrowserRouter 패턴을 사용하여
// 1) RootLayout       : 모든 페이지의 공통 레이아웃(헤더·푸터) + <Outlet />
// 2) 공개 라우트      : Home, Login, Signup
// 3) ProtectedRoute   : 인증이 필요한 하위 라우트 묶음
//    - 인증 실패 시 ROUTES.LOGIN 으로 리다이렉트
//
// isAuthenticated 는 임시 하드코딩 값이며, 추후 useAuth 훅 등의 실제 인증 상태로 교체될 예정입니다.
// ------------------------------
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import RootLayout from '@/layout/RootLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import GeneratePage from '@/pages/generate/GeneratePage';
import MyPage from '@/pages/mypage/MyPage';

// TODO: Replace with actual auth state management
const isAuthenticated = false;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: ROUTES.ONBOARDING,
            element: <OnboardingPage />,
          },
          {
            path: ROUTES.GENERATE,
            element: <GeneratePage />,
          },
          {
            path: ROUTES.MYPAGE,
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);
