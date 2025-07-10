import type { Meta, StoryObj } from '@storybook/react-vite';
import CardImage from '@/shared/components/card/CardImage';

const meta: Meta<typeof CardImage> = {
  title: 'Components/CardImage',
  component: CardImage,
  argTypes: {
    number: {
      control: 'number',
      defaultValue: 1,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    src: {
      control: 'text',
      defaultValue: '/images/example.png',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardImage>;

export const Default: Story = {
  args: {
    number: 1,
    disabled: false,
    src: '/images/example.png',
  },
};

export const Disabled: Story = {
  args: {
    number: 1,
    disabled: true,
    src: '/images/example.png',
  },
};
