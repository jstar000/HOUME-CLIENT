import LoadImageArea from '@assets/loadImgArea.svg?react';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const GeneratePage = () => {
  return (
    <main>
      <TitleNavBar
        title={'스타일링 이미지 생성'}
        isBackIcon={true}
        isLoginBtn={false}
      />
      <LoadImageArea />
    </main>
  );
};

export default GeneratePage;
