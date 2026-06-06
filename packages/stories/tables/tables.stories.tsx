'use client';

import { useState } from 'react';

import type { RowSelectionState } from '@tanstack/react-table';

import { sleep } from '@customafk/react-toolkit/utils/sleep';

import type { ActiveFilter, CsvCell, FilterDefinition, TUITableColumn } from '@/components/features/tables';
import {
  UITableBooleanDisplay,
  UITableContainer,
  UITableCurrencyDisplay,
  UITableFilter,
  UITableProvider,
  UITableStatusDisplay,
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

// ─── Shared render helper ────────────────────────────────────────────────────

const TableShell = (args: React.ComponentProps<typeof UITableProvider<TMockDataTable>>) => (
  <div className="h-[calc(100vh-4rem)] w-full">
    <UITableProvider {...args}>
      <UITableWrapper>
        <UITableTooltip>
          <UITableTooltipFilter onSearch={value => console.log('search:', value)} />
          <UITableTooltipActions />
        </UITableTooltip>
        <UITableContainer />
      </UITableWrapper>
    </UITableProvider>
  </div>
);

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Mock Data Table',
    columns: MockDataColumns,
    data: MockDataTables,
    totalRows: MockDataTables.length + 2,
    isFetching: false,
    isRefetching: false,
    isLoading: false,
    fetchMoreData: async () => {
      await sleep(2000);
      console.log('Fetch more data...');
    },
    leftPinnedColumns: ['column_1'],
    rightPinnedColumns: ['column_13', 'column_11'],
    keyOfClickRow: 'column_12',
    onClickRow: (rowIndex, rowId) => {
      console.log('Clicked row:', rowIndex, 'Row ID:', rowId);
    },
  },
  render: ({ children: _children, ...args }) => <TableShell {...args} />,
};

// ─── Loading ─────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    title: 'Loading State',
    columns: MockDataColumns,
    data: [],
    isFetching: true,
    isRefetching: true,
    loadingDisplayRow: 5,
  },
  render: ({ children: _children, ...args }) => <TableShell {...args} />,
};

// ─── Empty ───────────────────────────────────────────────────────────────────

export const Empty: Story = {
  args: {
    title: 'Empty State',
    columns: MockDataColumns,
    data: [],
    isFetching: false,
  },
  render: ({ children: _children, ...args }) => <TableShell {...args} />,
};

// ─── Refetching ───────────────────────────────────────────────────────────────

export const Refetching: Story = {
  args: {
    title: 'Background Refetch',
    columns: MockDataColumns,
    data: MockDataTables.slice(0, 5),
    totalRows: MockDataTables.length,
    isFetching: false,
    isRefetching: true,
    loadingDisplayRow: 5,
  },
  render: ({ children: _children, ...args }) => <TableShell {...args} />,
};

// ─── With Filter Panel ────────────────────────────────────────────────────────

export const WithFilterPanel: Story = {
  name: 'With Filter Panel',
  args: {
    title: 'Filter Panel',
    columns: MockDataColumns,
    data: MockDataTables,
    totalRows: MockDataTables.length,
    leftPinnedColumns: ['column_1'],
    rightPinnedColumns: ['column_13'],
    filterDefinitions: [
      { id: 'column_2', label: 'Column 2', type: 'text' },
      { id: 'column_4', label: 'Column 4', type: 'number' },
    ],
  },
  render: ({ children: _children, ...args }) => (
    <div className="h-[calc(100vh-4rem)] w-full">
      <UITableProvider {...args} onFilterChange={filters => console.log('filters:', filters)}>
        <UITableWrapper>
          <UITableTooltip>
            <UITableTooltipFilter onSearch={value => console.log('search:', value)} />
            <UITableTooltipActions />
          </UITableTooltip>
          <UITableContainer>
            <UITableFilter />
          </UITableContainer>
        </UITableWrapper>
      </UITableProvider>
    </div>
  ),
};

// ─── Row Selection Tracking ───────────────────────────────────────────────────

