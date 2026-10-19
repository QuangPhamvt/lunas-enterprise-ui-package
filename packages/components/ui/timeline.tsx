'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { type TimelineDotVariants, timelineConnectorVariants, timelineDotVariants } from './timeline.variants';

/**
 * A vertical timeline primitive for rendering chronological/lifecycle events (e.g. order status
 * history, delivery tracking). Presentation-only — consumers resolve labels and colors themselves
 * (e.g. from a server-driven enum registry) rather than the component owning any domain vocabulary.
 *
 * `TimelineDot` / `TimelineConnector` take a semantic 8-color union
 * (`primary`/`secondary`/`muted`/`accent`/`info`/`success`/`warning`/`danger`), not `Status`'s raw
 * 22-value Tailwind palette — when mapping colors from a registry that emits the raw palette (e.g.
 * CMS's `useEnumRegistry`) a small raw→semantic mapping is needed there. All hues come from the
 * project token families in `styles/theme.css` (never shadcn's `muted-foreground` et al.).
 *
 * @example
 * ```tsx
 * import {
 *   Timeline,
 *   TimelineItem,
 *   TimelineIndicator,
 *   TimelineDot,
 *   TimelineConnector,
 *   TimelineContent,
 *   TimelineTitle,
 *   TimelineDescription,
 *   TimelineTime,
 * } from '@customafk/lunas-ui/ui/timeline';
 * import { CheckIcon, XIcon } from 'lucide-react';
 *
 * <Timeline>
 *   <TimelineItem>
 *     <TimelineIndicator>
 *       <TimelineDot status="completed">
 *         <CheckIcon />
 *       </TimelineDot>
 *       <TimelineConnector status="completed" />
 *     </TimelineIndicator>
 *     <TimelineContent>
 *       <TimelineTitle>Tạo Đơn</TimelineTitle>
 *       <TimelineDescription>Đơn hàng đã được tạo thành công.</TimelineDescription>
 *       <TimelineTime>10:32 26/08/2026</TimelineTime>
 *     </TimelineContent>
 *   </TimelineItem>
 *   <TimelineItem>
 *     <TimelineIndicator>
 *       <TimelineDot status="current" />
 *       <TimelineConnector />
 *     </TimelineIndicator>
 *     <TimelineContent>
 *       <TimelineTitle>Đang Mua</TimelineTitle>
 *     </TimelineContent>
 *   </TimelineItem>
 *   <TimelineItem>
 *     <TimelineIndicator>
 *       <TimelineDot status="error">
 *         <XIcon />
 *       </TimelineDot>
 *       <TimelineConnector />
 *     </TimelineIndicator>
 *     <TimelineContent>
 *       <TimelineTitle>Huỷ Đơn</TimelineTitle>
 *     </TimelineContent>
 *   </TimelineItem>
 * </Timeline>
 * ```
 */
function Timeline({ className, ...props }: React.ComponentProps<'div'>) {
  return <div role="list" data-slot="timeline" className={cn('flex flex-col', className)} {...props} />;
}

/** One row in a Timeline — pairs an indicator column (dot + connector) with a content column. */
function TimelineItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="listitem"
      data-slot="timeline-item"
      className={cn(
        'group/timeline-item relative flex items-stretch gap-x-3',
        "last:[&_[data-slot='timeline-connector']]:hidden last:[&_[data-slot='timeline-content']]:pb-0",
        className
      )}
      {...props}
    />
  );
}

/**
 * Column wrapper around a TimelineDot and its TimelineConnector, stretched to the item's full
 * height. `relative` so the absolutely-positioned connector can span it; the dot is nudged down
 * (`mt-1`) so its center lines up with the first line of `TimelineTitle` (`text-sm`/`leading-snug`).
 */
function TimelineIndicator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-indicator" className={cn('relative flex flex-col items-center [&>[data-slot=timeline-dot]]:mt-1', className)} {...props} />;
}

