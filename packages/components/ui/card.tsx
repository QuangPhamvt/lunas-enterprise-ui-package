'use client';

import { cn } from '@customafk/react-toolkit/utils';
import { headingVariants } from '../typography/heading';
import { paragraphVariants } from '../typography/paragraph';

/**
 * Surface container for grouping related content with a bordered, shadowed panel that supports optional interactive hover states.
 *
 * @example
 * ```tsx
 * import {
 *   Card, CardHeader, CardTitle, CardDescription,
 *   CardContent, CardFooter, CardAction,
 * } from '@customafk/lunas-ui/ui/card';
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Plan overview</CardTitle>
 *     <CardDescription>Your current subscription details.</CardDescription>
 *     <CardAction><Button size="sm">Upgrade</Button></CardAction>
 *   </CardHeader>
 *   <CardContent>Monthly usage: 42 / 100 requests</CardContent>
 *   <CardFooter>Renews on 1 Jun 2026</CardFooter>
 * </Card>
 * ```
 */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col gap-6 rounded-lg border border-border bg-card py-6 text-text-positive shadow-card',
        'transition-[box-shadow,opacity] duration-150 ease-in-out',
        'data-[interactive=true]:cursor-pointer',
        'data-[interactive=true]:hover:shadow-dropdown',
        'data-[interactive=true]:focus-visible:outline-none data-[interactive=true]:focus-visible:ring-2 data-[interactive=true]:focus-visible:ring-ring data-[interactive=true]:focus-visible:ring-offset-2',
        'data-[interactive=true]:active:opacity-90',
        className
      )}
      {...props}
    />
  );
}

/** Top section of the card that holds the title, description, and optional action slot. */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header',
        'grid auto-rows-min grid-rows-[auto_auto]',
        'items-start gap-1.5 px-6 text-text-positive-strong',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        '[.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

/** Primary heading for the card, styled with the h3 heading variant. */
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn(headingVariants({ level: 'h3' }), className)} {...props} />;
}

/** Muted supporting text displayed beneath the card title. */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn(paragraphVariants({ variant: 'muted' }), className)} {...props} />;
}

/** Optional slot in the card header for a contextual action (e.g. a button or menu); positioned in the top-right grid cell. */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props} />;
}

/** Main body area of the card with horizontal padding for content alignment. */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-6 text-sm', className)} {...props} />;
}

/** Bottom section of the card, typically used for supplementary text or secondary actions. */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex items-center px-6 text-sm [.border-t]:pt-6', className)} {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
