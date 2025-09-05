import { Table } from '@/components/table'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Table',
  component: Table,
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {
    data: [
      {
        name: 'Item 1',
        description: 'This is item 1',
        quantity: 10,
        createdAt: '2024-01-01',
      },
      {
        name: 'Item 2',
        description: 'This is item 2',
        quantity: 5,
        createdAt: '2024-02-01',
      },
      {
        name: 'Item 3',
        description: 'This is item 3',
        quantity: 15,
        createdAt: '2024-03-01',
      },
      {
        name: 'Item 4',
        description: 'This is item 4',
        quantity: 8,
        createdAt: '2024-04-01',
      },
      {
        name: 'Item 5',
        description: 'This is item 5',
        quantity: 12,
        createdAt: '2024-05-01',
      },
      {
        name: 'Item 6',
        description: 'This is item 6',
        quantity: 20,
        createdAt: '2024-06-01',
      },
      {
        name: 'Item 7',
        description: 'This is item 7',
        quantity: 7,
        createdAt: '2024-07-01',
      },
      {
        name: 'Item 8',
        description: 'This is item 8',
        quantity: 3,
        createdAt: '2024-08-01',
      },
      {
        name: 'Item 9',
        description: 'This is item 9',
        quantity: 18,
        createdAt: '2024-09-01',
      },
      {
        name: 'Item 10',
        description: 'This is item 10',
        quantity: 9,
        createdAt: '2024-10-01',
      },
      {
        name: 'Item 11',
        description: 'This is item 11',
        quantity: 14,
        createdAt: '2024-11-01',
      },
      {
        name: 'Item 12',
        description: 'This is item 12',
        quantity: 6,
        createdAt: '2024-12-01',
      },
      {
        name: 'Item 13',
        description: 'This is item 13',
        quantity: 11,
        createdAt: '2024-12-15',
      },
      {
        name: 'Item 14',
        description: 'This is item 14',
        quantity: 4,
        createdAt: '2024-12-20',
      },
      {
        name: 'Item 15',
        description: 'This is item 15',
        quantity: 16,
        createdAt: '2024-12-25',
      },
      {
        name: 'Item 16',
        description: 'This is item 16',
        quantity: 2,
        createdAt: '2024-12-30',
      },
    ],
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 120,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 200,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 80,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        size: 120,
      },
    ],
    onAdd: () => console.log('Add new item'),
    onRefresh: () => console.log('Refresh data'),
  },
  render: (args) => {
    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <Table {...args} />
      </div>
    )
  },
}
