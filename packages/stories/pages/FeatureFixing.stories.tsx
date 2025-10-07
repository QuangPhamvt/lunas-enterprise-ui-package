import type { Meta, StoryObj } from '@storybook/react';
import { FeatureFixing } from '../../components/pages/FeatureFixing';

const meta: Meta<typeof FeatureFixing> = {
  title: 'Pages/FeatureFixing',
  component: FeatureFixing,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the feature fixing page',
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
    title: 'Tính năng đang bảo trì',
    subtitle: 'Chúng tôi đang khắc phục vấn đề với tính năng này. Vui lòng quay lại sau.',
    buttonText: 'Quay lại',
  },
};

export default meta;
type Story = StoryObj<typeof FeatureFixing>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    title: 'Đang sửa chữa',
    subtitle: 'Chúng tôi đang khắc phục lỗi. Tính năng sẽ hoạt động trở lại sớm.',
    buttonText: 'Trở về trang chủ',
  },
};

export const CustomColor: Story = {
  args: {
    iconClassName: 'text-red-500',
  },
};

export const EnglishVersion: Story = {
  args: {
    title: 'Feature Under Maintenance',
    subtitle: "We're fixing some issues with this feature. Please check back later.",
    buttonText: 'Go Back',
  },
};
