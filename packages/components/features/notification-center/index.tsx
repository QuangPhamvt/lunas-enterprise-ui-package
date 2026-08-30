'use client';

import { BookCheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { SidePanel } from '@/components/dialogs/side-panel';
import { NotificationList } from './components/notification-list';
import type { NotificationItemData, NotificationScope } from './types';

export { NotificationBell, type NotificationBellProps } from './components/notification-bell';
export { NotificationItem, type NotificationItemProps } from './components/notification-item';
export { NotificationList, type NotificationListProps } from './components/notification-list';
export type { NotificationItemData, NotificationScope } from './types';

export type NotificationCenterProps = {
  /** Controls whether the panel is currently open. Pair with `onOpenChange`. */
  open: boolean;
  onOpenChange: (open: boolean) => void;

  /** Which tab is active. Pair with `onActiveScopeChange`. */
  activeScope: NotificationScope;
  onActiveScopeChange: (scope: NotificationScope) => void;

  globalNotifications: NotificationItemData[];
  personalNotifications: NotificationItemData[];
  globalUnreadCount: number;
  personalUnreadCount: number;

  isLoadingGlobal?: boolean;
  isLoadingPersonal?: boolean;
  hasMoreGlobal?: boolean;
  hasMorePersonal?: boolean;

  /** Called when the reader scrolls/clicks to load the next page for the given scope. */
  onLoadMore: (scope: NotificationScope) => void;
  /** Called when a single unread notification is marked read. */
  onMarkAsRead: (notificationUuid: string) => void;
  /** Called when the reader clicks "mark all as read" for the currently active scope. */
  onMarkAllAsRead: (scope: NotificationScope) => void;
  /** Called when a notification row is clicked — typically used to navigate to its related entity. */
  onItemClick?: (notification: NotificationItemData) => void;
};

/**
 * Side panel showing global and personal notifications in two independent tabs, each with its own
 * unread count and "mark all as read" action. Built on {@link SidePanel} (slides in from the right)
 * rather than a popover, since notification volume/variety needs real vertical space to browse.
 *
 * Purely presentational/controlled, like every component in this library — the consuming app owns
 * fetching, WebSocket subscriptions, and pagination, and feeds data in through props/callbacks.
 *
 * **Import:** `import { NotificationCenter } from '@customafk/lunas-ui/features/notification-center'`
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 * import { NotificationBell, NotificationCenter } from '@customafk/lunas-ui/features/notification-center';
 *
 * export function HeaderNotifications() {
 *   const [open, setOpen] = useState(false);
 *   const [scope, setScope] = useState<'GLOBAL' | 'PERSONAL'>('GLOBAL');
 *
 *   return (
 *     <>
 *       <NotificationBell unreadCount={3} onClick={() => setOpen(true)} />
 *       <NotificationCenter
 *         open={open}
 *         onOpenChange={setOpen}
 *         activeScope={scope}
 *         onActiveScopeChange={setScope}
 *         globalNotifications={[]}
 *         personalNotifications={[]}
 *         globalUnreadCount={2}
 *         personalUnreadCount={1}
 *         onLoadMore={() => {}}
 *         onMarkAsRead={() => {}}
 *         onMarkAllAsRead={() => {}}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  open,
  onOpenChange,
  activeScope,
  onActiveScopeChange,
  globalNotifications,
  personalNotifications,
  globalUnreadCount,
  personalUnreadCount,
  isLoadingGlobal = false,
  isLoadingPersonal = false,
  hasMoreGlobal = false,
  hasMorePersonal = false,
  onLoadMore,
  onMarkAsRead,
  onMarkAllAsRead,
  onItemClick,
}) => {
  return (
    <SidePanel
      data-slot="notification-center"
      open={open}
      title="Thông báo"
      description="Xem và quản lý thông báo chung và cá nhân của bạn."
      className="sm:w-120"
      onOpenChange={onOpenChange}
    >
      <Tabs value={activeScope} onValueChange={value => onActiveScopeChange(value as NotificationScope)}>
        <div className="flex items-center justify-between gap-2">
          <TabsList>
            <TabsTrigger value="GLOBAL">
              Chung
              {globalUnreadCount > 0 && (
                <Badge variant="soft" color="danger" size="xs" className="text-[10px]">
                  {globalUnreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="PERSONAL">
              Cá nhân
              {personalUnreadCount > 0 && (
                <Badge variant="soft" color="danger" size="xs" className="text-[10px]">
                  {personalUnreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <Button type="button" color="muted" variant="ghost" size="icon" onClick={() => onMarkAllAsRead(activeScope)}>
            <BookCheckIcon />
          </Button>
        </div>
        {/* -mx-4 bleeds past SidePanel's own body padding so each row's colored background reaches the panel's edges instead of leaving a gap. */}
        <TabsContent value="GLOBAL" className="-mx-4 mt-2">
          <NotificationList
            notifications={globalNotifications}
            isLoading={isLoadingGlobal}
            hasMore={hasMoreGlobal}
            emptyLabel="Chưa có thông báo chung nào"
            onLoadMore={() => onLoadMore('GLOBAL')}
            onMarkAsRead={onMarkAsRead}
            onItemClick={onItemClick}
          />
        </TabsContent>
        <TabsContent value="PERSONAL" className="-mx-4 mt-2">
          <NotificationList
            notifications={personalNotifications}
            isLoading={isLoadingPersonal}
            hasMore={hasMorePersonal}
            emptyLabel="Chưa có thông báo cá nhân nào"
            onLoadMore={() => onLoadMore('PERSONAL')}
            onMarkAsRead={onMarkAsRead}
            onItemClick={onItemClick}
          />
        </TabsContent>
      </Tabs>
    </SidePanel>
  );
};