export const RowSelectionTracking: Story = {
  name: 'Row Selection Tracking',
  args: {
    title: 'Row Selection',
    columns: MockDataColumns,
    data: MockDataTables,
    totalRows: MockDataTables.length,
    leftPinnedColumns: ['column_1'],
  },
  render: ({ children: _children, ...args }) => {
    const [selected, setSelected] = useState<RowSelectionState>({});
    const count = Object.values(selected).filter(Boolean).length;

    return (
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col gap-2">
        <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm">
          <span className="font-medium">Selected rows:</span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-text-negative">{count}</span>
          {count > 0 && (
            <span className="text-text-positive-weak">
              IDs:{' '}
              {Object.keys(selected)
                .filter(k => selected[k])
                .join(', ')}
            </span>
          )}
        </div>
        <div className="min-h-0 flex-1">
          <UITableProvider {...args} onRowSelection={setSelected}>
            <UITableWrapper>
              <UITableTooltip>
                <UITableTooltipFilter />
                <UITableTooltipActions />
              </UITableTooltip>
              <UITableContainer />
            </UITableWrapper>
          </UITableProvider>
        </div>
      </div>
    );
  },
};

// ─── With CSV Export ──────────────────────────────────────────────────────────

type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  salary: number;
  active: boolean;
};

const UserColumns: TUITableColumn<TUser>[] = [
  { accessorKey: 'select', size: 60 },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
    size: 200,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => <span className="text-text-positive-weak">{getValue<string>()}</span>,
    size: 240,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => <span className="capitalize">{getValue<string>()}</span>,
    size: 140,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <UITableStatusDisplay value={getValue<string>()} colorMap={{ active: 'success', inactive: 'danger', pending: 'warning', invited: 'info' }} />
    ),
    size: 120,
  },
  {
    id: 'salary',
    accessorKey: 'salary',
    header: 'Salary',
    cell: ({ getValue }) => <UITableCurrencyDisplay value={getValue<number>()} currency="USD" />,
    size: 140,
    meta: { position: 'end' },
  },
  {
    id: 'active',
    accessorKey: 'active',
    header: 'Active',
    cell: ({ getValue }) => <UITableBooleanDisplay value={getValue<boolean>()} />,
    size: 80,
    meta: { position: 'center' },
  },
];

const UserData: TUser[] = [
  { id: 'u1', name: 'Alice Martin', email: 'alice@example.com', role: 'admin', status: 'active', salary: 92000, active: true },
  { id: 'u2', name: 'Bob Chen', email: 'bob@example.com', role: 'developer', status: 'active', salary: 84500, active: true },
  { id: 'u3', name: 'Clara Smith', email: 'clara@example.com', role: 'designer', status: 'pending', salary: 76000, active: false },
  { id: 'u4', name: 'David Lee', email: 'david@example.com', role: 'developer', status: 'inactive', salary: 79000, active: false },
  { id: 'u5', name: 'Eva Torres', email: 'eva@example.com', role: 'manager', status: 'active', salary: 110000, active: true },
  { id: 'u6', name: 'Frank Nguyen', email: 'frank@example.com', role: 'developer', status: 'invited', salary: 68000, active: false },
  { id: 'u7', name: 'Grace Kim', email: 'grace@example.com', role: 'designer', status: 'active', salary: 81000, active: true },
  { id: 'u8', name: 'Henry Patel', email: 'henry@example.com', role: 'admin', status: 'active', salary: 95000, active: true },
];

const UserCsvData: CsvCell[][] = UserData.map(user => [
  { label: 'Name', value: user.name },
  { label: 'Email', value: user.email },
  { label: 'Role', value: user.role },
  { label: 'Status', value: user.status },
  { label: 'Salary (USD)', value: user.salary },
  { label: 'Active', value: user.active },
]);

