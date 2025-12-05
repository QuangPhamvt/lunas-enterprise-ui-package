import { CancelButton } from '@/components/features/tanstack-form/components/ui/cancel-button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Cancel Button',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <CancelButton />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <CancelButton disabled />;
  },
};
