import SearchBar from '@/shared/components/v2/textField/SearchBar';

export const ComponentTest = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <SearchBar />
    </div>
  );
};
