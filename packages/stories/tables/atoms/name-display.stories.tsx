import { UITableNameDisplay } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Name Display',
  component: UITableNameDisplay,
} satisfies Meta<typeof UITableNameDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'This is a very long table name that should be displayed properly within the table cell and also in the tooltip when hovered over to ensure that users can read the full name without any issues.',
  },
  render: args => <UITableNameDisplay {...args} />,
};
