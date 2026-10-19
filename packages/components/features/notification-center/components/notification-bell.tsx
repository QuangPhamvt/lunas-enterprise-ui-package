'use client';

import { BellIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Badge } from '@/components/ui/badge';

/** Props for `NotificationBell`. */
export type NotificationBellProps = {
  /** Combined unread count (global + personal) shown as a badge; hidden when `0`. */
  unreadCount: number;
  /** Called when the bell is clicked — usually toggles the `NotificationCenter` panel. */
  onClick: () => void;
  /** Class names for the bell button. */
  className?: string;
};

/**
 * Header trigger button for {@link NotificationCenter} — a bell icon with an unread-count badge.
 * Purely presentational; the consuming app owns open/close state and passes `onClick`.
 *
 * @example
 * ```tsx
 * import { NotificationBell } from '@customafk/lunas-ui/features/notification-center';
 *
 * <NotificationBell unreadCount={globalUnread + personalUnread} onClick={() => setOpen(open => !open)} />
 * ```
 */
export const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, onClick, className }) => {
  return (
    <button
      type="button"
      data-slot="notification-bell"
      onClick={onClick}
      aria-label={unreadCount > 0 ? `Thông báo, ${unreadCount} chưa đọc` : 'Thông báo'}
      className={cn(
        'relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-text-positive-weak transition-colors',
        'hover:bg-muted-muted hover:text-text-positive',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-weak',
        className
      )}
    >
      <BellIcon className="size-5" />
      {unreadCount > 0 && (
        <Badge variant="solid" color="danger" size="xs" className="-top-0.5 -right-0.5 absolute min-w-4 justify-center px-1">
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </button>
  );
};
