import { cn } from '@customafk/react-toolkit/utils';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

/**
 * Full-page or section empty-state container with centred layout and dashed border, composed with EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, and EmptyContent.
 *
 * @example
 * ```tsx
 * import {
 *   Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent,
 * } from '@customafk/lunas-ui/ui/empty';
 * import { SearchX } from 'lucide-react';
 *
 * <Empty>
 *   <EmptyHeader>
 *     <EmptyMedia variant="icon"><SearchX /></EmptyMedia>
 *     <EmptyTitle>No results found</EmptyTitle>
 *     <EmptyDescription>Try adjusting your search filters.</EmptyDescription>
 *   </EmptyHeader>
 *   <EmptyContent>
 *     <button>Reset filters</button>
 *   </EmptyContent>
 * </Empty>
 * ```
 */
function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn('flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12', className)}
      {...props}
    />
  );
}

/** Centred column container for the media, title, and description of an empty state. */
function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-header" className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)} {...props} />;
}

const emptyMediaVariants = cva('flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0', {
  variants: {
    variant: {
      default: 'bg-transparent',
      icon: "bg-muted-muted text-text-positive-weak flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Container for the visual element (illustration, icon, or image) in an empty state.
 *
 * @param variant - `'default'` renders a transparent wrapper; `'icon'` renders a rounded muted square with the icon centred inside.
 */
function EmptyMedia({ className, variant = 'default', ...props }: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return <div data-slot="empty-icon" data-variant={variant} className={cn(emptyMediaVariants({ variant, className }))} {...props} />;
}

/** Prominent heading text for the empty state. */
function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="empty-title" className={cn('text-lg font-medium tracking-tight', className)} {...props} />;
}

/** Supporting body text that explains the empty state to the user. */
function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="empty-description"
      className={cn('text-text-positive-weak [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4', className)}
      {...props}
    />
  );
}

/** Action area below the header — typically holds buttons or links to help the user proceed. */
function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="empty-content" className={cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance', className)} {...props} />
  );
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia };
