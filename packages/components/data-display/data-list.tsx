'use client';

import { cn } from '@customafk/react-toolkit/utils';

type DataListProps = {
  /** Additional CSS classes applied to the wrapping container. */
  className?: string;
};

/**
 * A vertical container that stacks `DataListItem` rows with consistent spacing.
 *
 * @example
 * ```tsx
 * import { DataList, DataListItem } from '@customafk/lunas-ui/data-display/data-list';
 *
 * <DataList>
 *   <DataListItem label="Status" value="Active" />
 *   <DataListItem label="Created" value="2024-01-15" />
 * </DataList>
 * ```
 */
export const DataList: React.FC<React.PropsWithChildren<DataListProps>> = ({ children, className }) => {
  return (
    <div data-slot="data-list" className={cn('flex w-full flex-col gap-4', className)}>
      {children}
    </div>
  );
};

type DataListItemProps = {
  /** Descriptive label shown to the left of (or above, on mobile) the value. */
  label: string;
  /** The value to display; accepts strings, numbers, or arbitrary React nodes. */
  value: string | number | React.ReactNode;
  /** Minimum width applied to the label column. Defaults to `'120px'`. */
  minLabelWidth?: string;
  /** Additional CSS classes applied to the row container. */
  className?: string;
};

/**
 * A single label–value row inside a `DataList`, responsive to mobile (stacks vertically) and desktop (inline) layouts.
 *
 * @example
 * ```tsx
 * import { DataListItem } from '@customafk/lunas-ui/data-display/data-list';
 *
 * <DataListItem label="Email" value="user@example.com" />
 * ```
 */
export const DataListItem: React.FC<DataListItemProps> = ({ label, value, minLabelWidth = '120px', className }) => {
  return (
    <div data-slot="data-list-item" className={cn('flex w-full flex-col items-start gap-1 md:flex-row md:items-center md:gap-4', className)}>
      <span data-slot="data-list-label" style={{ minWidth: minLabelWidth }} className="text-sm text-text-positive-weak">
        {label}
      </span>
      <span data-slot="data-list-value" className="text-sm text-text-positive">
        {value}
      </span>
    </div>
  );
};
