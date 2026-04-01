import { UITableBooleanDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'UI Tables/Atoms/Boolean Display',
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

export const Empty: Story = {
  args: {
    value: null,
  },
  render: args => <UITableBooleanDisplay {...args} />,
};
