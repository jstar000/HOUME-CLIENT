import LoadImageArea from '@assets/loadImgArea.svg?react';
import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const LoadingPage = () => {
  return (
    <main>
      <TitleNavBar
        title={'스타일링 이미지 생성'}
        isBackIcon={true}
        isLoginBtn={false}
      />
      <section>
        {' '}
        전체 컨테이너
        <div>
          {' '}
          윗 부분 영역
          <div>프로그레스바 영억</div>
          <p>
            마음에 드는 가구를 선택하면, <br />
            하우미가 사용자님의 취향을 더 잘 이해할 수 있어요!
          </p>
        </div>
        <section>
          캐러셀 영역
          <div>
            <LoadImageArea />
          </div>
          <div>버튼그룹 </div>
        </section>
      </section>
    </main>
  );
};

export default LoadingPage;
