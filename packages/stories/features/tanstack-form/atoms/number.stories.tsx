import { NumberInput } from '@/components/features/tanstack-form/components/ui/number-input';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Number Input',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <NumberInput placeholder="Enter number here" />;
  },
};

export const Invalid: Story = {
  render: () => {
    return <NumberInput placeholder="Enter number here" aria-invalid />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <NumberInput placeholder="Enter number here" disabled />;
  },
};

export const ReadOnly: Story = {
  render: () => {
    return <NumberInput placeholder="Enter number here" readOnly />;
  },
};
