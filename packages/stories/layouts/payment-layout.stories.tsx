import { CreditCardIcon, LayoutDashboardIcon, PackageIcon, ReceiptIcon, SettingsIcon, UsersIcon } from 'lucide-react';

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

/** Default — no user, login button visible */
export const Default: Story = {
  args: {
    activeNavItemId: 'dashboard',
    sidebar: defaultSidebar,
  },
};

/** Logged in — shows user avatar (initials) and name in the header */
export const LoggedIn: Story = {
  args: {
    activeNavItemId: 'transactions',
    sidebar: defaultSidebar,
    user: mockUser,
  },
};

/** Logged in with avatar image */
export const LoggedInWithAvatar: Story = {
  args: {
    activeNavItemId: 'transactions',
    sidebar: defaultSidebar,
    user: mockUserWithAvatar,
  },
};

/** Active nav item highlighted */
export const ActiveNavItem: Story = {
  args: {
    activeNavItemId: 'products',
    sidebar: defaultSidebar,
    user: mockUser,
  },
};

/** No sidebar groups — empty navigation */
export const EmptySidebar: Story = {
  args: {
    activeNavItemId: undefined,
    sidebar: { groupcontent: [] },
    user: mockUser,
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
  },
};
