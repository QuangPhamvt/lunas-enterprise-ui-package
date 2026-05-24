'use client';

import { PackageOpenIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

type EmptyDisplayProps = {
  /** Message shown below the empty-state icon. Defaults to `'No data to display.'`. */
  label?: string;
  /** Additional CSS classes applied to the wrapping container. */
  className?: string;
};

/**
 * A full-area empty-state placeholder with a package icon and a configurable message.
 *
 * @example
 * ```tsx
 * import { EmptyDisplay } from '@customafk/lunas-ui/data-display/empty';
 *
 * <EmptyDisplay label="No results found." />
 * ```
 */
export const EmptyDisplay: React.FC<EmptyDisplayProps> = ({ label = 'No data to display.', className }) => {
  return (
    <div data-slot="empty-display" className={cn('flex size-full flex-col items-center justify-center gap-2 text-text-positive-muted', className)}>
      <PackageOpenIcon size={52} strokeWidth={1} />
      <p className="text-sm">{label}</p>
    </div>
  );
};
