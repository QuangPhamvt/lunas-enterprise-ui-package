import type { Meta, StoryObj } from '@storybook/react';
import { VerifyEmailPage } from '../../components/pages/VerifyEmailPage';

const meta: Meta<typeof VerifyEmailPage> = {
  title: 'Pages/VerifyEmailPage',
  component: VerifyEmailPage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    onOpenChange: { action: 'openChange' },
    email: { control: 'text', description: 'Email address OTP was sent to' },
    onVerify: { action: 'verify' },
    onResend: { action: 'resend' },
    onBack: { action: 'back' },
    isLoading: { control: 'boolean', description: 'Show loading spinner on submit button' },
    errorMessage: { control: 'text', description: 'Server-side error to display' },
    title: { control: 'text', description: 'Dialog heading' },
    subtitle: { control: 'text', description: 'Dialog subheading' },
    resendCooldownSeconds: {
      control: { type: 'number', min: 0, max: 120 },
      description: 'Seconds before the resend button becomes available',
    },
  },
  args: {
    open: false,
    email: 'user@example.com',
    isLoading: false,
    resendCooldownSeconds: 60,
  },
};

export default meta;
type Story = StoryObj<typeof VerifyEmailPage>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    errorMessage: 'Mã OTP không hợp lệ',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const CooldownExpired: Story = {
  name: 'Cooldown Expired (Resend available)',
  args: {
    resendCooldownSeconds: 0,
  },
};

export const NoBack: Story = {
  args: {
    onBack: undefined,
  },
};

export const EnglishVersion: Story = {
  args: {
    title: 'Verify Email',
    subtitle: undefined,
  },
};
