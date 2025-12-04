'use client';
import { cn } from '@customafk/react-toolkit/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="skeleton" className={cn('animate-pulse rounded-md bg-muted-muted', className)} {...props} />;
}

export { Skeleton };
