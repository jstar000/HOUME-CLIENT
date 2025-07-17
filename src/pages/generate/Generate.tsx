import { Outlet, useMatch } from 'react-router-dom';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const GeneratePage = () => {
  const isBackIcon = useMatch('/generate/result');

  return (
    <main>
      <TitleNavBar
        title={'스타일링 이미지 생성'}
        isBackIcon={!!isBackIcon}
        isLoginBtn={false}
      />
      <Outlet />
    </main>
  );
};

export default GeneratePage;
