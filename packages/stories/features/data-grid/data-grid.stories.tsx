import { sleep } from '@customafk/react-toolkit/utils/sleep';

import { DataGrid } from '@/components/features/data-grid/data-grid';
import type { DataGridColumnDef } from '@/components/features/data-grid/types';

import type { Meta, StoryObj } from '@storybook/react-vite';

const Columns: DataGridColumnDef<{
  firstField: string;
  secondField: number;
  thirdField: string;
}>[] = [
  {
    id: 'first-field',
    accessorKey: 'First Field',
    header: 'First Field',
    cell: info => info.row.original.firstField,
    size: 240,
    field: {
      type: 'text-field',
      name: 'firstField',
      rules: {
        required: true,
        minLength: 5,
        maxLength: 20,
      },
    },
  },
  {
    id: 'second-field',
    accessorKey: 'Second Field',
    header: 'Second Field',
    cell: info => info.row.original.secondField,
    size: 200,
    field: {
      type: 'number-field',
      name: 'secondField',
      rules: {
        required: true,
        minValue: 0,
        maxValue: 10000,
      },
    },
  },
  {
    id: 'third-field',
    accessorKey: 'Third Field',
    header: 'Third Field',
    cell: info => info.row.original.thirdField,
    field: {
      type: 'select-field',
      name: 'thirdField',
      options: [
        { label: 'Option 1', value: 'option_1' },
        { label: 'Option 2', value: 'option_2' },
        { label: 'Option 3', value: 'option_3' },
      ],
      rules: {
        required: true,
      },
    },
  },
];

const Data: {
  firstField: string;
  secondField: number;
  thirdField: string;
}[] = [
  {
    firstField: 'Row 1 - First Field Field Field Field',
    secondField: 1234,
    thirdField: 'option_3',
  },
  {
    firstField: 'Row 2 - First Field',
    secondField: 123,
    thirdField: 'option_1',
  },
  {
    firstField: 'Row 3 - First Field',
    secondField: 123,
    thirdField: 'option_2',
  },
];

const meta = {
  tags: ['autodocs'],
  title: 'Features/Data Grid',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <DataGrid<{
        firstField: string;
        secondField: number;
        thirdField: string;
      }>
        columns={Columns}
        data={Data}
        onCreateField={async data => {
          await sleep(2000);
          console.log('Created Data:', data);
        }}
        onUpdateField={async data => {
          await sleep(2000);
          console.log('Updated Data:', data);
        }}
        onDeleteField={async data => {
          await sleep(2000);
          console.log('Deleted Data:', data);
        }}
      />
    );
  },
};
