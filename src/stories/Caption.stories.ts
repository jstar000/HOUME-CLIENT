import type { Meta, StoryObj } from '@storybook/react-vite';
import Caption from '@/shared/components/text/Caption';

const meta = {
  title: 'Common/Text/Caption',
  component: Caption,
  tags: ['autodocs'],
} satisfies Meta<typeof Caption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
