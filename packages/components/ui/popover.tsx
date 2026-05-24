'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Popover as PopoverPrimitive } from 'radix-ui';
import { CloseButton } from './buttons/close';

/**
 * Floating panel built on Radix UI's Popover primitives, anchored to a trigger element with animated open/close transitions.
 *
 * @example
 * ```tsx
 * import {
 *   Popover, PopoverTrigger, PopoverContent, PopoverClose,
 * } from '@customafk/lunas-ui/ui/popover';
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Open popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverClose />
 *     <p>Popover body content goes here.</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

/** Element that opens or closes the popover on click; use `asChild` to render a custom trigger element. */
function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/** Floating content panel rendered in a portal, matching the trigger width and animated on open/close. */
function PopoverContent({ className, align = 'start', sideOffset = 4, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'relative bg-popover',
          'text-text-positive',
          'z-50',
          'min-w-(--radix-popover-trigger-width)',
          'max-h-(--radix-popover-content-available-height)',
          'origin-(--radix-popover-content-transform-origin)',
          'rounded-md p-4 shadow-dropdown outline-none',

          'data-[state=open]:animate-in',
          'data-[state=open]:fade-in-0',
          'data-[state=open]:zoom-in-95',

          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0',
          'data-[state=closed]:zoom-out-95',

          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/** Optional anchor element that overrides the trigger as the popover's positioning reference point. */
function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

/** Close button pre-positioned at the top-right corner of `PopoverContent` using the shared `CloseButton` primitive. */
function PopoverClose({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close data-slot="popover-close" {...props} asChild>
      <CloseButton className="absolute top-2 right-2" />
    </PopoverPrimitive.Close>
  );
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger, PopoverClose };
