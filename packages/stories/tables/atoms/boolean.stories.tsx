import { UITableBooleanDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Boolean Display',
  component: UITableBooleanDisplay,
} satisfies Meta<typeof UITableBooleanDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: true,
  },
  render: args => <UITableBooleanDisplay {...args} />,
};

export const False: Story = {
  args: {
    value: false,
  },
  render: args => <UITableBooleanDisplay {...args} />,
};

export const Empty: Story = {
  args: {
    value: null,
  },
  render: args => <UITableBooleanDisplay {...args} />,
};