type TimelineDotStatus = NonNullable<TimelineDotVariants['status']>;
type TimelineDotColor = NonNullable<TimelineDotVariants['color']>;

/** Per-status fallback hue, applied when `color` is not passed explicitly. */
const TIMELINE_DOT_DEFAULT_COLOR: Record<TimelineDotStatus, TimelineDotColor> = {
  completed: 'success',
  current: 'primary',
  upcoming: 'muted',
  error: 'danger',
};

export type TimelineDotProps = React.ComponentProps<'span'> & {
  status?: TimelineDotStatus;
  color?: TimelineDotColor;
  size?: TimelineDotVariants['size'];
};

/**
 * The state/color-driven circular marker for one Timeline step.
 *
 * @param status - Controls the dot's shape: `'completed'` (filled), `'current'` (filled with a
 * pulsing ring), `'upcoming'` (hollow outline, default), or `'error'` (filled with a static ring).
 * Independent from `color`. Put a `<CheckIcon />` inside a `'completed'` dot / a `<XIcon />` inside
 * an `'error'` dot for a stronger signal.
 * @param color - Controls the dot's hue — semantic token (`'primary'` | `'secondary'` | `'muted'` |
 * `'accent'` | `'info'` | `'success'` | `'warning'` | `'danger'`). Defaults to a value derived from `status`.
 * @param size - `'sm'` | `'md'` (default) | `'lg'`.
 */
function TimelineDot({ className, status = 'upcoming', color, size = 'md', children, ...props }: TimelineDotProps) {
  const resolvedColor = color ?? TIMELINE_DOT_DEFAULT_COLOR[status];

  return (
    <span data-slot="timeline-dot" data-status={status} className={cn(timelineDotVariants({ status, color: resolvedColor, size }), className)} {...props}>
      {children}
    </span>
  );
}

export type TimelineConnectorProps = React.ComponentProps<'div'> & {
  status?: TimelineDotStatus;
  color?: TimelineDotColor;
};

/**
 * The vertical line segment beneath a TimelineDot, connecting it to the next item's dot. Auto-hidden
 * on the last TimelineItem. Pass the same `status` (and optional `color`) as the dot above it: a
 * `'completed'` segment is tinted so a run of finished steps reads as a vertical progress track;
 * every other status stays neutral (`bg-border`).
 */
function TimelineConnector({ className, status = 'upcoming', color, ...props }: TimelineConnectorProps) {
  const resolvedColor = color ?? TIMELINE_DOT_DEFAULT_COLOR[status];

  return (
    <div
      data-slot="timeline-connector"
      data-status={status}
      className={cn(timelineConnectorVariants({ status, color: resolvedColor }), className)}
      {...props}
    />
  );
}

/**
 * Flex-1 column holding a TimelineItem's title, description, and time — its bottom padding is what
 * creates the gap between items. Override `pb-*` via `className` to tune the rhythm for denser lists.
 */
function TimelineContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-content" className={cn('flex flex-1 flex-col gap-1 pb-4', className)} {...props} />;
}

/** Primary label text inside a TimelineContent. */
function TimelineTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-title" className={cn('font-medium text-sm text-text-positive-strong leading-snug', className)} {...props} />;
}

/** Secondary body text inside a TimelineContent. */
function TimelineDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="timeline-description" className={cn('text-sm text-text-positive-weak leading-normal', className)} {...props} />;
}

/** Small timestamp/meta line inside a TimelineContent. */
function TimelineTime({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-time" className={cn('text-text-positive-weak text-xs tabular-nums', className)} {...props} />;
}

// biome-ignore lint/style/useComponentExportOnlyModules: compound component module, mirrors badge.tsx
export type { TimelineDotColor, TimelineDotStatus };
export { Timeline, TimelineConnector, TimelineContent, TimelineDescription, TimelineDot, TimelineIndicator, TimelineItem, TimelineTime, TimelineTitle };
