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
  },
};

export default meta;
type Story = StoryObj<typeof CardImage>;

export const Default: Story = {
  args: {
    number: 1,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    number: 1,
    disabled: true,
  },
};
