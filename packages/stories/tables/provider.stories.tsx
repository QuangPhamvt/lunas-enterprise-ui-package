import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableProvider } from '@/components/tables';
import type { TMockDataTable } from './mock-data';

const meta = {
  tags: ['autodocs'],
  title: 'Features/Tables/Provider',
  component: TableProvider,
} satisfies Meta<typeof TableProvider<TMockDataTable>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [],
    columns: [],
  },
  render: args => <TableProvider {...args} />,
};
