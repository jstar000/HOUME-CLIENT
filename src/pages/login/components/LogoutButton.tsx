import { useLogout } from '../hooks/useLogout';

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const LogoutButton = ({
  children = '로그아웃',
  className,
}: LogoutButtonProps) => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      logout();
    }
  };

  return (
    <button onClick={handleLogout} disabled={isPending} className={className}>
      {isPending ? '로그아웃 중...' : children}
    </button>
  );
};
