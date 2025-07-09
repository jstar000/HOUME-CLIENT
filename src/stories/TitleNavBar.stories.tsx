import type { Meta, StoryObj } from '@storybook/react-vite';
import TitleNavBar from '@/shared/components/navbar/TitleNavBar';

const meta: Meta<typeof TitleNavBar> = {
  title: 'navbar/TitleNavBar',
  component: TitleNavBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '상단 타이틀 바 컴포넌트입니다. 뒤로가기 버튼, 타이틀, 로그인 버튼의 표시 여부를 제어할 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TitleNavBar>;

export const Default: Story = {
  args: {
    title: '마이 페이지',
    isBackIcon: true,
    isLoginBtn: true,
  },
};

export const NoBackButton: Story = {
  args: {
    title: '회원가입',
    isBackIcon: false,
    isLoginBtn: true,
  },
};

export const NoLoginButton: Story = {
  args: {
    title: '설정',
    isBackIcon: true,
    isLoginBtn: false,
  },
};

export const TitleOnly: Story = {
  args: {
    title: '공지사항',
    isBackIcon: false,
    isLoginBtn: false,
  },
};
