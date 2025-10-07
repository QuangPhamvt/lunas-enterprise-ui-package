import type { Meta, StoryObj } from '@storybook/react';
import { NotFound } from '../../components/pages/NotFound';

const meta: Meta<typeof NotFound> = {
  title: 'Pages/NotFound',
  component: NotFound,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the not found page',
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
    title: 'Không tìm thấy trang',
    subtitle: 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
    buttonText: 'Trở về trang chủ',
  },
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    title: 'Trang không tồn tại',
    subtitle: 'Rất tiếc, chúng tôi không thể tìm thấy trang bạn yêu cầu.',
    buttonText: 'Trở về',
  },
};

export const CustomColor: Story = {
  args: {
    iconClassName: 'text-blue-600',
  },
};

export const EnglishVersion: Story = {
  args: {
    title: 'Page Not Found',
    subtitle: "Sorry, the page you are looking for doesn't exist or has been moved.",
    buttonText: 'Back to Home',
  },
};
