'use client';

import { cn } from '@customafk/react-toolkit/utils';

export * from './components';

export const DescriptionItem: React.FC<
  React.PropsWithChildren<{
    label: string;
    labelColSpan?: number;
    orientation?: 'horizontal' | 'vertical';
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

export const DescriptionHeader: React.FC<{
  title: string;
  description?: string;
  extra?: React.ReactNode;
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

export const DescriptionSection: React.FC<{
  title?: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <div data-slot="description-section" className={cn('flex items-center gap-3 border-b border-b-border bg-secondary-muted px-4 py-2', className)}>
      {title && <p className="text-xs font-semibold uppercase tracking-wide text-text-positive-muted">{title}</p>}
      <div className="h-px flex-1 bg-border-weak" />
    </div>
  );
};

export const Description: React.FC<
  React.PropsWithChildren<{
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
