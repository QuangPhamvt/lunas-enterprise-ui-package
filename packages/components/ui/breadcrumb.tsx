'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { ChevronRight, MoreHorizontal } from 'lucide-react';

import { Slot } from '@radix-ui/react-slot';

/**
 * Root breadcrumb navigation component
 */
function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" className={cn('', className)} {...props} />;
}

/**
 * Container for breadcrumb items
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn('flex flex-wrap items-center gap-1.5 sm:gap-2.5', 'text-sm break-words', 'text-text-positive-weak', className)}
      {...props}
    />
  );
}

/**
 * Individual breadcrumb item container
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

/**
 * Interactive breadcrumb link
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        'text-text-positive-weak',
        'transition-colors duration-150',
        'hover:text-text-positive focus-visible:text-text-positive',
        'focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'rounded-sm',
        className
      )}
      {...props}
    />
  );
}

/**
 * Current page breadcrumb (non-interactive)
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="breadcrumb-page" aria-current="page" className={cn('text-text-positive-strong font-medium', className)} {...props} />;
}

/**
 * Separator between breadcrumb items
 */
function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('text-text-positive-muted', '[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * Ellipsis for collapsed breadcrumbs
 */
function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      data-slot="breadcrumb-ellipsis"
      type="button"
      className={cn(
        'flex items-center justify-center',
        'size-8 rounded-sm',
        'text-text-positive-weak',
        'hover:bg-secondary-muted hover:text-text-positive',
        'focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'transition-colors duration-150',
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">Show more breadcrumbs</span>
    </button>
  );
}

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
