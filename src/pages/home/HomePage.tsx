import CreditBox from '@/shared/components/creditBox/CreditBox';

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
      <CreditBox credit={0} />
    </div>
  );
};

export default HomePage;