export const WithCsvExport: Story = {
  name: 'With CSV Export',
  render: () => (
    <div className="h-[calc(100vh-4rem)] w-full">
      <UITableProvider<TUser>
        title="Users"
        columns={UserColumns}
        data={UserData}
        totalRows={UserData.length}
        leftPinnedColumns={['name']}
        csvData={UserCsvData}
        csvFileName="users-export"
        onRowSelection={sel => console.log('selection:', sel)}
      >
        <UITableWrapper>
          <UITableTooltip>
            <UITableTooltipFilter onSearch={v => console.log('search:', v)} />
            <UITableTooltipActions />
          </UITableTooltip>
          <UITableContainer />
        </UITableWrapper>
      </UITableProvider>
    </div>
  ),
};

// ─── No Toolbar / Minimal ─────────────────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal (no toolbar, no fetch-more)',
  args: {
    title: 'Minimal Table',
    columns: MockDataColumns,
    data: MockDataTables.slice(0, 8),
    totalRows: 8,
  },
  render: ({ children: _children, ...args }) => (
    <div className="h-[calc(100vh-4rem)] w-full">
      <UITableProvider {...args}>
        <UITableWrapper>
          <UITableContainer />
        </UITableWrapper>
      </UITableProvider>
    </div>
  ),
};

// ─── With Advanced Filters ────────────────────────────────────────────────────

/**
 * All six filter types — Tag, Single Tag, Date Range, Number, Text, Boolean — wired to
 * the Users dataset.  Use the "Filters" tab in the side panel to add filters.
 * Active filter state is reflected in the debug panel below the table.
 */

const USER_FILTER_DEFINITIONS: FilterDefinition[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'tag',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
      { label: 'Invited', value: 'invited' },
    ],
  },
  {
    id: 'role',
    label: 'Role',
    type: 'tag',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Developer', value: 'developer' },
      { label: 'Designer', value: 'designer' },
      { label: 'Manager', value: 'manager' },
    ],
  },
  {
    id: 'primary_role',
    label: 'Primary Role',
    type: 'single-tag',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Developer', value: 'developer' },
      { label: 'Designer', value: 'designer' },
      { label: 'Manager', value: 'manager' },
    ],
  },
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'salary', label: 'Salary', type: 'number' },
  { id: 'active', label: 'Is Active', type: 'boolean' },
  { id: 'joined', label: 'Joined Date', type: 'date-range' },
];

export const WithAdvancedFilters: Story = {
  name: 'With Advanced Filters',
  render: () => {
    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

    return (
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col gap-2">
        {/* Active filter debug panel */}
        <div className="shrink-0 rounded-md border border-border bg-card px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-text-positive text-nowrap shrink-0">Active filters</span>
            {activeFilters.length === 0 ? (
              <span className="text-xs text-text-positive-muted">None — open the Filters tab and click Add Filter</span>
            ) : (
              <div className="flex flex-wrap gap-2 w-full">
                {activeFilters.map(f => {
                  const def = USER_FILTER_DEFINITIONS.find(d => d.id === f.definitionId);
                  return (
                    <span
                      key={f.id}
                      className="inline-flex flex-1 items-center gap-1 rounded-full bg-primary-bg-subtle px-2.5 py-0.5 text-xs font-medium text-primary-intense"
                    >
                      {def?.label ?? f.definitionId}
                      <span className="text-primary-weak">·</span>
                      <span className="font-normal opacity-75 flex-1">{JSON.stringify(f.value)}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="min-h-0 flex-1">
          <UITableProvider<TUser>
            title="Users"
            columns={UserColumns}
            data={UserData}
            totalRows={UserData.length}
            leftPinnedColumns={['name']}
            filterDefinitions={USER_FILTER_DEFINITIONS}
            onFilterChange={setActiveFilters}
          >
            <UITableWrapper>
              <UITableTooltip>
                <UITableTooltipFilter onSearch={v => console.log('search:', v)} />
                <UITableTooltipActions />
              </UITableTooltip>
              <UITableContainer>
                <UITableFilter />
              </UITableContainer>
            </UITableWrapper>
          </UITableProvider>
        </div>
      </div>
    );
  },
};
