import GenImgCard from './mypage/components/card/genImgCard/GenImgCard';

const ComponentTest = () => {
  return (
    <div
      style={{
        padding: '20px',
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <GenImgCard productSummaryText="침대 외 4개의 가구로 생성된 이미지" />
      <GenImgCard
        cardType="curation"
        productSummaryText="침대 외 4개의 가구로 생성된 이미지"
      />
    </div>
  );
};

export default ComponentTest;
