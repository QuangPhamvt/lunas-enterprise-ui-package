'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { type TimelineDotVariants, timelineDotVariants } from './timeline.variants';

/**
 * A vertical timeline primitive for rendering chronological/lifecycle events (e.g. order status
 * history, delivery tracking). Presentation-only — consumers resolve labels and colors themselves
 * (e.g. from a server-driven enum registry) rather than the component owning any domain vocabulary.
 *
 * `TimelineDot`'s `color` prop uses the same semantic 8-color union as `badgeDotVariants`
 * (`primary`/`secondary`/`muted`/`accent`/`info`/`success`/`warning`/`danger`), not `Status`'s raw
 * 22-value Tailwind palette — keep that in mind when mapping colors from a registry that emits the
 * raw palette (e.g. CMS's `useEnumRegistry`), a small raw→semantic mapping will be needed there.
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
 *
 * <Timeline>
 *   <TimelineItem>
 *     <TimelineIndicator>
 *       <TimelineDot status="completed" />
 *       <TimelineConnector />
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
        'group/timeline-item relative flex items-stretch gap-x-[var(--spacing-component-md)]',
        "last:[&_[data-slot='timeline-connector']]:hidden",
        className
      )}
      {...props}
    />
  );
}

/** Flex-col wrapper around a TimelineDot and its TimelineConnector, stretched to the item's full height. */
function TimelineIndicator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-indicator" className={cn('flex flex-col items-center', className)} {...props} />;
}

type TimelineDotStatus = NonNullable<TimelineDotVariants['status']>;
type TimelineDotColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

const TIMELINE_DOT_DEFAULT_COLOR: Record<TimelineDotStatus, TimelineDotColor> = {
  completed: 'success',
  current: 'primary',
  upcoming: 'muted',
  error: 'danger',
};

const TIMELINE_DOT_FILL_MAP: Record<TimelineDotColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  muted: 'bg-muted',
  accent: 'bg-accent',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

const TIMELINE_DOT_BORDER_MAP: Record<TimelineDotColor, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  muted: 'border-muted',
  accent: 'border-accent',
  info: 'border-info',
  success: 'border-success',
  warning: 'border-warning',
  danger: 'border-danger',
};

const TIMELINE_DOT_RING_MAP: Record<TimelineDotColor, string> = {
  primary: 'ring-primary/20',
  secondary: 'ring-secondary/20',
  muted: 'ring-muted/20',
  accent: 'ring-accent/20',
  info: 'ring-info/20',
  success: 'ring-success/20',
  warning: 'ring-warning/20',
  danger: 'ring-danger/20',
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
 * pulsing ring), `'upcoming'` (hollow outline, default), or `'error'` (filled). Independent from `color`.
 * @param color - Controls the dot's hue — semantic token (`'primary'` | `'secondary'` | `'muted'` |
 * `'accent'` | `'info'` | `'success'` | `'warning'` | `'danger'`). Defaults to a value derived from `status`.
 * @param size - `'sm'` | `'md'` (default) | `'lg'`.
 */
function TimelineDot({ className, status = 'upcoming', color, size = 'md', children, ...props }: TimelineDotProps) {
  const resolvedColor = color ?? TIMELINE_DOT_DEFAULT_COLOR[status];
  const isOutline = status === 'upcoming';

  return (
    <span
      data-slot="timeline-dot"
      data-status={status}
      className={cn(
        timelineDotVariants({ status, size }),
        isOutline ? TIMELINE_DOT_BORDER_MAP[resolvedColor] : TIMELINE_DOT_FILL_MAP[resolvedColor],
        status === 'current' && TIMELINE_DOT_RING_MAP[resolvedColor],
        !isOutline && 'text-white [&_svg]:text-current',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** The vertical line segment beneath a TimelineDot, connecting it to the next item's dot. Auto-hidden on the last TimelineItem. */
function TimelineConnector({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-connector" className={cn('w-px flex-1 bg-border', className)} {...props} />;
}

/** Flex-1 column holding a TimelineItem's title, description, and time — its bottom padding is what creates the gap between items. */
function TimelineContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-content" className={cn('flex flex-1 flex-col gap-1 pb-[var(--spacing-section-md)]', className)} {...props} />;
}

/** Primary label text inside a TimelineContent. */
function TimelineTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-title" className={cn('font-medium text-sm leading-snug', className)} {...props} />;
}

/** Secondary, muted body text inside a TimelineContent. */
function TimelineDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="timeline-description" className={cn('text-muted-foreground text-sm leading-normal', className)} {...props} />;
}

/** Small muted timestamp/meta line inside a TimelineContent. */
function TimelineTime({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="timeline-time" className={cn('text-muted-foreground text-xs', className)} {...props} />;
}

// biome-ignore lint/style/useComponentExportOnlyModules: compound component module, mirrors badge.tsx
export type { TimelineDotColor, TimelineDotStatus };
export { Timeline, TimelineConnector, TimelineContent, TimelineDescription, TimelineDot, TimelineIndicator, TimelineItem, TimelineTime, TimelineTitle };
