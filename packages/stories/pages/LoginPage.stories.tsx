import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from '../../components/pages/LoginPage';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    onOpenChange: { action: 'openChange' },
    onLogin: { action: 'login' },
    onRequestOtp: { action: 'requestOtp' },
    onVerifyOtp: { action: 'verifyOtp' },
    onForgotPassword: { action: 'forgotPassword' },
    onRegister: { action: 'register' },
    isLoading: { control: 'boolean', description: 'Show loading spinner on submit button' },
    errorMessage: { control: 'text', description: 'Server-side error to display' },
    title: { control: 'text', description: 'Dialog heading' },
    subtitle: { control: 'text', description: 'Dialog subheading' },
    resendCooldownSeconds: {
      control: { type: 'number', min: 0, max: 120 },
      description: 'Seconds before the resend button becomes available on the code-entry step',
    },
  },
  args: {
    open: false,
    isLoading: false,
    resendCooldownSeconds: 60,
  },
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};

export const OtpStepDemo: Story = {
  name: 'OTP — Code Entry Step (manual demo)',
  args: {
    onRequestOtp: async () => true,
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'Email hoặc mật khẩu không hợp lệ',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const NoLinks: Story = {
  args: {
    onForgotPassword: undefined,
    onRegister: undefined,
  },
};

export const EnglishVersion: Story = {
  args: {
    title: 'Sign In',
    subtitle: 'Enter your credentials to continue',
  },
};
