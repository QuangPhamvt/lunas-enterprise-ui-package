import { useState } from 'react';

import {
  NotificationBell,
  NotificationCenter,
  type NotificationItemData,
  NotificationList,
  type NotificationScope,
} from '@/components/features/notification-center';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const NOW = new Date();
const minutesAgo = (minutes: number) => new Date(NOW.getTime() - minutes * 60 * 1000).toISOString();
const hoursAgo = (hours: number) => minutesAgo(hours * 60);
const daysAgo = (days: number) => hoursAgo(days * 24);

// One row per notification type this module actually emits (see notification-item.tsx's
// NOTIFICATION_TYPE_META) — the "gallery" reference story below shows exactly this set, one item
// each, so every case can be inspected side by side without digging through a long mixed list.
const ALL_TYPE_SAMPLES: NotificationItemData[] = [
  {
    uuid: 'g-order-status',
    scope: 'GLOBAL',
    type: 'ORDER_STATUS_CHANGED',
    title: 'Đơn hàng LNS-20260101-0001 đã chuyển sang xử lý',
    createdAt: minutesAgo(4),
    isRead: false,
  },
  {
    uuid: 'g-order-cancelled',
    scope: 'GLOBAL',
    type: 'ORDER_CANCELLED',
    title: 'Đơn hàng LNS-20251228-0042 đã bị hủy',
    body: 'Đơn hàng đã được hủy bởi quản trị viên.',
    createdAt: hoursAgo(1),
    isRead: false,
  },
  {
    uuid: 'g-order-confirmed',
    scope: 'GLOBAL',
    type: 'ORDER_CONFIRMED_BY_CUSTOMER',
    title: 'Khách hàng đã xác nhận đơn hàng LNS-20260105-0007',
    createdAt: hoursAgo(3),
    isRead: false,
  },
  {
    uuid: 'g-payment-received',
    scope: 'GLOBAL',
    type: 'PAYMENT_RECEIVED',
    title: 'Đã thanh toán đặt cọc',
    body: 'Đã nhận thanh toán số tiền 500.000 VND.',
    createdAt: hoursAgo(5),
    isRead: false,
  },
  {
    uuid: 'g-payment-created',
    scope: 'GLOBAL',
    type: 'PAYMENT_CREATED',
    title: 'Đã tạo phiếu thanh toán LNS-PAY-00981',
    createdAt: hoursAgo(8),
    isRead: true,
  },
  {
    uuid: 'g-payment-voided',
    scope: 'GLOBAL',
    type: 'PAYMENT_VOIDED',
    title: 'Thanh toán đã bị hủy',
    body: 'Giao dịch thanh toán số tiền 200.000 VND đã bị hủy.',
    createdAt: daysAgo(1),
    isRead: true,
  },
  {
    uuid: 'g-payment-cancelled',
    scope: 'GLOBAL',
    type: 'PAYMENT_CANCELLED',
    title: 'Phiếu thanh toán LNS-PAY-00965 đã bị hủy',
    createdAt: daysAgo(2),
    isRead: true,
  },
  {
    uuid: 'g-manifest',
    scope: 'GLOBAL',
    type: 'MANIFEST_STATUS_CHANGED',
    title: 'Đang giao hàng',
    body: 'Món hàng "Figma Nendoroid" đang được giao đến khách hàng.',
    createdAt: daysAgo(3),
    isRead: true,
  },
  {
    uuid: 'g-document',
    scope: 'GLOBAL',
    type: 'DOCUMENT_PUBLISHED',
    title: 'Tài liệu "Chính sách đổi trả" đã được xuất bản',
    createdAt: daysAgo(5),
    isRead: true,
  },
  {
    uuid: 'g-customer',
    scope: 'GLOBAL',
    type: 'CUSTOMER_REGISTERED',
    title: 'Khách hàng mới đã đăng ký: minh.tran92@gmail.com',
    createdAt: hoursAgo(6),
    isRead: false,
  },
  {
    uuid: 'p-account',
    scope: 'PERSONAL',
    type: 'ACCOUNT_ROLE_CHANGED',
    title: 'Vai trò của bạn đã được đổi thành ADMIN',
    createdAt: hoursAgo(2),
    isRead: false,
  },
];

