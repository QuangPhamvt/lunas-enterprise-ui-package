'use client';

import { useCallback } from 'react';

import { XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Dialog as DialogPrimitive } from 'radix-ui';

export type DetailDialogWrapperProps = React.PropsWithChildren<{
  /** Controls whether the dialog is open. */
  open?: boolean;
  /** Callback invoked when the dialog open state changes. */
  onOpenChange?: (open: boolean) => void;
}>;

/**
 * Outer Radix Dialog scaffolding for `DetailDialog` — Root, Portal, Overlay (scrollable,
 * min-width/min-height-safe centering), Content (the dialog card), and the close button.
 * `children` render inside Content, alongside `DetailDialogProvider`'s grid shell.
 */
export function DetailDialogWrapper({ open, onOpenChange, children }: DetailDialogWrapperProps) {
  const handleInteractOutside = useCallback<NonNullable<React.ComponentProps<typeof DialogPrimitive.Content>['onInteractOutside']>>(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <DialogPrimitive.Root data-slot="detail-dialog" open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal data-slot="detail-dialog-portal">
        <DialogPrimitive.Overlay
          data-slot="detail-dialog-overlay"
          className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 flex overflow-auto bg-black/50 p-4 data-[state=closed]:animate-out data-[state=open]:animate-in supports-backdrop-filter:backdrop-blur-xs"
        >
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              'relative z-50 m-auto grid',
              'gap-4 overflow-hidden rounded-sm border-none bg-background p-0 shadow-dialog outline-none duration-200',
              'size-full max-h-dvh min-h-160 min-w-264 max-w-svw',
              'data-[state=closed]:animate-out data-[state=open]:animate-in',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-80 data-[state=open]:zoom-in-80'
            )}
            onInteractOutside={handleInteractOutside}
          >
            {children}

            <DialogPrimitive.Close data-slot="dialog-close" tabIndex={-1} asChild className="absolute top-3 right-3">
              <button className="flex cursor-pointer items-center justify-center rounded-full p-2 text-text-positive-weak transition-colors hover:bg-muted-muted hover:text-text-positive active:bg-muted-weak active:text-text-positive-strong disabled:pointer-events-none disabled:opacity-60">
                <XIcon size={24} />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
