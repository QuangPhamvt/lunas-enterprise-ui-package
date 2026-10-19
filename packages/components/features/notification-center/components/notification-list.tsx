'use client';

import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { EmptyDisplay } from '@/components/data-display/empty';
import type { NotificationItemData } from '../types';
import { NotificationRowGroup, NotificationRowSeparator } from './atoms/notification-row';
import { NotificationItem } from './notification-item';

/** Props for `NotificationList`. */
export type NotificationListProps = {
  /** Notifications to render, newest first. */
  notifications: NotificationItemData[];
  /** Show a spinner under the list (a page is loading). */
  isLoading?: boolean;
  /** Show the “Xem thêm” button (needs `onLoadMore`). */
  hasMore?: boolean;
  /** Text shown when the list is empty. */
  emptyLabel?: string;
  /** Called by the “Xem thêm” button. */
  onLoadMore?: () => void;
  /** Called with a notification's uuid when its “mark as read” button is clicked. */
  onMarkAsRead?: (notificationUuid: string) => void;
  /** Called when a row is clicked. */
  onItemClick?: (notification: NotificationItemData) => void;
};

/**
 * Scrollable list of {@link NotificationItem} rows with an empty state and a "load more" affordance.
 * Purely presentational — the consuming app owns fetching/pagination and passes `notifications` in.
 *
 * @example
 * ```tsx
 * import { NotificationList } from '@customafk/lunas-ui/features/notification-center';
 *
 * <NotificationList
 *   notifications={items}
 *   hasMore={hasNextPage}
 *   onLoadMore={fetchNextPage}
 *   onMarkAsRead={markAsRead}
 * />
 * ```
 */
export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  isLoading = false,
  hasMore = false,
  emptyLabel = 'Không có thông báo nào',
  onLoadMore,
  onMarkAsRead,
  onItemClick,
}) => {
  if (!isLoading && notifications.length === 0) {
    return <EmptyDisplay label={emptyLabel} className="py-12" />;
  }

  return (
    <div data-slot="notification-list" className="flex flex-col">
      <NotificationRowGroup>
        {notifications.map((notification, index) => (
          <li key={notification.uuid}>
            <NotificationItem notification={notification} onMarkAsRead={onMarkAsRead} onClick={onItemClick} />
            {index < notifications.length - 1 && <NotificationRowSeparator />}
          </li>
        ))}
      </NotificationRowGroup>
      {!!isLoading && (
        <div className="flex items-center justify-center py-4 text-text-positive-muted">
          <Loader2Icon className="size-4 animate-spin" />
        </div>
      )}
      {!isLoading && hasMore && onLoadMore && (
        <Button type="button" color="muted" variant="ghost" size="sm" className="mt-2 w-full" onClick={onLoadMore}>
          Xem thêm
        </Button>
      )}
    </div>
  );
};