// Realistic-feeling, higher-volume seed data for the interactive demo below — a busy back office
// sees far more than a handful of notifications, so this cycles through every GLOBAL type across
// 36 rows (roughly a week of activity) and 20 PERSONAL rows, instead of 3-4 token examples.
const GLOBAL_TYPE_CYCLE: Array<{ type: string; title: (n: number) => string; body?: (n: number) => string }> = [
  { type: 'ORDER_STATUS_CHANGED', title: n => `Đơn hàng LNS-202601${String(10 + n).padStart(2, '0')}-00${n} đã chuyển sang xử lý` },
  { type: 'ORDER_CONFIRMED_BY_CUSTOMER', title: n => `Khách hàng đã xác nhận đơn hàng LNS-202601${String(10 + n).padStart(2, '0')}-00${n}` },
  { type: 'PAYMENT_RECEIVED', title: () => 'Đã thanh toán đặt cọc', body: n => `Đã nhận thanh toán số tiền ${(n % 5) + 1}00.000 VND.` },
  {
    type: 'MANIFEST_STATUS_CHANGED',
    title: n => (n % 2 === 0 ? 'Đang giao hàng' : 'Hàng đã về đến Việt Nam'),
    body: n => `Món hàng "Nendoroid #${n}" đang được xử lý.`,
  },
  { type: 'PAYMENT_CREATED', title: n => `Đã tạo phiếu thanh toán LNS-PAY-${String(900 + n).padStart(5, '0')}` },
  { type: 'CUSTOMER_REGISTERED', title: n => `Khách hàng mới đã đăng ký: user${n}@gmail.com` },
  {
    type: 'ORDER_CANCELLED',
    title: n => `Đơn hàng LNS-202512${String(20 + n).padStart(2, '0')}-00${n} đã bị hủy`,
    body: () => 'Đơn hàng đã được hủy bởi quản trị viên.',
  },
  { type: 'PAYMENT_VOIDED', title: () => 'Thanh toán đã bị hủy', body: n => `Giao dịch thanh toán số tiền ${(n % 4) + 1}00.000 VND đã bị hủy.` },
  { type: 'PAYMENT_CANCELLED', title: n => `Phiếu thanh toán LNS-PAY-${String(800 + n).padStart(5, '0')} đã bị hủy` },
  { type: 'DOCUMENT_PUBLISHED', title: n => `Tài liệu "${['Chính sách đổi trả', 'Hướng dẫn đặt cọc', 'Điều khoản dịch vụ'][n % 3]}" đã được xuất bản` },
];

const buildGlobalNotifications = (count: number): NotificationItemData[] =>
  Array.from({ length: count }, (_, i) => {
    const template = GLOBAL_TYPE_CYCLE[i % GLOBAL_TYPE_CYCLE.length];
    return {
      uuid: `demo-global-${i + 1}`,
      scope: 'GLOBAL' as const,
      type: template.type,
      title: template.title(i + 1),
      body: template.body?.(i + 1),
      createdAt: hoursAgo(i * 3 + 1),
      isRead: i >= 8, // first 8 (newest) unread — the rest is read history to scroll through
    };
  });

const PERSONAL_ROLE_CYCLE = ['ADMIN', 'MODERATOR', 'STAFF', 'EDITOR', 'VIEWER'];

const buildPersonalNotifications = (count: number): NotificationItemData[] =>
  Array.from({ length: count }, (_, i) => ({
    uuid: `demo-personal-${i + 1}`,
    scope: 'PERSONAL' as const,
    type: 'ACCOUNT_ROLE_CHANGED',
    title: `Vai trò của bạn đã được đổi thành ${PERSONAL_ROLE_CYCLE[i % PERSONAL_ROLE_CYCLE.length]}`,
    createdAt: daysAgo(i * 2 + 1),
    isRead: i >= 3, // first 3 (newest) unread
  }));

