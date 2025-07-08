import Modal, { type ModalProps } from './Modal';
import type { Meta, StoryFn } from '@storybook/react-vite';

const meta: Meta<typeof Modal> = {
  title: 'shared/components/overlay/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    close: { action: 'closed' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'toss/overlay-kit을 사용해 구현한 모달창입니다. \n' +
          '나가기 버튼을 탭할 시 모달창이 unmount됩니다.',
      },
    },
  },
} as Meta<typeof Modal>;

export default meta;

const Template: StoryFn<ModalProps> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: '스타일링 이미지대로 가구를 추천 받으려면 크레딧이 필요해요',
};

export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
  title: '모달이 닫혀 있는 경우',
};

export const Interactive = Template.bind({});
Interactive.args = {
  isOpen: true,
  title: 'Interactive Modal',
};
Interactive.parameters = {
  actions: { handles: ['click button'] },
};
