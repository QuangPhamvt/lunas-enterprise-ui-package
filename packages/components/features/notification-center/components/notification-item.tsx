'use client';

import {
  BanIcon,
  BellIcon,
  CircleDollarSignIcon,
  FileTextIcon,
  type LucideIcon,
  PackageCheckIcon,
  PackageIcon,
  PackageXIcon,
  ReceiptIcon,
  TruckIcon,
  UserCogIcon,
  UserIcon,
  XCircleIcon,
} from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Badge } from '@/components/ui/badge';

import { DateDisplay } from '@/components/data-display/date';
import type { NotificationItemData, NotificationItemProps } from '../types';
import { MarkAsReadButton } from './atoms/mark-as-read-button';
import { NotificationRow, NotificationRowActions } from './atoms/notification-row';
import { UnreadDot } from './atoms/unread-dot';

export type { NotificationItemProps } from '../types';

const AMOUNT_PATTERN = /([\d.,]+)\s*VND/i;
/** Pulls a "123.456 VND"-shaped amount out of a notification body, if present. */
const extractAmountText = (text?: string | null): string | null => {
  if (!text) return null;
  const match = text.match(AMOUNT_PATTERN);
  return match ? `${match[1]} VND` : null;
};

const TRAILING_ROLE_PATTERN = /thành\s+([A-ZÀ-Ỹ_]+)\s*$/;
/** Pulls the trailing role name out of an "... đã được đổi thành ADMIN" title, if present. */
const extractTrailingRole = (title: string): string | null => {
  const match = title.match(TRAILING_ROLE_PATTERN);
  return match ? match[1] : null;
};

const MANIFEST_STAGE_LABELS = ['Đã mua hàng', 'Hàng đã về đến Việt Nam', 'Đang giao hàng', 'Đã giao hàng'];

/**
 * Type-specific extra content rendered below the (always-uniform) description line — this is
 * where each type is allowed a genuinely different little layout (a ledger figure, a role pill, a
 * shipping stepper), while the icon, eyebrow header, description, and timestamp around it stay
 * identical for every type. Returns `null` for types with nothing structured to add beyond plain
 * body text. A plain `switch`, not a `Record<type, renderer>` map.
 */
const renderNotificationContent = (notification: NotificationItemData): React.ReactNode => {
  switch (notification.type) {
    case 'PAYMENT_RECEIVED': {
      const amount = extractAmountText(notification.body);
      return amount ? <span className="font-semibold text-sm text-success tabular-nums">+{amount}</span> : null;
    }
    case 'PAYMENT_VOIDED': {
      const amount = extractAmountText(notification.body);
      return amount ? <span className="font-semibold text-danger text-sm tabular-nums">−{amount}</span> : null;
    }
    case 'ACCOUNT_ROLE_CHANGED': {
      const role = extractTrailingRole(notification.title);
      return role ? (
        <Badge variant="solid" color="warning" size="sm" className="w-fit">
          {role}
        </Badge>
      ) : null;
    }
    case 'MANIFEST_STATUS_CHANGED': {
      const stage = MANIFEST_STAGE_LABELS.indexOf(notification.title);
      if (stage < 0) return null;
      return (
        <div className="flex w-full max-w-48 items-center gap-1" aria-hidden>
          {MANIFEST_STAGE_LABELS.map((label, index) => (
            <span key={label} className={cn('h-1 flex-1 rounded-full', index <= stage ? 'bg-accent' : 'bg-card')} />
          ))}
        </div>
      );
    }
    default:
      return null;
  }
};

type NotificationAccent = {
  icon: LucideIcon;
  /** Category eyebrow shown above the title — e.g. "Đơn hàng", "Vận chuyển". */
  label: string;
  /** `bg-*-bg-subtle` applied to the whole row — this, not layout, is what tells types apart. Hover is handled centrally by `NotificationRow`. */
  bg: string;
  fg: string;
};

/**
 * Every notification type shares the exact same row layout (icon, eyebrow label, title, body,
 * timestamp) — only the accent color/icon/label change per type. Differentiation lives entirely in
 * the row's `bg-subtle` background color, not in a different structure per type, so a long
 * mixed-type list reads as one consistent list rather than a grab-bag of unrelated card shapes. A
 * plain `switch` picks the accent; there is deliberately no `Record<type, accent>` map driving this.
 */