const INITIAL_GLOBAL = buildGlobalNotifications(36);
const INITIAL_PERSONAL = buildPersonalNotifications(20);
const GLOBAL_UNREAD_COUNT = INITIAL_GLOBAL.filter(n => !n.isRead).length; // 8
const PERSONAL_UNREAD_COUNT = INITIAL_PERSONAL.filter(n => !n.isRead).length; // 3

/** Shared render wrapper: manages open/scope/read state locally, since NotificationCenter is fully controlled. */
const NotificationCenterDemo = () => {
  const [open, setOpen] = useState(false);
  const [activeScope, setActiveScope] = useState<NotificationScope>('GLOBAL');
  const [globalNotifications, setGlobalNotifications] = useState(INITIAL_GLOBAL);
  const [personalNotifications, setPersonalNotifications] = useState(INITIAL_PERSONAL);

  const globalUnreadCount = globalNotifications.filter(n => !n.isRead).length;
  const personalUnreadCount = personalNotifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationUuid: string) => {
    setGlobalNotifications(prev => prev.map(n => (n.uuid === notificationUuid ? { ...n, isRead: true } : n)));
    setPersonalNotifications(prev => prev.map(n => (n.uuid === notificationUuid ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = (scope: NotificationScope) => {
    const markAll = (list: NotificationItemData[]) => list.map(n => ({ ...n, isRead: true }));
    if (scope === 'GLOBAL') setGlobalNotifications(markAll);
    else setPersonalNotifications(markAll);
  };

  return (
    <div className="flex items-center justify-end border-b p-4">
      <NotificationBell unreadCount={globalUnreadCount + personalUnreadCount} onClick={() => setOpen(true)} />
      <NotificationCenter
        open={open}
        onOpenChange={setOpen}
        activeScope={activeScope}
        onActiveScopeChange={setActiveScope}
        globalNotifications={globalNotifications}
        personalNotifications={personalNotifications}
        globalUnreadCount={globalUnreadCount}
        personalUnreadCount={personalUnreadCount}
        hasMoreGlobal
        hasMorePersonal
        onLoadMore={() => {}}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />
    </div>
  );
};

const meta = {
  tags: ['autodocs'],
  title: 'Features/NotificationCenter',
  component: NotificationCenterDemo,
} satisfies Meta<typeof NotificationCenterDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: `Danh sách đầy đủ (${INITIAL_GLOBAL.length} chung / ${INITIAL_PERSONAL.length} cá nhân)`,
  render: () => <NotificationCenterDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const totalUnread = GLOBAL_UNREAD_COUNT + PERSONAL_UNREAD_COUNT;

    // Unread badge shows the combined global + personal count.
    await expect(canvas.getByLabelText(`Thông báo, ${totalUnread} chưa đọc`)).toBeInTheDocument();

    await userEvent.click(canvas.getByLabelText(`Thông báo, ${totalUnread} chưa đọc`));
    await expect(body.getByText('Thông báo')).toBeInTheDocument();

    // A long, mixed-type, mixed-read list — verifies the panel comfortably holds many rows,
    // scrolling from the newest unread ones down through read history, not just 2-3 examples.
    const globalRows = document.body.querySelectorAll('[data-slot="notification-item"][data-notification-type]');
    await expect(globalRows.length).toBe(INITIAL_GLOBAL.length);
    await expect(body.getByText('Xem thêm')).toBeInTheDocument();

    // Switch to the Cá nhân tab — independent unread state and its own long history.
    await userEvent.click(body.getByRole('tab', { name: 'Cá nhân' }));
    await expect(body.getByText('Vai trò của bạn đã được đổi thành ADMIN')).toBeInTheDocument();

    // Mark the newest personal notification read — its action disappears.
    const markReadButtons = body.getAllByRole('button', { name: 'Đánh dấu đã đọc' });
    await expect(markReadButtons).toHaveLength(PERSONAL_UNREAD_COUNT);
    await userEvent.click(markReadButtons[0]);
    await waitFor(() => expect(body.getAllByRole('button', { name: 'Đánh dấu đã đọc' })).toHaveLength(PERSONAL_UNREAD_COUNT - 1));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByText('Thông báo')).not.toBeInTheDocument());
  },
};

