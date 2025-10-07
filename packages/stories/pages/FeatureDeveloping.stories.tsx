import type { Meta, StoryObj } from '@storybook/react';
import { FeatureDeveloping } from '../../components/pages/FeatureDeveloping';

const meta: Meta<typeof FeatureDeveloping> = {
  title: 'Pages/FeatureDeveloping',
  component: FeatureDeveloping,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the feature developing page',
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
    title: 'Tính năng đang phát triển',
    subtitle: 'Chúng tôi đang phát triển tính năng này. Vui lòng quay lại sau.',
    buttonText: 'Quay lại',
  },
};

export default meta;
type Story = StoryObj<typeof FeatureDeveloping>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    title: 'Đang trong quá trình phát triển',
    subtitle: 'Tính năng này sẽ sớm được ra mắt. Cảm ơn bạn đã kiên nhẫn.',
    buttonText: 'Trở về trang chủ',
  },
};

export const CustomColor: Story = {
  args: {
    iconClassName: 'text-amber-600',
  },
};

export const EnglishVersion: Story = {
  args: {
    title: 'Feature In Development',
    subtitle: "We're currently developing this feature. Please check back later.",
    buttonText: 'Go Back',
  },
};
