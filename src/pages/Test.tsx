import SearchBar from '@/shared/components/v2/textField/SearchBar';

export const ComponentTest = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <SearchBar placeholder="기본 상태" />
    </div>
  );
};
