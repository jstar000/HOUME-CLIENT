import TitleStep from '@shared/components/titleStep/TitleStep';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/TitleStep',
  component: TitleStep,
  parameters: {
    docs: {
      description: {
        component: '제목과 단계 정보를 함께 표시하는 TitleStep 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    stepLabel: {
      description: '단계 텍스트 (예: "STEP 1")',
      control: { type: 'text' },
    },
    title: {
      description: '제목 텍스트 (예: "내용 입력")',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof TitleStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stepLabel: 'STEP 1',
    title: '제목',
  },
};
