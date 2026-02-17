import { cn } from '@customafk/react-toolkit/utils';

export * from './components';

export const DescriptionItem: React.FC<
  React.PropsWithChildren<{
    label: string;
    labelColSpan?: number;
  }>
> = ({ label, labelColSpan = 3, children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      }}
      className="grid border-b border-b-border"
    >
      <div
        style={{
          gridColumn: `span ${labelColSpan} / span ${labelColSpan}`,
        }}
        className="flex min-w-full items-center justify-start overflow-x-hidden text-wrap break-all border-r border-r-border bg-secondary-muted py-3 pr-2 pl-4 text-sm text-text-positive-weak tabular-nums"
      >
        {label}
      </div>
      <div
        style={{
          gridColumn: `span ${12 - labelColSpan} / span ${12 - labelColSpan}`,
        }}
        className="flex flex-wrap gap-2 py-3 pr-2 pl-4 text-sm text-text-positive"
      >
        {children}
      </div>
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
      data-slot="description-wrapper"
      className={cn('relative flex size-full flex-col gap-y-0 space-y-0 overflow-hidden rounded-lg border border-border bg-card shadow-xs ring-3 ring-border-muted', className)}
    >
      {children}
    </div>
  );
};
