/** Which audience a notification was broadcast to. */
export type NotificationScope = 'GLOBAL' | 'PERSONAL';

/**
 * One notification row as rendered by {@link NotificationCenter}. Shape mirrors the API's
 * `notifications` table — the consuming app maps its SDK response into this before passing it in.
 */
export type NotificationItemData = {
  uuid: string;
  scope: NotificationScope;
  type: string;
  title: string;
  body?: string | null;
  createdAt: Date | string;
  isRead: boolean;
  entityType?: string | null;
  entityUuid?: string | null;
};

/** Props for {@link NotificationItem} — see `components/notification-item.tsx`. */
export type NotificationItemProps = {
  /** The notification row to render. */
  notification: NotificationItemData;
  /** Called when the reader marks this unread notification as read. Omit to hide the action. */
  onMarkAsRead?: (notificationUuid: string) => void;
  /** Called when the row itself is clicked — typically used to navigate to the related entity. */
  onClick?: (notification: NotificationItemData) => void;
};
