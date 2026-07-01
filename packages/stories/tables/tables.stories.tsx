'use client';

import { useState } from 'react';

import type { RowSelectionState } from '@tanstack/react-table';

import { sleep } from '@customafk/react-toolkit/utils/sleep';

import type { ActiveFilter, CsvCell, FilterDefinition, SummaryItem, TUITableColumn } from '@/components/features/tables';
import {
  UITableAnalysisPanel,
  UITableAvatarNameDisplay,
  UITableBooleanDisplay,
  UITableContainer,
  UITableCurrencyDisplay,
  UITableFilter,
  UITableProvider,
  UITableStatusDisplay,
  UITableSummaryBar,
  UITableTooltip,
  UITableTooltipActions,
  UITableTooltipFilter,
  UITableWrapper,
} from '@/components/features/tables';

import { Button } from '@/components/ui/button';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { generateMockCsvData, MockDataColumns, MockDataFilterDefinitions, MockDataTables, type TMockDataTable } from './mock-data';

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

// ─── Default — Full Feature Demo ─────────────────────────────────────────────

export const Default: Story = {
  name: 'Full Feature Demo',
  render: () => {
    const totalSalary = MockDataTables.reduce((sum, u) => sum + u.salary, 0);
    const activeCount = MockDataTables.filter(u => u.active).length;

    const summary: SummaryItem[] = [
      { label: 'Tổng nhân viên', value: MockDataTables.length, description: 'Tất cả' },
      {
        label: 'Đang hoạt động',
        value: activeCount,
        trend: 'up',
        description: `${Math.round((activeCount / MockDataTables.length) * 100)}% tổng số`,
      },
      { label: 'Tổng lương', value: totalSalary, suffix: ' ₫', precision: 0, trend: 'neutral' },
      {
        label: 'Lương trung bình',
        value: Math.round(totalSalary / MockDataTables.length),
        suffix: ' ₫',
        precision: 0,
        description: 'Mỗi nhân viên',
      },
    ];

    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <UITableProvider<TMockDataTable>
          title="Nhân viên"
          description="Danh sách nhân viên trong công ty"
          columns={MockDataColumns}
          data={MockDataTables}
          totalRows={MockDataTables.length + 10}
          leftPinnedColumns={['name']}
          rightPinnedColumns={['salary']}
          summary={summary}
          showAnalysisPanel
          csvData={generateMockCsvData(MockDataTables)}
          csvFileName="employees-export"
          filterDefinitions={MockDataFilterDefinitions}
          onRowSelection={sel => console.log('selection:', sel)}
          onFilterChange={filters => console.log('filters:', filters)}
          keyOfClickRow="name"
          // onClickRow={(idx, id) => console.log('clicked row:', idx, id)}
          fetchMoreData={async () => {
            await sleep(2000);
            console.log('Fetch more data...');
          }}
        >
          <UITableWrapper>
            <UITableTooltip>
              <UITableTooltipFilter onSearch={v => console.log('search:', v)} />
              <UITableTooltipActions />
            </UITableTooltip>
            <UITableSummaryBar />
            <UITableContainer>
              <UITableFilter />
            </UITableContainer>
            <UITableAnalysisPanel />
          </UITableWrapper>
        </UITableProvider>
      </div>
    );
  },
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
    leftPinnedColumns: ['name'],
    rightPinnedColumns: ['salary'],
    filterDefinitions: MockDataFilterDefinitions,
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
    leftPinnedColumns: ['name'],
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

// ─── Columns with aggregation config ─────────────────────────────────────────

