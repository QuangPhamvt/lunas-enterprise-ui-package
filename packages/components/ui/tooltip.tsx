'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

/**
 * Context provider that controls the open delay for all child `Tooltip` components; defaults to `0` ms for instant display.
 *
 * @example
 * ```tsx
 * import { TooltipProvider } from '@customafk/lunas-ui/ui/tooltip';
 *
 * // Wrap at the app root to apply a shared delay:
 * <TooltipProvider delayDuration={300}>
 *   <App />
 * </TooltipProvider>
 * ```
 */
function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

/**
 * Floating label that reveals supplementary text when the user hovers or focuses its trigger element.
 *
 * @example
 * ```tsx
 * import { Tooltip, TooltipTrigger, TooltipContent } from '@customafk/lunas-ui/ui/tooltip';
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="ghost" size="icon" aria-label="Settings">⚙</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Open settings</TooltipContent>
 * </Tooltip>
 * ```
 */
function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/** Element that opens the tooltip on hover/focus; use `asChild` to forward props to a custom child element. */
function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/** Floating panel rendered in a portal that displays the tooltip text with a directional arrow. */
function TooltipContent({ className, sideOffset = 0, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-secondary-strong text-text-negative-weak shadow-dropdown outline-none',
          'fade-in-0 zoom-in-95 animate-in',
          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0',
          'data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          'z-50 w-fit',
          'origin-(--radix-tooltip-content-transform-origin)',
          'text-balance rounded-sm px-3 py-1.5 text-xs',
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-secondary-strong fill-secondary-strong" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
