import { UITableStatisticDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Statistic Display',
  component: UITableStatisticDisplay,
} satisfies Meta<typeof UITableStatisticDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1234567.89,
    precision: 2,
    roundingMode: 'round',
    showTrailingZeros: true,
    size: 'md',
    prefix: '$',
    suffix: 'USD',
  },
  render: args => <UITableStatisticDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    value: 0,
    roundingMode: 'round',
    showTrailingZeros: true,
    size: 'md',
    prefix: '$',
    suffix: 'USD',
  },
  render: args => <UITableStatisticDisplay {...args} />,
};

export const Colorized: Story = {
  args: {
    value: 1234567.89,
    precision: 2,
    showTrailingZeros: true,
    size: 'md',
    prefix: '$',
    colorize: true,
  },
  render: args => <UITableStatisticDisplay {...args} />,
};

export const TrendOverride: Story = {
  name: 'Trend Override (independent of sign)',
  args: {
    value: 1234567.89,
    precision: 2,
    showTrailingZeros: true,
    size: 'md',
    prefix: '$',
    trend: 'down',
  },
  render: args => <UITableStatisticDisplay {...args} />,
};
