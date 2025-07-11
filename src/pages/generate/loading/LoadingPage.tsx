import LoadImageArea from '@assets/loadImgArea.svg?react';

const LoadingPage = () => {
  return (
    <main>
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
