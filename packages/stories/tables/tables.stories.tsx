import { sleep } from '@customafk/react-toolkit/utils/sleep';

import {
  UITableContainer,
  UITableFilter,
  UITableProvider,
  UITableTooltip,
  UITableTooltipActions,
  UITableTooltipFilter,
  UITableWrapper,
} from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockDataColumns, MockDataTables, type TMockDataTable } from './mock-data';

const meta: Meta<typeof UITableProvider<TMockDataTable>> = {
  tags: ['autodocs'],
  title: 'UI Tables',
  component: UITableProvider,
  subcomponents: {
    UITableTooltip,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Mock Data Table',
    columns: MockDataColumns,
    data: MockDataTables,
    // data: [],
    totalRows: MockDataTables.length + 2,

    isFetching: false,
    isRefetching: false,

    fetchMoreData: async () => {
      await sleep(2000);
      console.log('Fetch more data...');
      // throw new Error('No more data to fetch');
    },

    leftPinnedColumns: ['column_1', 'column_2'],

    keyOfClickRow: 'column_12',
    onClickRow: (rowIndex, rowId) => {
      console.log('Clicked row:', rowIndex, 'Row ID:', rowId);
    },
  },
  render: ({ children, ...args }) => {
    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <UITableProvider {...args}>
          <UITableWrapper>
            <UITableTooltip>
              <UITableTooltipFilter
                onSearch={value => {
                  console.log('value', value);
                }}
              />
              <UITableTooltipActions />
            </UITableTooltip>
            <UITableContainer>{/*<UITableFilter />*/}</UITableContainer>
          </UITableWrapper>
        </UITableProvider>
      </div>
    );
  },
};
