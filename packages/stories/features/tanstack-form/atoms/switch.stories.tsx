import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/features/tanstack-form/components/ui/switch';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Switch',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const id = useId();
    return (
      <div className="flex items-center space-x-2">
        <Switch id={id} />
        <Label htmlFor={id}>Airplane Mode</Label>
      </div>
    );
  },
};