const UserColumnsWithAggregation: TUITableColumn<TUser>[] = [
  { accessorKey: 'select', size: 60 },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
    size: 200,
    meta: { aggregation: { type: 'count', label: 'Headcount' } },
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
    size: 160,
    meta: {
      position: 'end',
      aggregation: { type: 'sum', prefix: '$', precision: 0, label: 'Total Payroll' },
    },
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

// ─── With Summary Cards ───────────────────────────────────────────────────────

export const WithSummaryCards: Story = {
  name: 'With Summary Cards',
  render: () => {
    const totalSalary = UserData.reduce((sum, u) => sum + u.salary, 0);
    const activeCount = UserData.filter(u => u.active).length;
    const avgSalary = Math.round(totalSalary / UserData.length);

    const summary: SummaryItem[] = [
      { label: 'Total Employees', value: UserData.length, description: 'All time' },
      { label: 'Active', value: activeCount, trend: 'up', description: `${Math.round((activeCount / UserData.length) * 100)}% of total` },
      { label: 'Total Payroll', value: totalSalary, prefix: '$', precision: 0, trend: 'neutral' },
      { label: 'Avg. Salary', value: avgSalary, prefix: '$', precision: 0, description: 'Per employee' },
    ];

    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <UITableProvider<TUser>
          title="Team Overview"
          columns={UserColumnsWithAggregation}
          data={UserData}
          totalRows={UserData.length}
          leftPinnedColumns={['name']}
          summary={summary}
        >
          <UITableWrapper>
            <UITableSummaryBar />
            <UITableTooltip>
              <UITableTooltipFilter onSearch={v => console.log('search:', v)} />
              <UITableTooltipActions />
            </UITableTooltip>
            <UITableContainer />
          </UITableWrapper>
        </UITableProvider>
      </div>
    );
  },
};

// ─── With Footer Aggregations ─────────────────────────────────────────────────

export const WithFooterAggregations: Story = {
  name: 'With Footer Aggregations',
  render: () => (
    <div className="h-[calc(100vh-4rem)] w-full">
      <UITableProvider<TUser>
        title="Salary Summary"
        columns={UserColumnsWithAggregation}
        data={UserData}
        totalRows={UserData.length}
        leftPinnedColumns={['name']}
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

// ─── Team Members ────────────────────────────────────────────────────────────

type TTeamMember = {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  department: string;
  contactNumber: string;
  status: 'Active' | 'Pending' | 'Offline';
  joinedDate: string;
  workflow: number;
};

const TeamMemberColumns: TUITableColumn<TTeamMember>[] = [
  { accessorKey: 'select', size: 60 },
  { accessorKey: 'id', header: 'ID', size: 100 },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Members Name',
    size: 200,
    cell: ({ row }) => <UITableAvatarNameDisplay name={row.original.name} uuid={row.original.id} avatarUrl={row.original.avatarUrl} />,
  },
  { accessorKey: 'role', header: 'Role', size: 120 },
  { accessorKey: 'department', header: 'Department', size: 140 },
  { accessorKey: 'contactNumber', header: 'Contact Number', size: 160 },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    cell: ({ getValue }) => <UITableStatusDisplay value={getValue<string>()} colorMap={{ Active: 'success', Pending: 'warning', Offline: 'muted' }} />,
  },
  {
    id: 'joinedDate',
    accessorKey: 'joinedDate',
    header: 'Joined Date',
    size: 140,
    cell: ({ getValue }) => <span className="text-text-positive-weak text-sm">{getValue<string>()}</span>,
  },
  {
    id: 'workflow',
    accessorKey: 'workflow',
    header: 'Workflow',
    size: 100,
    meta: { position: 'center' },
    cell: ({ getValue }) => {
      const pct = getValue<number>();
      const color = pct >= 61 ? 'text-success' : pct >= 31 ? 'text-warning' : 'text-danger';
      return <span className={`font-medium text-sm ${color}`}>{pct}%</span>;
    },
  },
];

