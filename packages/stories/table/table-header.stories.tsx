import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTableToolip } from '@/components/table/data-table-tooltip';

const meta = {
  tags: ['autodocs'],
  title: 'Table/Header',
  component: DataTableToolip,
} satisfies Meta<typeof DataTableToolip>;

export default meta;
type Story = StoryObj<typeof DataTableToolip>;

export const Default: Story = {
  args: {
    onAdd: () => console.log('Add new item'),
    onRefresh: () => console.log('Refresh table'),
  },
};
