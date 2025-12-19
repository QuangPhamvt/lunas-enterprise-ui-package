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
  title: 'Features/UI Tables',
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
    totalRows: MockDataTables.length + 2,
    fetchMoreData: async () => {
      console.log('Fetch more data...');
    },
  },
  render: ({ children, ...args }) => {
    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <UITableProvider {...args}>
          <UITableWrapper>
            <UITableTooltip>
              <UITableTooltipFilter />
              <UITableTooltipActions />
            </UITableTooltip>
            <UITableContainer>
              <UITableFilter />
            </UITableContainer>
          </UITableWrapper>
        </UITableProvider>
      </div>
    );
  },
};
