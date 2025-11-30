import { useState } from 'react';

import { NumberInput } from '@/components/features/tanstack-form/components/ui/number-input';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Number Input',
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    decimal: [10, 5],
    allowNegative: true,
    value: null,
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<number | null>(args.value ?? null);
    return (
      <NumberInput
        placeholder="Enter number here"
        {...args}
        value={value}
        onValueChange={value => {
          console.log('onValueChange called with value:', value);
          setValue(value);
        }}
      />
    );
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
