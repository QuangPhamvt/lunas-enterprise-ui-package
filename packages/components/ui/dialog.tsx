'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { headingVariants } from '../typography/heading';
import { paragraphVariants } from '../typography/paragraph';
import { CloseButton } from './buttons/close';

/**
 * Accessible modal dialog built on Radix UI's Dialog primitives with animated overlay, close button, and responsive sizing.
 *
 * @example
 * ```tsx
 * import {
 *   Dialog, DialogTrigger, DialogContent,
 *   DialogHeader, DialogTitle, DialogDescription, DialogFooter,
 * } from '@customafk/lunas-ui/ui/dialog';
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Confirm action</DialogTitle>
 *       <DialogDescription>This cannot be undone.</DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button variant="outline">Cancel</Button>
 *       <Button>Confirm</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/** Element that opens the dialog when clicked; typically wrapped with `asChild` around a `Button`. */
function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/** Renders dialog overlay and content into a portal outside the normal React tree. */
function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/** Button that closes the dialog; can be composed with `asChild` to use a custom element. */
function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/** Semi-transparent backdrop rendered behind the dialog panel with fade-in/out animation. */
function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-[state=open]:fade-in-0 data-[state=open]:animate-in',
        'data-[state=closed]:fade-out-0 data-[state=closed]:animate-out',
        className
      )}
      {...props}
    />
  );
}

/**
 * Animated dialog panel centred on screen; includes `DialogOverlay` and an optional close button.
 *
 * @param showCloseButton - When `true` (default), renders a `CloseButton` in the top-right corner.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  /** When `true` (default), renders an `×` close button fixed to the top-right corner of the panel. */
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'grid w-full max-w-[calc(100%-2rem)] bg-background',
          'max-h-[85dvh] gap-4 rounded-2xl p-6 shadow-dialog outline-none duration-400',
          'sm:max-w-lg',
          'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-80 data-[state=open]:animate-in',
          'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-80 data-[state=closed]:animate-out',
          className
        )}
        onOpenAutoFocus={event => {
          // Prevents focus from shifting to the content when the dialog opens, which can cause layout shift if the content includes autofocusable elements.
          event.preventDefault();
        }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" tabIndex={-1} asChild className="absolute top-3 right-3">
            <CloseButton />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/** Layout wrapper for the dialog title and description, stacked vertically with left alignment on wider screens. */
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />;
}

/** Layout wrapper for dialog action buttons, stacked on mobile and right-aligned in a row on wider screens. */
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
}

/** Accessible heading for the dialog panel, styled with the h3 heading variant and announced by screen readers. */
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn(headingVariants({ level: 'h3' }), className)} {...props} />;
}

/** Muted supporting text that describes the dialog's purpose; read by screen readers alongside the title. */
function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn(paragraphVariants({ variant: 'muted' }), className)} {...props} />;
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
