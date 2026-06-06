import type { Meta, StoryObj } from '@storybook/react';
import { RegisterPage } from '../../components/pages/RegisterPage';

const meta: Meta<typeof RegisterPage> = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    onOpenChange: { action: 'openChange' },
    onRegister: { action: 'register' },
    onLogin: { action: 'login' },
    isLoading: { control: 'boolean', description: 'Show loading spinner on submit button' },
    errorMessage: { control: 'text', description: 'Server-side error to display' },
    title: { control: 'text', description: 'Dialog heading' },
    subtitle: { control: 'text', description: 'Dialog subheading' },
  },
  args: {
    open: false,
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    errorMessage: 'Tài khoản đã tồn tại',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const NoLoginLink: Story = {
  args: {
    onLogin: undefined,
  },
};

export const EnglishVersion: Story = {
  args: {
    title: 'Create Account',
    subtitle: 'Sign up to get started',
  },
};
