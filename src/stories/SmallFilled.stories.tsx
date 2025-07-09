import type { Meta, StoryObj } from '@storybook/react-vite';
import SmallFilled from '@/shared/components/button/smallFilledButton/smallFilled';

const meta: Meta<typeof SmallFilled> = {
  title: 'Button/SmallFilled',
  component: SmallFilled,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'small filled 버튼 컴포넌트. 선택 전/후 상태를 보여줍니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SmallFilled>;

export const Default: Story = {
  render: (args) => <SmallFilled {...args}>이름</SmallFilled>,
};