const getNotificationAccent = (type: string): NotificationAccent => {
  switch (type) {
    case 'ORDER_STATUS_CHANGED':
      return { icon: PackageIcon, label: 'Đơn hàng', bg: 'bg-info-bg-subtle', fg: 'text-info-intense' };
    case 'ORDER_CANCELLED':
      return { icon: PackageXIcon, label: 'Đơn hàng hủy', bg: 'bg-danger-bg-subtle', fg: 'text-danger-intense' };
    case 'ORDER_CONFIRMED_BY_CUSTOMER':
      return { icon: PackageCheckIcon, label: 'Khách xác nhận', bg: 'bg-success-bg-subtle', fg: 'text-success-intense' };
    case 'PAYMENT_RECEIVED':
      return { icon: CircleDollarSignIcon, label: 'Đã thanh toán', bg: 'bg-success-bg-subtle', fg: 'text-success-intense' };
    case 'PAYMENT_CREATED':
      return { icon: ReceiptIcon, label: 'Phiếu thanh toán', bg: 'bg-info-bg-subtle', fg: 'text-info-intense' };
    case 'PAYMENT_VOIDED':
      return { icon: BanIcon, label: 'Thanh toán bị hủy', bg: 'bg-danger-bg-subtle', fg: 'text-danger-intense' };
    case 'PAYMENT_CANCELLED':
      return { icon: XCircleIcon, label: 'Hủy phiếu thanh toán', bg: 'bg-warning-bg-subtle', fg: 'text-warning-intense' };
    case 'MANIFEST_STATUS_CHANGED':
      return { icon: TruckIcon, label: 'Vận chuyển', bg: 'bg-accent-bg-subtle', fg: 'text-accent-intense' };
    case 'DOCUMENT_PUBLISHED':
      return { icon: FileTextIcon, label: 'Tài liệu', bg: 'bg-secondary-bg-subtle', fg: 'text-secondary-intense' };
    case 'CUSTOMER_REGISTERED':
      return { icon: UserIcon, label: 'Khách hàng mới', bg: 'bg-primary-bg-subtle', fg: 'text-primary-intense' };
    case 'ACCOUNT_ROLE_CHANGED':
      return { icon: UserCogIcon, label: 'Tài khoản', bg: 'bg-warning-bg-subtle', fg: 'text-warning-intense' };
    default:
      return { icon: BellIcon, label: 'Thông báo', bg: 'bg-muted-bg-subtle', fg: 'text-muted-intense' };
  }
};

/**
 * One row in a {@link NotificationList} — same layout for every notification `type`; only the
 * icon chip's color, its icon, and the eyebrow category label change (see
 * {@link getNotificationAccent}).
 *
 * **Import:** `import { NotificationItem } from '@customafk/lunas-ui/features/notification-center'`
 */
export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onClick }) => {
  const { isRead } = notification;
  const accent = getNotificationAccent(notification.type);
  const Icon = accent.icon;
  const extraContent = renderNotificationContent(notification);

  const handleMarkAsRead = () => onMarkAsRead?.(notification.uuid);

  return (
    <NotificationRow
      data-slot="notification-item"
      data-notification-type={notification.type}
      className={cn(accent.bg, onClick && 'cursor-pointer')}
      onClick={onClick ? () => onClick(notification) : undefined}
    >
      <div className={cn('mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-xs', accent.fg)}>
        <Icon strokeWidth={1} className="size-5" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-col gap-0">
          <div className="inline-flex h-5 items-center gap-1.5">
            <p className={cn('font-semibold text-xs tracking-wide', accent.fg)}>{accent.label}</p>
            {!isRead && <UnreadDot />}
          </div>
          <p className={cn('font-medium text-xs', isRead ? 'text-text-positive' : 'text-text-positive-strong')}>{notification.title}</p>
        </div>
        {/* Always rendered (even without a body) so every row reserves the same line and the list keeps a uniform row height. */}
        <p className="mt-2 text-text-positive-weak text-xs" aria-hidden={!notification.body}>
          {notification.body || ' '}
        </p>
        {extraContent}
        <div className="flex justify-end">
          <DateDisplay date={notification.createdAt} format="relative" className="text-[10px]" />
        </div>
      </div>
      {!isRead && onMarkAsRead && (
        <NotificationRowActions>
          <MarkAsReadButton onClick={handleMarkAsRead} />
        </NotificationRowActions>
      )}
    </NotificationRow>
  );
};
