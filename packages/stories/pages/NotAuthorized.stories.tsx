import type { Meta, StoryObj } from '@storybook/react';
import { NotAuthorized } from '../../components/pages/NotAuthorized';

const meta: Meta<typeof NotAuthorized> = {
  title: 'Pages/NotAuthorized',
  component: NotAuthorized,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the not authorized page',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle or description text',
    },
    buttonText: {
      control: 'text',
      description: 'The text for the action button',
    },
    onButtonClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    iconClassName: {
      control: 'text',
      description: 'CSS class names for the icon',
    },
  },
  args: {
    title: 'Quyền truy cập bị từ chối',
    subtitle: 'Xin lỗi, bạn không có quyền truy cập vào trang này.',
    buttonText: 'Quay lại',
  },
};

export default meta;
type Story = StoryObj<typeof NotAuthorized>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    title: 'Không có quyền truy cập',
    subtitle: 'Bạn không có quyền để truy cập vào nội dung này.',
    buttonText: 'Trở về trang chủ',
  },
};

export const CustomColor: Story = {
  args: {
    iconClassName: 'text-red-600',
  },
};

export const EnglishVersion: Story = {
  args: {
    title: 'Access Denied',
    subtitle: "Sorry, you don't have permission to access this page.",
    buttonText: 'Go Back',
  },
};
