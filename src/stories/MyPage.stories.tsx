import MyPage from '@pages/mypage/MyPage';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MyPage> = {
  title: 'pages/MyPage',
  component: MyPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '마이페이지 전체 레이아웃입니다. 사용자 정보, 크레딧, 이미지 생성 히스토리, 계정 설정 등을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyPage>;

export const Default: Story = {};