const TeamMemberData: TTeamMember[] = [
  {
    id: 'MBR-008',
    name: 'Alexander Montgomery',
    role: 'Editor',
    department: 'Marketing',
    contactNumber: '+1 (202) 555-0143',
    status: 'Active',
    joinedDate: '01 Jan, 2026',
    workflow: 33,
  },
  {
    id: 'MBR-001',
    name: 'Nathaniel Richardson',
    role: 'Owner',
    department: 'Engineering',
    contactNumber: '+1 (303) 555-0198',
    status: 'Active',
    joinedDate: '01 Dec, 2025',
    workflow: 24,
  },
  {
    id: 'MBR-012',
    name: 'Theodore Whitmore',
    role: 'Editor',
    department: 'Design',
    contactNumber: '+1 (415) 555-0127',
    status: 'Pending',
    joinedDate: '30 Nov, 2025',
    workflow: 0,
  },
  {
    id: 'MBR-007',
    name: 'Edward Kensington',
    role: 'Admin',
    department: 'Marketing',
    contactNumber: '+1 (646) 555-0175',
    status: 'Active',
    joinedDate: '01 Oct, 2025',
    workflow: 10,
  },
  {
    id: 'MBR-015',
    name: 'Benjamin Calloway',
    role: 'Devops',
    department: 'Engineering',
    contactNumber: '+1 (212) 555-0169',
    status: 'Offline',
    joinedDate: '25 May, 2025',
    workflow: 25,
  },
  {
    id: 'MBR-005',
    name: 'Oliver Remington',
    role: 'Viewer',
    department: 'Design',
    contactNumber: '+1 (305) 555-0136',
    status: 'Active',
    joinedDate: '20 May, 2025',
    workflow: 40,
  },
  {
    id: 'MBR-009',
    name: 'Dominic Harrington',
    role: 'Devops',
    department: 'Engineering',
    contactNumber: '+1 (617) 555-0164',
    status: 'Pending',
    joinedDate: '01 May, 2025',
    workflow: 0,
  },
  {
    id: 'MBR-006',
    name: 'William Prescott',
    role: 'Admin',
    department: 'Finance',
    contactNumber: '+1 (408) 555-0152',
    status: 'Active',
    joinedDate: '01 Jul, 2025',
    workflow: 9,
  },
  {
    id: 'MBR-003',
    name: 'Jameson Wallington',
    role: 'Billing',
    department: 'Finance',
    contactNumber: '+1 (503) 555-0119',
    status: 'Active',
    joinedDate: '30 Jun, 2025',
    workflow: 23,
  },
  {
    id: 'MBR-010',
    name: 'Sebastian Vanderbilt',
    role: 'Viewer',
    department: 'Sales',
    contactNumber: '+1 (702) 555-0148',
    status: 'Offline',
    joinedDate: '02 Jun, 2025',
    workflow: 32,
  },
];

export const TeamMembers: Story = {
  name: 'Team Members',
  render: () => {
    const activeCount = TeamMemberData.filter(m => m.status === 'Active').length;
    const pendingCount = TeamMemberData.filter(m => m.status === 'Pending').length;

    const summary: SummaryItem[] = [
      { label: 'Total Member', value: 35, description: 'All members' },
      { label: 'Active Now', value: activeCount, trend: 'up' },
      { label: 'Pending Invites', value: pendingCount, trend: 'neutral' },
      { label: 'Seats Used', value: '35 / 50', trend: 'neutral' },
    ];

    const headerActions = (
      <>
        <Button variant="outline" size="sm">
          27 April, 2026
        </Button>
        <Button variant="outline" size="sm">
          Team Settings
        </Button>
        <Button size="sm">+ Invite Member</Button>
      </>
    );

    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <UITableProvider<TTeamMember>
          title="Team Members"
          description="Manage who has access to your workspace."
          columns={TeamMemberColumns}
          data={TeamMemberData}
          totalRows={TeamMemberData.length}
          summary={summary}
          headerActions={headerActions}
          onRowSelection={sel => console.log('selection:', sel)}
        >
          <UITableWrapper>
            <UITableSummaryBar />
            <UITableTooltip>
              <UITableTooltipFilter onSearch={v => console.log('search:', v)} />
              <UITableTooltipActions />
            </UITableTooltip>
            <UITableContainer />
          </UITableWrapper>
        </UITableProvider>
      </div>
    );
  },
};

// ─── With Many Summary Cards (wrap) ──────────────────────────────────────────

