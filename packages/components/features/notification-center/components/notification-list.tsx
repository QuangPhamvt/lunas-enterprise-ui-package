'use client';

import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { EmptyDisplay } from '@/components/data-display/empty';
import type { NotificationItemData } from '../types';
import { NotificationRowGroup, NotificationRowSeparator } from './atoms/notification-row';
import { NotificationItem } from './notification-item';

export type NotificationListProps = {
  notifications: NotificationItemData[];
  isLoading?: boolean;
  hasMore?: boolean;
  emptyLabel?: string;
  onLoadMore?: () => void;
  onMarkAsRead?: (notificationUuid: string) => void;
  onItemClick?: (notification: NotificationItemData) => void;
};

/**
 * Scrollable list of {@link NotificationItem} rows with an empty state and a "load more" affordance.
 * Purely presentational — the consuming app owns fetching/pagination and passes `notifications` in.
 *
 * **Import:** `import { NotificationList } from '@customafk/lunas-ui/features/notification-center'`
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
    <NotificationRowGroup data-slot="notification-list">
      {notifications.map((notification, index) => (
        <div key={notification.uuid}>
          <NotificationItem notification={notification} onMarkAsRead={onMarkAsRead} onClick={onItemClick} />
          {index < notifications.length - 1 && <NotificationRowSeparator />}
        </div>
      ))}
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
    </NotificationRowGroup>
  );
};
