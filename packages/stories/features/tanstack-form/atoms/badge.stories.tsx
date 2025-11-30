import { Badge } from '@/components/features/tanstack-form/components/ui/badge';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: 'Default Badge',
    color: 'default',
    size: 'sm',
  },
};
