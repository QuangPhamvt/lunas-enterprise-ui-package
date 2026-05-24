'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { headingVariants } from '../typography/heading';
import { paragraphVariants } from '../typography/paragraph';
import { buttonVariants } from './button.variants';

/**
 * Accessible alert dialog built on Radix UI's AlertDialog primitives, requiring explicit user confirmation before a destructive action can proceed.
 *
 * @example
 * ```tsx
 * import {
 *   AlertDialog, AlertDialogTrigger, AlertDialogContent,
 *   AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
 *   AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
 * } from '@customafk/lunas-ui/ui/alert-dialog';
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * <AlertDialog>
 *   <AlertDialogTrigger asChild>
 *     <Button variant="solid" color="danger">Delete account</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone. Your account will be permanently deleted.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
function AlertDialog({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

/** Element that opens the alert dialog when clicked; typically wrapped with `asChild` around a `Button`. */
function AlertDialogTrigger({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

/** Renders alert dialog overlay and content into a portal outside the normal React tree. */
function AlertDialogPortal({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

/** Semi-transparent backdrop rendered behind the alert dialog panel; pointer events are disabled to prevent accidental dismissal. */
function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      style={{ pointerEvents: 'none' }}
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  );
}

/** Animated panel that contains the alert dialog body; renders via `AlertDialogPortal` over `AlertDialogOverlay`. */
function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-background',
          'fixed z-50',
          '-translate-1/2 top-1/2 left-1/2',
          'grid w-full max-w-[calc(100%-2rem)] sm:max-w-lg',
          'gap-4 rounded-lg p-6 shadow-lg duration-200',
          'data-[state=open]:animate-in',
          'data-[state=open]:fade-in-0',
          'data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0',
          'data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

/** Layout wrapper for the alert dialog title and description. */
function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-dialog-header" className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />;
}

/** Layout wrapper for the cancel and action buttons at the bottom of the alert dialog. */
function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-dialog-footer" className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
}

/** Accessible heading for the alert dialog, styled with the h3 heading variant. */
function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn(headingVariants({ level: 'h3' }), className)} {...props} />;
}

/** Muted supporting text that explains the consequences of the destructive action. */
function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(paragraphVariants({ variant: 'muted' }), 'not-first:mt-0', className)}
      {...props}
    />
  );
}

/** Confirm button that closes the dialog and proceeds with the action; auto-focused and styled as the primary action. */
function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), 'min-w-24', className)} {...props} autoFocus tabIndex={1} />;
}

/** Cancel button that closes the alert dialog without performing the destructive action. */
function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return <AlertDialogPrimitive.Cancel className={cn(buttonVariants({ variant: 'outline', color: 'muted' }), 'min-w-24', className)} {...props} />;
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
