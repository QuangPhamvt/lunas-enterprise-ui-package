import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/features/tanstack-form/components/ui/checkbox';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Checkbox',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-3">
        <Checkbox />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-3">
        <Checkbox aria-readonly />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    );
  },
};
