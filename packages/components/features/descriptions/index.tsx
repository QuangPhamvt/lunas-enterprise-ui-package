'use client';

import { cn } from '@customafk/react-toolkit/utils';

export * from './components';

/**
 * A single labeled row within a {@link Description} container, supporting both horizontal (side-by-side label/value) and vertical (stacked) layouts.
 *
 * @example
 * import { Description, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionItem label="Full name">John Doe</DescriptionItem>
 *   <DescriptionItem label="Email" orientation="vertical">john@example.com</DescriptionItem>
 * </Description>
 */
export const DescriptionItem: React.FC<
  React.PropsWithChildren<{
    /** Text displayed in the label column. */
    label: string;
    /**
     * Number of grid columns (out of 12) allocated to the label in horizontal orientation.
     * @default 3
     */
    labelColSpan?: number;
    /**
     * Layout direction of the label/value pair.
     * - `'horizontal'` — label and value are side by side.
     * - `'vertical'` — label sits above the value.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /** Optional node rendered in the top-right corner of the label area (e.g. an edit action). */
    action?: React.ReactNode;
  }>
> = ({ label, labelColSpan = 3, orientation = 'horizontal', action, children }) => {
  if (orientation === 'vertical') {
    return (
      <div data-slot="description-item" className="flex flex-col border-b border-b-border last:border-b-0">
        <div
          data-slot="description-item-label"
          className="flex items-center justify-between border-b border-b-border bg-secondary-muted py-2 pr-2 pl-4 text-sm font-medium text-text-positive-weak"
        >
          <span>{label}</span>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        <div data-slot="description-item-value" className="flex flex-wrap items-center gap-2 py-3 pr-2 pl-4 text-sm text-text-positive">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="description-item"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}
      className="grid border-b border-b-border last:border-b-0"
    >
      <div
        data-slot="description-item-label"
        style={{ gridColumn: `span ${labelColSpan} / span ${labelColSpan}` }}
        className="flex min-w-full items-center justify-between overflow-x-hidden text-wrap break-all border-r border-r-border bg-secondary-muted py-3 pr-2 pl-4 text-sm font-medium text-text-positive-weak tabular-nums"
      >
        <span>{label}</span>
        {action && <div className="shrink-0 pr-1">{action}</div>}
      </div>
      <div
        data-slot="description-item-value"
        style={{ gridColumn: `span ${12 - labelColSpan} / span ${12 - labelColSpan}` }}
        className="flex flex-wrap items-center gap-2 py-3 pr-2 pl-4 text-sm text-text-positive"
      >
        {children}
      </div>
    </div>
  );
};

/**
 * A header bar for a {@link Description} block, showing a title, an optional subtitle, and an optional trailing action area.
 *
 * @example
 * import { Description, DescriptionHeader } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionHeader title="User details" description="Read-only overview" extra={<EditBtn />} />
 * </Description>
 */
export const DescriptionHeader: React.FC<{
  /** Primary heading text. */
  title: string;
  /** Optional secondary text rendered below the title in a smaller, muted style. */
  description?: string;
  /** Optional node rendered on the right side of the header (e.g. action buttons). */
  extra?: React.ReactNode;
  /** Additional CSS class names applied to the header wrapper. */
  className?: string;
}> = ({ title, description, extra, className }) => {
  return (
    <div data-slot="description-header" className={cn('flex items-start justify-between gap-4 border-b border-b-border px-4 py-3', className)}>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-text-positive">{title}</p>
        {description && <p className="text-xs text-text-positive-weak">{description}</p>}
      </div>
      {extra && <div className="shrink-0">{extra}</div>}
    </div>
  );
};

/**
 * A visual section divider inside a {@link Description} container that optionally displays a section title with a decorative horizontal rule.
 *
 * @example
 * import { Description, DescriptionSection, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionSection title="Contact" />
 *   <DescriptionItem label="Email">john@example.com</DescriptionItem>
 * </Description>
 */
export const DescriptionSection: React.FC<{
  /** Optional section label rendered as uppercase small-caps text beside the divider line. */
  title?: string;
  /** Additional CSS class names applied to the section wrapper. */
  className?: string;
}> = ({ title, className }) => {
  return (
    <div data-slot="description-section" className={cn('flex items-center gap-3 border-b border-b-border bg-secondary-muted px-4 py-2', className)}>
      {title && <p className="text-xs font-semibold uppercase tracking-wide text-text-positive-muted">{title}</p>}
      <div className="h-px flex-1 bg-border-weak" />
    </div>
  );
};

/**
 * Root container for a description block — a bordered, rounded card that groups {@link DescriptionHeader}, {@link DescriptionSection}, and {@link DescriptionItem} elements.
 *
 * @example
 * import { Description, DescriptionHeader, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionHeader title="Order #1234" />
 *   <DescriptionItem label="Status">Shipped</DescriptionItem>
 *   <DescriptionItem label="Total">$99.00</DescriptionItem>
 * </Description>
 */
export const Description: React.FC<
  React.PropsWithChildren<{
    /** Additional CSS class names applied to the root wrapper element. */
    className?: string;
  }>
> = ({ children, className }) => {
  return (
    <div
      data-slot="description"
      className={cn('relative flex size-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card ring-1 ring-border-weak', className)}
    >
      {children}
    </div>
  );
};
