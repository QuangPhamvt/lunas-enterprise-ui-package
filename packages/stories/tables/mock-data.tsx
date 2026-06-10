'use client';

import type { CsvCell, FilterDefinition, TUITableColumn } from '@/components/features/tables';
import { UITableBooleanDisplay, UITableCurrencyDisplay, UITableStatusDisplay } from '@/components/features/tables';

export type TMockDataTable = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'Hoạt động' | 'Không hoạt động' | 'Chờ xử lý' | 'Được mời';
  salary: number;
  active: boolean;
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

const FAMILY_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Phan', 'Huỳnh'] as const;

const GIVEN_NAMES = [
  'Văn Anh',
  'Thị Hương',
  'Minh Tuấn',
  'Thị Lan',
  'Văn Hùng',
  'Thị Mai',
  'Văn Đức',
  'Thị Hoa',
  'Minh Khoa',
  'Thị Linh',
  'Văn Nam',
  'Thị Ngọc',
  'Minh Quân',
  'Thị Thu',
  'Văn Long',
  'Thị Phương',
  'Minh Huy',
  'Thị Thanh',
  'Văn Dũng',
  'Thị Tâm',
] as const;

const DEPARTMENTS = ['Kỹ thuật', 'Thiết kế', 'Marketing', 'Kinh doanh', 'Vận hành'] as const;

const ROLES = ['Quản trị viên', 'Lập trình viên', 'Nhà thiết kế', 'Quản lý', 'Phân tích viên'] as const;

// 'Hoạt động' weighted 3× for realistic distribution
const STATUSES = ['Hoạt động', 'Hoạt động', 'Hoạt động', 'Không hoạt động', 'Chờ xử lý', 'Được mời'] as const;

export function generateMockData(count: number): TMockDataTable[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i + 1;
    const familyName = pick(FAMILY_NAMES, s * 3);
    const givenName = pick(GIVEN_NAMES, s * 7);
    const status = pick(STATUSES, s * 17) as TMockDataTable['status'];
    const salary = Math.round((8_000_000 + seededRandom(s * 19) * 42_000_000) / 500_000) * 500_000;
    return {
      id: `nv-${s}`,
      name: `${familyName} ${givenName}`,
      email: `user${s}@example.com`,
      department: pick(DEPARTMENTS, s * 11),
      role: pick(ROLES, s * 13),
      status,
      salary,
      active: status === 'Hoạt động',
    };
  });
}

export const MockDataTables: TMockDataTable[] = generateMockData(35);

export const MockDataColumns: TUITableColumn<TMockDataTable>[] = [
  { accessorKey: 'select', size: 60 },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Họ tên',
    cell: ({ getValue }) => <span className="font-medium">{getValue<string>()}</span>,
    size: 220,
    meta: { aggregation: { type: 'count', label: 'Tổng nhân viên' } },
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => <span className="text-text-positive-weak">{getValue<string>()}</span>,
    size: 220,
  },
  {
    id: 'department',
    accessorKey: 'department',
    header: 'Phòng ban',
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    size: 160,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    size: 180,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ getValue }) => (
      <UITableStatusDisplay
        value={getValue<string>()}
        colorMap={{
          'Hoạt động': 'success',
          'Không hoạt động': 'danger',
          'Chờ xử lý': 'warning',
          'Được mời': 'info',
        }}
      />
    ),
    size: 160,
  },
  {
    id: 'active',
    accessorKey: 'active',
    header: 'Hoạt động',
    cell: ({ getValue }) => <UITableBooleanDisplay value={getValue<boolean>()} />,
    size: 100,
    meta: { position: 'center' },
  },
  {
    id: 'salary',
    accessorKey: 'salary',
    header: 'Lương',
    cell: ({ getValue }) => <UITableCurrencyDisplay value={getValue<number>()} currency="VND" />,
    size: 200,
    meta: {
      position: 'end',
      aggregation: { type: 'sum', suffix: ' ₫', precision: 0, label: 'Tổng lương' },
    },
  },
];

export const MockDataFilterDefinitions: FilterDefinition[] = [
  { id: 'name', label: 'Họ tên', type: 'text' },
  {
    id: 'department',
    label: 'Phòng ban',
    type: 'tag',
    options: DEPARTMENTS.map(d => ({ label: d, value: d })),
  },
  {
    id: 'role',
    label: 'Vai trò',
    type: 'single-tag',
    options: ROLES.map(r => ({ label: r, value: r })),
  },
  {
    id: 'status',
    label: 'Trạng thái',
    type: 'tag',
    options: [
      { label: 'Hoạt động', value: 'Hoạt động' },
      { label: 'Không hoạt động', value: 'Không hoạt động' },
      { label: 'Chờ xử lý', value: 'Chờ xử lý' },
      { label: 'Được mời', value: 'Được mời' },
    ],
  },
  { id: 'active', label: 'Đang hoạt động', type: 'boolean' },
  { id: 'salary', label: 'Lương', type: 'number' },
];

export function generateMockCsvData(data: TMockDataTable[]): CsvCell[][] {
  return data.map(row => [
    { label: 'Họ tên', value: row.name },
    { label: 'Email', value: row.email },
    { label: 'Phòng ban', value: row.department },
    { label: 'Vai trò', value: row.role },
    { label: 'Trạng thái', value: row.status },
    { label: 'Đang hoạt động', value: row.active },
    { label: 'Lương (VNĐ)', value: row.salary },
  ]);
}
