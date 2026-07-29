import { UITableCurrencyDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Currency Display',
  component: UITableCurrencyDisplay,
} satisfies Meta<typeof UITableCurrencyDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1234567.89,
    currency: 'USD',
    locale: 'en-US',
    size: 'md',
  },
  render: args => <UITableCurrencyDisplay {...args} />,
};

export const Colorized: Story = {
  args: {
    value: 9800.5,
    currency: 'USD',
    colorize: true,
    size: 'md',
  },
  render: args => <UITableCurrencyDisplay {...args} />,
};

export const ColorizedNegative: Story = {
  args: {
    value: -450.0,
    currency: 'USD',
    colorize: true,
    size: 'md',
  },
  render: args => <UITableCurrencyDisplay {...args} />,
};

export const Euro: Story = {
  args: {
    value: 2500.0,
    currency: 'EUR',
    locale: 'de-DE',
    size: 'md',
  },
  render: args => <UITableCurrencyDisplay {...args} />,
};

export const JapaneseYen: Story = {
  args: {
    value: 150000,
    currency: 'JPY',
    locale: 'ja-JP',
    size: 'md',
  },
  render: args => <UITableCurrencyDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    value: null,
  },
  render: args => <UITableCurrencyDisplay {...args} />,
};
