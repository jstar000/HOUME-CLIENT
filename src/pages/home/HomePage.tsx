import LargeFilled from '@/shared/components/button/largeFilledButton/largeFilled';
import SmallFilled from '@/shared/components/button/smallFilledButton/smallFilled';

const HomePage = () => {
  return (
    <div
      style={{
        padding: '3rem',
        display: 'flex',
        gap: '1rem',
        backgroundColor: '#BDBDBD',
      }}
    >
      <SmallFilled>이름</SmallFilled>
      <LargeFilled>버튼 이름</LargeFilled>
    </div>
  );
};

export default HomePage;
