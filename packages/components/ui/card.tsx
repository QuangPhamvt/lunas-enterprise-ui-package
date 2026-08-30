'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { paragraphVariants } from '../typography/paragraph';
import { titleVariants } from '../typography/title';

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
 *     <CardTitle>
 *       Plan overview
 *       <CardAction><Button size="sm">Upgrade</Button></CardAction>
 *     </CardTitle>
 *     <CardDescription>Your current subscription details.</CardDescription>
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
        'flex flex-col gap-6 rounded border border-border bg-white py-5 text-text-positive shadow-md',
        'transition-all ease-in-out',
        'data-[interactive=true]:cursor-pointer',
        'data-[interactive=true]:hover:shadow-lg',
        'data-[interactive=true]:focus-visible:outline-none',
        'data-[interactive=true]:focus-visible:ring-2',
        'data-[interactive=true]:focus-visible:ring-ring',
        'data-[interactive=true]:focus-visible:ring-offset-2',
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
      className={cn('@container/card-header flex flex-col items-start gap-1 border-border px-5 [.border-b]:pb-5', className)}
      {...props}
    />
  );
}

/** Primary heading for the card, styled with the h3 heading variant. */
function CardTitle({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-title" className={cn(titleVariants({ level: 4 }), 'flex w-full items-center justify-between truncate', className)} {...props}>
      {children}
    </div>
  );
}

/** Muted supporting text displayed beneath the card title. */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-description" className={cn(paragraphVariants({ variant: 'muted' }), 'not-first:mt-0', className)} {...props} />;
}

/** Optional slot for a contextual action (e.g. a button or menu), meant to be nested inside `CardTitle` so it's pushed to the opposite end of the title row. */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cn('shrink', className)} {...props} />;
}

/** Main body area of the card with horizontal padding for content alignment. */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-5 text-sm', className)} {...props} />;
}

/** Bottom section of the card, typically used for supplementary text or secondary actions. */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex items-center border-border px-5 text-sm [.border-t]:pt-5', className)} {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
