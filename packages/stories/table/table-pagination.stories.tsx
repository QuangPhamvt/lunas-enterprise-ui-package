import { DataTablePagination } from '@/components/table/data-table-pagination';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Table/Pagination',
  component: DataTablePagination,
} satisfies Meta<typeof DataTablePagination>;

export default meta;
type Story = StoryObj<typeof DataTablePagination>;

export const Default: Story = {
  args: {
    filteredRowsLength: 100,
    filteredSelectedRowsLength: 10,
    pageIndex: 0,
    pageSize: 20,
    setPageIndex: index => console.log('Set page index to', index),
    setPageSize: size => console.log('Set page size to', size),
    canNextPage: true,
    canPreviousPage: false,
    nextPage: () => console.log('Next page'),
    previousPage: () => console.log('Previous page'),
    pageCount: 5,
  },
};
