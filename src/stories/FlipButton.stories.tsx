import type { Meta, StoryObj } from '@storybook/react-vite';
import FlipButton from '@/shared/components/button/filpButton/filpButton';

const meta: Meta<typeof FlipButton> = {
  title: 'Button/FlipButton',
  component: FlipButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '충전 버튼 컴포넌트. 활성/비활성 상태를 보여줍니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FlipButton>;

export const Default: Story = {
  render: (args) => <FlipButton {...args} />,
};
