'use client';

import { cn } from '@customafk/react-toolkit/utils';

/**
 * Minimal local row shell used by {@link NotificationItem}. Intentionally not built on the shared
 * `ui/item.tsx` primitives (`Item`/`ItemGroup`/...) — that component is scheduled for removal from
 * the design system, so this feature owns its own small, self-contained list-row pieces instead of
 * depending on it. No background is set here — the caller passes a per-type `bg-*-bg-subtle` via
 * `className`, so each notification type reads as a distinct color at a glance. Hover is handled
 * by a translucent overlay layered on top (not a `hover:bg-*` swap) so it darkens/lightens whatever
 * color is underneath uniformly, instead of needing a hand-picked "next" shade per accent color.
 */
export const NotificationRow: React.FC<React.ComponentProps<'div'>> = ({ className, children, ...props }) => (
  <div role="listitem" className={cn('group relative flex items-start gap-3 rounded-none p-3 text-sm', className)} {...props}>
    <span aria-hidden className="pointer-events-none absolute inset-0 bg-black/4 opacity-0 transition-opacity group-hover:opacity-100" />
    {children}
  </div>
);

/**
 * Action slot (the "mark as read" button) for a {@link NotificationRow} — absolutely positioned
 * in the row's top-right corner so it overlays on hover instead of taking up flex space, meaning
 * it never shifts or shrinks the row's other elements (title, amount, badges, ...).
 */
export const NotificationRowActions: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('absolute top-2 right-2 flex items-center gap-2', className)} {...props} />
);

/** Wraps the whole list of {@link NotificationRow}s. */
export const NotificationRowGroup: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div role="list" className={cn('flex flex-col', className)} {...props} />
);

/** Thin divider between two {@link NotificationRow}s. */
export const NotificationRowSeparator: React.FC = () => <div className="h-px bg-border-weak" aria-hidden />;
