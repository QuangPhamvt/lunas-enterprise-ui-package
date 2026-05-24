'use client';

import { cn } from '@customafk/react-toolkit/utils';

/**
 * Animated pulse placeholder used to indicate loading state for text, images, or other UI elements.
 *
 * @example
 * ```tsx
 * import { Skeleton } from '@customafk/lunas-ui/ui/skeleton';
 *
 * <div className="flex items-center gap-4">
 *   <Skeleton className="size-10 rounded-full" />
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-40" />
 *     <Skeleton className="h-4 w-24" />
 *   </div>
 * </div>
 * ```
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="skeleton" className={cn('animate-pulse rounded-md bg-muted-muted', className)} {...props} />;
}

export { Skeleton };
