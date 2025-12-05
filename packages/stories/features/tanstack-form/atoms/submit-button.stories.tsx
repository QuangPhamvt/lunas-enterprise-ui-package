import { SubmitButton } from '@/components/features/tanstack-form/components/ui/submit-button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Submit Button',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <SubmitButton />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <SubmitButton disabled />;
  },
};

export const Loading: Story = {
  render: () => {
    return <SubmitButton isSubmitting />;
  },
};
