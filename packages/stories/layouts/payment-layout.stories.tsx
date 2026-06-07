import { CreditCardIcon, LayoutDashboardIcon, PackageIcon, ReceiptIcon, SettingsIcon, TrendingUpIcon, UsersIcon, WalletIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaymentLayout } from '@/components/layouts/payment-layout';

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/Payment Layout',
  component: PaymentLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onLogin: { action: 'login' },
    onLogout: { action: 'logout' },
  },
} satisfies Meta<typeof PaymentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSidebar = {
  groupcontent: [
    {
      id: 'main',
      label: 'Tổng quan',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon /> },
        { id: 'transactions', label: 'Giao dịch', icon: <CreditCardIcon /> },
        { id: 'invoices', label: 'Hoá đơn', icon: <ReceiptIcon /> },
      ],
    },
    {
      id: 'manage',
      label: 'Quản lý',
      items: [
        { id: 'products', label: 'Sản phẩm', icon: <PackageIcon /> },
        { id: 'customers', label: 'Khách hàng', icon: <UsersIcon /> },
        { id: 'settings', label: 'Cài đặt', icon: <SettingsIcon /> },
      ],
    },
  ],
};

const mockUser = {
  fullname: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
};

const mockUserWithAvatar = {
  fullname: 'Trần Thị B',
  email: 'tranthib@example.com',
  avatar: 'https://i.pravatar.cc/150?img=47',
};

const stats = [
  { label: 'Tổng doanh thu', value: '₫124,500,000', change: '+12.5%', icon: <WalletIcon size={18} /> },
  { label: 'Giao dịch', value: '3,842', change: '+8.1%', icon: <CreditCardIcon size={18} /> },
  { label: 'Khách hàng', value: '1,209', change: '+4.3%', icon: <UsersIcon size={18} /> },
  { label: 'Tăng trưởng', value: '18.6%', change: '+2.4%', icon: <TrendingUpIcon size={18} /> },
];

const recentTransactions = [
  { id: 'TXN-001', customer: 'Lê Minh Tuấn', amount: '₫2,400,000', status: 'Thành công', date: '06/06/2026' },
  { id: 'TXN-002', customer: 'Phạm Thị Hoa', amount: '₫980,000', status: 'Chờ xử lý', date: '06/06/2026' },
  { id: 'TXN-003', customer: 'Trần Quốc Bảo', amount: '₫5,100,000', status: 'Thành công', date: '05/06/2026' },
  { id: 'TXN-004', customer: 'Nguyễn Thu Hằng', amount: '₫320,000', status: 'Thất bại', date: '05/06/2026' },
  { id: 'TXN-005', customer: 'Vũ Đình Long', amount: '₫1,750,000', status: 'Thành công', date: '04/06/2026' },
];

const statusColor: Record<string, string> = {
  'Thành công': 'bg-green-100 text-green-700',
  'Chờ xử lý': 'bg-yellow-100 text-yellow-700',
  'Thất bại': 'bg-red-100 text-red-700',
};

const DemoContent = () => (
  <div className="flex flex-col gap-6 p-4 md:p-6">
    <div>
      <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-0.5 text-muted-foreground text-sm">Tổng quan hoạt động thanh toán</p>
    </div>

    {/* Stat cards */}
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map(stat => (
        <div key={stat.label} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs">{stat.label}</span>
            {stat.icon}
          </div>
          <p className="text-lg font-semibold text-foreground">{stat.value}</p>
          <span className="text-green-600 text-xs">{stat.change} so với tháng trước</span>
        </div>
      ))}
    </div>

    {/* Recent transactions */}
    <div className="flex flex-col gap-3">
      <h2 className="font-medium text-foreground text-sm">Giao dịch gần đây</h2>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* Table header — hidden on very small screens */}
        <div className="hidden grid-cols-[1fr_1fr_auto_auto_auto] gap-4 border-border border-b bg-muted/40 px-4 py-2.5 text-muted-foreground text-xs font-medium sm:grid">
          <span>Mã GD</span>
          <span>Khách hàng</span>
          <span>Số tiền</span>
          <span>Trạng thái</span>
          <span>Ngày</span>
        </div>

        {recentTransactions.map((txn, i) => (
          <div
            key={txn.id}
            className={`grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 px-4 py-3 text-sm sm:grid-cols-[1fr_1fr_auto_auto_auto] sm:items-center ${i !== recentTransactions.length - 1 ? 'border-border border-b' : ''}`}
          >
            <span className="font-mono text-muted-foreground text-xs">{txn.id}</span>
            <span
              className={`row-start-1 justify-self-end rounded-full px-2 py-0.5 font-medium text-xs sm:row-auto sm:justify-self-auto ${statusColor[txn.status]}`}
            >
              {txn.status}
            </span>
            <span className="col-span-1 font-medium text-foreground sm:col-auto">{txn.customer}</span>
            <span className="hidden font-semibold text-foreground sm:block">{txn.amount}</span>
            <span className="hidden text-muted-foreground text-xs sm:block">{txn.date}</span>

            {/* Mobile-only bottom row */}
            <div className="col-span-2 flex items-center justify-between sm:hidden">
              <span className="font-semibold text-foreground">{txn.amount}</span>
              <span className="text-muted-foreground text-xs">{txn.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** Default — no user, login button visible */
export const Default: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar: defaultSidebar,
    children: <DemoContent />,
  },
};

/** Logged in — shows user avatar (initials) and name in the header */
export const LoggedIn: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar: defaultSidebar,
    user: mockUser,
    children: <DemoContent />,
  },
};

/** Logged in with avatar image */
export const LoggedInWithAvatar: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar: defaultSidebar,
    user: mockUserWithAvatar,
    children: <DemoContent />,
  },
};

/** Active nav item highlighted */
export const ActiveNavItem: Story = {
  args: {
    activeNavItemId: 'products',
    sidebar: defaultSidebar,
    user: mockUser,
    children: <DemoContent />,
  },
};

/** No sidebar groups — empty navigation */
export const EmptySidebar: Story = {
  args: {
    activeNavItemId: undefined,
    sidebar: { groupcontent: [] },
    user: mockUser,
    children: <DemoContent />,
  },
};

/** Long user name — truncation behaviour on small screens */
export const LongUserName: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar: defaultSidebar,
    user: {
      fullname: 'Nguyễn Hoàng Minh Phúc Thanh Long',
      email: 'nguyen.hoang.minh.phuc@enterprise.example.com',
    },
    children: <DemoContent />,
  },
};

/** Not logged in — sidebar and bottom nav hidden, login button in header */
export const NotLoggedIn: Story = {
  args: {
    isLogin: false,
    sidebar: defaultSidebar,
    children: <DemoContent />,
  },
};

/** Not logged in on mobile */
export const NotLoggedInMobile: Story = {
  args: {
    isLogin: false,
    sidebar: defaultSidebar,
    children: <DemoContent />,
  },
  parameters: {
    viewport: { defaultViewport: 'iphone6' },
  },
};

/** Logged in on mobile — bottom navigation bar visible */
export const LoggedInMobile: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar: defaultSidebar,
    user: mockUser,
    children: <DemoContent />,
  },
  parameters: {
    viewport: { defaultViewport: 'iphone6' },
  },
};

/** Minimal sidebar — single group, single item */
export const MinimalSidebar: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar: {
      groupcontent: [
        {
          id: 'main',
          items: [{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon /> }],
        },
      ],
    },
    children: <DemoContent />,
  },
};
