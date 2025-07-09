import type { Meta, StoryObj } from '@storybook/react-vite';
import LogoNavBar from '@/shared/components/navbar/LogoNavBar';

const meta: Meta<typeof LogoNavBar> = {
  title: 'navbar/LogoNavBar',
  component: LogoNavBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '로고와 로그인/프로필 버튼이 함께 있는 내비게이션 바 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoNavBar>;

export const Default: Story = {
  args: {
    buttonType: null,
  },
};

export const WithLoginButton: Story = {
  args: {
    buttonType: 'login',
  },
};

export const WithProfileButton: Story = {
  args: {
    buttonType: 'profile',
  },
};
