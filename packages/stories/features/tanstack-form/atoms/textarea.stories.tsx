import { Textarea } from '@/components/features/tanstack-form/components/ui/textarea';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/TextArea',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Textarea placeholder="Enter text here" />;
  },
};

export const Invalid: Story = {
  render: () => {
    return <Textarea placeholder="Enter text here" aria-invalid />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <Textarea placeholder="Enter text here" disabled />;
  },
};

export const ReadOnly: Story = {
  render: () => {
    return <Textarea placeholder="Enter text here" readOnly />;
  },
};
