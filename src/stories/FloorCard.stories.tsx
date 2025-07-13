import type { Meta, StoryObj } from '@storybook/react-vite';
import FloorCard from '@/shared/components/card/floorCard/FloorCard';

const meta: Meta<typeof FloorCard> = {
  title: 'Components/FloorCard',
  component: FloorCard,
  argTypes: {
    src: {
      control: 'text',
      defaultValue: '/images/example.png',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloorCard>;

export const Default: Story = {
  args: {
    src: '/images/example.png',
  },
};
