import { UITableStatusDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Status Display',
  component: UITableStatusDisplay,
} satisfies Meta<typeof UITableStatusDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

const colorMap = {
  active: 'success',
  inactive: 'danger',
  pending: 'warning',
  draft: 'muted',
  archived: 'secondary',
} as const;

export const Active: Story = {
  args: {
    value: 'active',
    colorMap,
  },
  render: args => <UITableStatusDisplay {...args} />,
};

export const Pending: Story = {
  args: {
    value: 'pending',
    colorMap,
  },
  render: args => <UITableStatusDisplay {...args} />,
};

export const Inactive: Story = {
  args: {
    value: 'inactive',
    colorMap,
  },
  render: args => <UITableStatusDisplay {...args} />,
};

export const UnknownStatus: Story = {
  args: {
    value: 'unknown_status',
    colorMap,
    defaultColor: 'muted',
  },
  render: args => <UITableStatusDisplay {...args} />,
};

export const SolidVariant: Story = {
  args: {
    value: 'active',
    colorMap,
    variant: 'solid',
  },
  render: args => <UITableStatusDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    value: null,
  },
  render: args => <UITableStatusDisplay {...args} />,
};
