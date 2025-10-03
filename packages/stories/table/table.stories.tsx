import { NameDisplay } from '@/components/data-display/name'
import { Table } from '@/components/table'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Table/Table',
  component: Table,
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {
    data: [
      {
        name: 'Long Item Item Item Item Item Long Long Long Long Long Long Long Long Long Long Long Long',
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
      {
        name: 'Item 17',
        description: 'This is item 17',
        quantity: 13,
        createdAt: '2024-12-31',
      },
      {
        name: 'Item 18',
        description: 'This is item 18',
        quantity: 1,
        createdAt: '2025-01-01',
      },
      {
        name: 'Item 19',
        description: 'This is item 19',
        quantity: 17,
        createdAt: '2025-01-02',
      },
      {
        name: 'Item 20',
        description: 'This is item 20',
        quantity: 19,
        createdAt: '2025-01-03',
      },
      {
        name: 'Item 21',
        description: 'This is item 21',
        quantity: 21,
        createdAt: '2025-01-04',
      },
      {
        name: 'Item 22',
        description: 'This is item 22',
        quantity: 22,
        createdAt: '2025-01-05',
      },
      {
        name: 'Item 23',
        description: 'This is item 23',
        quantity: 23,
        createdAt: '2025-01-06',
      },
      {
        name: 'Item 24',
        description: 'This is item 24',
        quantity: 24,
        createdAt: '2025-01-07',
      },
      {
        name: 'Item 25',
        description: 'This is item 25',
        quantity: 25,
        createdAt: '2025-01-08',
      },
      {
        name: 'Item 26',
        description: 'This is item 26',
        quantity: 26,
        createdAt: '2025-01-09',
      },
      {
        name: 'Item 27',
        description: 'This is item 27',
        quantity: 27,
        createdAt: '2025-01-10',
      },
      {
        name: 'Item 28',
        description: 'This is item 28',
        quantity: 28,
        createdAt: '2025-01-11',
      },
      {
        name: 'Item 29',
        description: 'This is item 29',
        quantity: 29,
        createdAt: '2025-01-12',
      },
      {
        name: 'Item 30',
        description: 'This is item 30',
        quantity: 30,
        createdAt: '2025-01-13',
      },
      {
        name: 'Item 31',
        description: 'This is item 31',
        quantity: 31,
        createdAt: '2025-01-14',
      },
      {
        name: 'Item 32',
        description: 'This is item 32',
        quantity: 32,
        createdAt: '2025-01-15',
      },
      {
        name: 'Item 33',
        description: 'This is item 33',
        quantity: 33,
        createdAt: '2025-01-16',
      },
      {
        name: 'Item 34',
        description: 'This is item 34',
        quantity: 34,
        createdAt: '2025-01-17',
      },
      {
        name: 'Item 35',
        description: 'This is item 35',
        quantity: 35,
        createdAt: '2025-01-18',
      },
      {
        name: 'Item 36',
        description: 'This is item 36',
        quantity: 36,
        createdAt: '2025-01-19',
      },
    ],
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 240,
        cell: ({ row }) => {
          return <NameDisplay name={row.original?.name as string} />
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 200,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 240,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        size: 480,
      },
    ],
    onAdd: () => console.log('Add new item'),
    onClickRow: (row) => console.log('Row clicked:', row),
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
