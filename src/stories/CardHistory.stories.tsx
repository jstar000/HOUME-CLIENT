import type { Meta, StoryObj } from '@storybook/react-vite';
import CardHistory from '@/shared/components/card/cardHistory/CardHistory';

const meta: Meta<typeof CardHistory> = {
  title: 'Components/CardHistory',
  component: CardHistory,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: '우드 인테리어의 8평 오피스텔',
    },
    btnText: {
      control: 'text',
      defaultValue: '가구 추천 보러가기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardHistory>;

export const Default: Story = {
  args: {
    title: '우드 인테리어의 8평 오피스텔',
    btnText: '가구 추천 보러가기',
  },
};
