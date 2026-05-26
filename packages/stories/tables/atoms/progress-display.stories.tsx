import { UITableProgressDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'UI Tables/Atoms/Progress Display',
  component: UITableProgressDisplay,
} satisfies Meta<typeof UITableProgressDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const High: Story = {
  args: {
    value: 85,
    showLabel: true,
  },
  render: args => <UITableProgressDisplay {...args} />,
};

export const Medium: Story = {
  args: {
    value: 55,
    showLabel: true,
  },
  render: args => <UITableProgressDisplay {...args} />,
};

export const Low: Story = {
  args: {
    value: 20,
    showLabel: true,
  },
  render: args => <UITableProgressDisplay {...args} />,
};

export const NoLabel: Story = {
  args: {
    value: 65,
    showLabel: false,
  },
  render: args => <UITableProgressDisplay {...args} />,
};

export const CustomThresholds: Story = {
  args: {
    value: 60,
    showLabel: true,
    successThreshold: 80,
    warningThreshold: 50,
  },
  render: args => <UITableProgressDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    value: null,
  },
  render: args => <UITableProgressDisplay {...args} />,
};
