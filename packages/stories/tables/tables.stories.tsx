import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableContainer, TableProvider, TableTooltip, TableTooltipActions, TableTooltipFilter, TableWrapper } from '@/components/tables';
import { MockDataColumns, MockDataTables, type TMockDataTable } from './mock-data';

const meta: Meta<typeof TableProvider<TMockDataTable>> = {
  tags: ['autodocs'],
  title: 'Features/Tables',
  component: TableProvider,
  subcomponents: {
    TableTooltip,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Mock Data Table',
    columns: MockDataColumns,
    data: MockDataTables,
  },
  render: ({ children, ...args }) => {
    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <TableProvider {...args}>
          <TableWrapper>
            <TableTooltip>
              <TableTooltipFilter />
              <TableTooltipActions />
            </TableTooltip>
            <TableContainer />
          </TableWrapper>
        </TableProvider>
      </div>
    );
  },
};

export const EmptyData: Story = {
  args: {
    ...Default.args,
    data: [],
  },
  render: ({ children, ...args }) => {
    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <TableProvider {...args}>
          <TableWrapper>
            <TableTooltip>
              <TableTooltipFilter />
              <TableTooltipActions />
            </TableTooltip>
            <TableContainer />
          </TableWrapper>
        </TableProvider>
      </div>
    );
  },
};
