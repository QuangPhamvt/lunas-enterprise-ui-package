'use client';

import type { CsvCell, FilterDefinition, TUITableColumn } from '@/components/features/tables';
import {
  UITableAvatarNameDisplay,
  UITableBadgeDisplay,
  UITableBooleanDisplay,
  UITableCurrencyDisplay,
  UITableDateDisplay,
  UITableDescriptionDisplay,
  UITableEmailDisplay,
  UITableListDisplay,
  UITableNameDisplay,
  UITablePermalink,
  UITablePhoneNumberDisplay,
  UITableProgressDisplay,
  UITableStatisticDisplay,
  UITableStatusDisplay,
  UITableUserDataDisplay,
} from '@/components/features/tables';

export type TMockDataTable = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'Hoạt động' | 'Không hoạt động' | 'Chờ xử lý' | 'Được mời';
  salary: number;
  active: boolean;
  phone: string;
  website: string;
  tags: string[];
  progress: number;
  joinedDate: string;
  description: string;
  statistic: number;
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

const SKILLS = ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'Python', 'Figma', 'Docker', 'SQL', 'GraphQL', 'AWS'] as const;

const DESCRIPTIONS = [
  'Chịu trách nhiệm phát triển và duy trì hệ thống backend, tối ưu hiệu suất và bảo mật.',
  'Thiết kế giao diện người dùng hiện đại, tập trung vào trải nghiệm và khả năng tiếp cận.',
  'Quản lý dự án, phối hợp giữa các nhóm để đảm bảo tiến độ và chất lượng sản phẩm.',
  'Phân tích dữ liệu kinh doanh, xây dựng báo cáo và đề xuất chiến lược tăng trưởng.',
  'Vận hành hệ thống CI/CD, đảm bảo hạ tầng ổn định và khả năng mở rộng linh hoạt.',
] as const;

const PHONE_AREA_CODES = ['0901', '0912', '0933', '0965', '0987', '0346', '0358', '0376', '0389', '0702'] as const;

export function generateMockData(count: number): TMockDataTable[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i + 1;
    const familyName = pick(FAMILY_NAMES, s * 3);
    const givenName = pick(GIVEN_NAMES, s * 7);
    const status = pick(STATUSES, s * 17) as TMockDataTable['status'];
    const salary = Math.round((8_000_000 + seededRandom(s * 19) * 42_000_000) / 500_000) * 500_000;
    const areaCode = pick(PHONE_AREA_CODES, s * 23);
    const phoneRest = String(Math.floor(seededRandom(s * 29) * 9000000 + 1000000));
    const tagCount = 2 + Math.floor(seededRandom(s * 37) * 3);
    const tags = Array.from({ length: tagCount }, (__, j) => pick(SKILLS, s * 41 + j));
    return {
      id: `nv-${s}`,
      name: `${familyName} ${givenName}`,
      email: `user${s}@example.com`,
      department: pick(DEPARTMENTS, s * 11),
      role: pick(ROLES, s * 13),
      status,
      salary,
      active: status === 'Hoạt động',
      phone: `${areaCode}${phoneRest}`,
      website: `https://example.com/profile/${s}`,
      tags: [...new Set(tags)],
      progress: Math.round(seededRandom(s * 43) * 100),
      joinedDate: new Date(2023, Math.floor(seededRandom(s * 47) * 12), Math.floor(seededRandom(s * 53) * 28) + 1).toISOString(),
      description: pick(DESCRIPTIONS, s * 59),
      statistic: Math.round(seededRandom(s * 61) * 9800 + 200),
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
    cell: ({ row }) => <UITableAvatarNameDisplay name={row.original.name} uuid={row.original.id} />,
    size: 220,
    meta: { aggregation: { type: 'count', label: 'Tổng nhân viên' } },
  },
  {
    id: 'user',
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => <UITableUserDataDisplay uuid={row.original.id} username={row.original.name} email={row.original.email} />,
    size: 240,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => <UITableEmailDisplay email={getValue<string>()} />,
    size: 240,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: 'Điện thoại',
    cell: ({ getValue }) => <UITablePhoneNumberDisplay value={getValue<string>()} />,
    size: 160,
  },
  {
    id: 'website',
    accessorKey: 'website',
    header: 'Website',
    cell: ({ getValue }) => <UITablePermalink href={getValue<string>()} label="Xem hồ sơ" />,
    size: 160,
  },
  {
    id: 'department',
    accessorKey: 'department',
    header: 'Phòng ban',
    cell: ({ getValue }) => <UITableNameDisplay name={getValue<string>()} />,
    size: 160,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ getValue }) => <UITableBadgeDisplay label={getValue<string>()} />,
    size: 180,
  },
  {
    id: 'tags',
    accessorKey: 'tags',
    header: 'Kỹ năng',
    cell: ({ getValue }) => <UITableListDisplay items={getValue<string[]>()} maxVisible={2} />,
    size: 200,
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
    id: 'progress',
    accessorKey: 'progress',
    header: 'Tiến độ',
    cell: ({ getValue }) => <UITableProgressDisplay value={getValue<number>()} />,
    size: 180,
  },
  {
    id: 'joinedDate',
    accessorKey: 'joinedDate',
    header: 'Ngày tham gia',
    cell: ({ getValue }) => <UITableDateDisplay date={getValue<string>()} />,
    size: 160,
  },
  {
    id: 'statistic',
    accessorKey: 'statistic',
    header: 'Điểm KPI',
    cell: ({ getValue }) => <UITableStatisticDisplay value={getValue<number>()} suffix=" pts" size="sm" />,
    size: 140,
    meta: {
      position: 'end',
      aggregation: { type: 'avg', label: 'KPI trung bình', precision: 0 },
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ getValue }) => <UITableDescriptionDisplay content={getValue<string>()} />,
    size: 260,
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
  { id: 'progress', label: 'Tiến độ', type: 'number' },
  { id: 'joinedDate', label: 'Ngày tham gia', type: 'date-range' },
];

export function generateMockCsvData(data: TMockDataTable[]): CsvCell[][] {
  return data.map(row => [
    { label: 'Họ tên', value: row.name },
    { label: 'Email', value: row.email },
    { label: 'Điện thoại', value: row.phone },
    { label: 'Phòng ban', value: row.department },
    { label: 'Vai trò', value: row.role },
    { label: 'Kỹ năng', value: row.tags.join(', ') },
    { label: 'Trạng thái', value: row.status },
    { label: 'Đang hoạt động', value: row.active },
    { label: 'Tiến độ (%)', value: row.progress },
    { label: 'Điểm KPI', value: row.statistic },
    { label: 'Ngày tham gia', value: row.joinedDate },
    { label: 'Lương (VNĐ)', value: row.salary },
  ]);
}