export const WithManySummaryCards: Story = {
  name: 'With Many Summary Cards (18 items)',
  render: () => {
    const totalSalary = UserData.reduce((sum, u) => sum + u.salary, 0);
    const activeCount = UserData.filter(u => u.active).length;
    const avgSalary = Math.round(totalSalary / UserData.length);

    const summary: SummaryItem[] = [
      { label: 'Total Employees', value: UserData.length, description: 'All time' },
      { label: 'Active', value: activeCount, trend: 'up', description: `${Math.round((activeCount / UserData.length) * 100)}% of total` },
      { label: 'Inactive', value: UserData.length - activeCount, trend: 'down' },
      { label: 'Total Payroll', value: totalSalary, prefix: '$', precision: 0, trend: 'neutral' },
      { label: 'Avg. Salary', value: avgSalary, prefix: '$', precision: 0, description: 'Per employee' },
      { label: 'Max Salary', value: Math.max(...UserData.map(u => u.salary)), prefix: '$', precision: 0, trend: 'up' },
      { label: 'Min Salary', value: Math.min(...UserData.map(u => u.salary)), prefix: '$', precision: 0, trend: 'down' },
      { label: 'Departments', value: new Set(UserData.map(u => u.role)).size, description: 'Unique roles' },
      { label: 'Unique Roles', value: new Set(UserData.map(u => u.role)).size, description: 'Distinct roles' },
      { label: 'Active Rate', value: Math.round((activeCount / UserData.length) * 100), suffix: '%', trend: 'up' },
      { label: 'Inactive Rate', value: Math.round(((UserData.length - activeCount) / UserData.length) * 100), suffix: '%', trend: 'down' },
      { label: 'Q1 Payroll', value: Math.round(totalSalary * 0.25), prefix: '$', precision: 0 },
      { label: 'Q2 Payroll', value: Math.round(totalSalary * 0.27), prefix: '$', precision: 0, trend: 'up' },
      { label: 'Q3 Payroll', value: Math.round(totalSalary * 0.24), prefix: '$', precision: 0, trend: 'down' },
      { label: 'Q4 Payroll', value: Math.round(totalSalary * 0.24), prefix: '$', precision: 0 },
      { label: 'Headcount YoY', value: 12, suffix: '%', trend: 'up', description: 'vs last year' },
      { label: 'Turnover Rate', value: 8, suffix: '%', trend: 'down', description: 'Last 12 months' },
      { label: 'Salary Growth', value: 5.4, suffix: '%', precision: 1, trend: 'up', description: 'Annual avg.' },
    ];

    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <UITableProvider<TUser>
          title="Full HR Dashboard"
          columns={UserColumnsWithAggregation}
          data={UserData}
          totalRows={UserData.length}
          leftPinnedColumns={['name']}
          summary={summary}
          onSummaryItemClick={item => console.log('summary item clicked:', item)}
        >
          <UITableWrapper>
            <UITableSummaryBar />
            <UITableTooltip>
              <UITableTooltipFilter onSearch={v => console.log('search:', v)} />
              <UITableTooltipActions />
            </UITableTooltip>
            <UITableContainer />
          </UITableWrapper>
        </UITableProvider>
      </div>
    );
  },
};

// ─── With Summary & Analysis Panel ───────────────────────────────────────────

export const WithSummaryAndAnalysis: Story = {
  name: 'With Summary & Analysis Panel',
  render: () => {
    const totalSalary = UserData.reduce((sum, u) => sum + u.salary, 0);
    const activeCount = UserData.filter(u => u.active).length;

    const summary: SummaryItem[] = [
      { label: 'Total Employees', value: UserData.length },
      { label: 'Active', value: activeCount, trend: 'up' },
      { label: 'Total Payroll', value: totalSalary, prefix: '$', precision: 0 },
      { label: 'Avg. Salary', value: Math.round(totalSalary / UserData.length), prefix: '$', precision: 0 },
    ];

    return (
      <div className="h-[calc(100vh-4rem)] w-full">
        <UITableProvider<TUser>
          title="Team Analytics"
          columns={UserColumnsWithAggregation}
          data={UserData}
          totalRows={UserData.length}
          leftPinnedColumns={['name']}
          summary={summary}
          showAnalysisPanel
          onRowSelection={sel => console.log('selection:', sel)}
        >
          <UITableWrapper>
            <UITableSummaryBar />
            <UITableTooltip>
              <UITableTooltipFilter onSearch={v => console.log('search:', v)} />
              <UITableTooltipActions />
            </UITableTooltip>
            <UITableContainer />
            <UITableAnalysisPanel />
          </UITableWrapper>
        </UITableProvider>
      </div>
    );
  },
};
