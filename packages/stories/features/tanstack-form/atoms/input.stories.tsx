import { Input } from '@/components/features/tanstack-form/components/ui/input';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Input',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Input placeholder="Enter text here" />;
  },
};

export const Invalid: Story = {
  render: () => {
    return <Input placeholder="Enter text here" aria-invalid />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <Input placeholder="Enter text here" disabled />;
  },
};

export const ReadOnly: Story = {
  render: () => {
    return <Input placeholder="Enter text here" readOnly />;
  },
};
