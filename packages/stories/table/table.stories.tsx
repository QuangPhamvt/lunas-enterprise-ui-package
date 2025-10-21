import { MoreVerticalIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { NameDisplay } from '@/components/data-display/name';
import { Table } from '@/components/table';
import { mockData } from './mockdata';

const meta = {
  tags: ['autodocs'],
  title: 'Table/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    data: mockData,
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 240,
        cell: ({ row }) => {
          return <NameDisplay name={row.original?.name as string} />;
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_1',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_2',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_3',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_4',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_5',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_6',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_7',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_8',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_9',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_10',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_11',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'description_12',
        header: 'Description',
        cell: ({ row }) => row.original?.description,
        size: 200,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => row.original?.description,
        size: 240,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => row.original?.description,
        size: 240,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: () => (
          <div className="w-full flex items-center justify-center z-50">
            <button
              className="text-blue-500 size-8 flex items-center justify-center"
              onClick={e => {
                e.stopPropagation();
                console.log('Action clicked');
              }}
            >
              <MoreVerticalIcon size={16} />
            </button>
          </div>
        ),
      },
    ],
    onAdd: () => console.log('Add new item'),
    onClickRow: row => console.log('Row clicked:', row),
    onRefresh: () => console.log('Refresh data'),
  },
  render: args => {
    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <Table {...args} data={args.data} columns={args.columns} />
      </div>
    );
  },
};
