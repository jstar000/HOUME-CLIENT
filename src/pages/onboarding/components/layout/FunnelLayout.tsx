import TitleNavBar from '@/shared/components/navBar/TitleNavBar';

const FunnelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TitleNavBar
        title="스타일링 이미지 생성"
        isBackIcon={true}
        isLoginBtn={false}
      />
      <div>{children}</div>
    </div>
  );
};

export default FunnelLayout;