export const MarkAllAsRead: Story = {
  name: 'Đánh dấu tất cả đã đọc',
  render: () => <NotificationCenterDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const totalUnread = GLOBAL_UNREAD_COUNT + PERSONAL_UNREAD_COUNT;

    await userEvent.click(canvas.getByLabelText(`Thông báo, ${totalUnread} chưa đọc`));
    // Chung tab is active by default.
    await expect(body.getAllByRole('button', { name: 'Đánh dấu đã đọc' })).toHaveLength(GLOBAL_UNREAD_COUNT);

    await userEvent.click(body.getByRole('button', { name: 'Đánh dấu tất cả đã đọc' }));
    await waitFor(() => expect(body.queryByRole('button', { name: 'Đánh dấu đã đọc' })).not.toBeInTheDocument());
  },
};

export const Empty: Story = {
  name: 'Không có thông báo',
  render: () => {
    const [open, setOpen] = useState(false);
    const [activeScope, setActiveScope] = useState<NotificationScope>('GLOBAL');
    return (
      <div className="flex items-center justify-end border-b p-4">
        <NotificationBell unreadCount={0} onClick={() => setOpen(true)} />
        <NotificationCenter
          open={open}
          onOpenChange={setOpen}
          activeScope={activeScope}
          onActiveScopeChange={setActiveScope}
          globalNotifications={[]}
          personalNotifications={[]}
          globalUnreadCount={0}
          personalUnreadCount={0}
          onLoadMore={() => {}}
          onMarkAsRead={() => {}}
          onMarkAllAsRead={() => {}}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByLabelText('Thông báo'));
    await expect(body.getByText('Chưa có thông báo chung nào')).toBeInTheDocument();
  },
};

export const AllNotificationTypes: Story = {
  name: 'Toàn bộ loại sự kiện (rõ từng case)',
  // Rendered as a plain, always-visible list (not behind the side panel) so every event type's
  // icon/color/category-label combination can be inspected side by side in one screenshot —
  // useful as a visual reference/regression check whenever a new notification type is added.
  render: () => (
    <div className="max-w-lg p-4">
      <NotificationList notifications={ALL_TYPE_SAMPLES} onMarkAsRead={() => {}} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Each type renders its own category label — this is the "at a glance" identity the reader relies on.
    await expect(canvas.getByText('Đơn hàng')).toBeInTheDocument();
    await expect(canvas.getByText('Đơn hàng hủy')).toBeInTheDocument();
    await expect(canvas.getByText('Khách xác nhận')).toBeInTheDocument();
    await expect(canvas.getByText('Đã thanh toán')).toBeInTheDocument();
    await expect(canvas.getByText('Phiếu thanh toán')).toBeInTheDocument();
    await expect(canvas.getByText('Thanh toán bị hủy')).toBeInTheDocument();
    await expect(canvas.getByText('Hủy phiếu thanh toán')).toBeInTheDocument();
    await expect(canvas.getByText('Vận chuyển')).toBeInTheDocument();
    await expect(canvas.getByText('Tài liệu')).toBeInTheDocument();
    await expect(canvas.getByText('Khách hàng mới')).toBeInTheDocument();
    await expect(canvas.getByText('Tài khoản')).toBeInTheDocument();

    // Every sample row rendered — one per notification type.
    const items = canvasElement.querySelectorAll('[data-slot="notification-item"]');
    await expect(items).toHaveLength(ALL_TYPE_SAMPLES.length);
  },
};
