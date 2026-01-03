import { useCallback } from 'react';

import { Separator } from '@/components/ui/separator';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { useTanStackFormContext } from '../../tanstack-form';
import { CancelButton } from '../ui/cancel-button';
import { SubmitButton } from '../ui/submit-button';

export const TanStackDialogForm: React.FC<
  React.PropsWithChildren<{
    title: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }>
> = ({ title, open, onOpenChange, children }) => {
  const form = useTanStackFormContext();
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) form.reset();
      onOpenChange?.(open);
    },
    [form.reset, onOpenChange]
  );
  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.DialogPortal data-slot="dialog-portal">
        <DialogPrimitive.DialogOverlay
          data-slot="dialog-overlay"
          className="data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in"
        />
        <DialogPrimitive.Content className="data-[state=open]:fade-in-0 data-[state=open]:zoom-in-80 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-80 fixed top-1/2 left-1/2 z-50 flex max-h-[85dvh] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-y-auto rounded-sm bg-background p-0 shadow-dialog outline-none duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-2xl">
          <div data-slot="dialog-header" className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-center sm:text-left">
            <DialogPrimitive.Title data-slot="dialog-title" className="font-medium text-lg text-text-positive-strong leading-none">
              {title}
            </DialogPrimitive.Title>
          </div>
          <Separator />
          <div data-slot="dialog-content" className="relative flex flex-col space-y-4 overflow-y-auto p-4 pt-6">
            {children}
          </div>
          <Separator />
          <div data-slot="dialog-footer" className="flex flex-col-reverse items-center justify-between gap-2 px-6 py-4 sm:flex-row sm:justify-end">
            <form.Subscribe
              selector={state => {
                return {
                  disabled: state.isPristine || state.isSubmitting,
                };
              }}
              children={({ disabled }) => {
                return (
                  <CancelButton
                    disabled={disabled}
                    onClick={() => {
                      form.reset();
                      handleOpenChange(false);
                    }}
                  />
                );
              }}
            />
            <form.Subscribe
              selector={state => ({
                isSubmitting: state.isSubmitting,
                disabled: state.isPristine || !state.isValid || state.isValidating || state.isSubmitting || !state.canSubmit,
              })}
              children={({ isSubmitting, disabled }) => {
                return <SubmitButton isSubmitting={isSubmitting} disabled={disabled} />;
              }}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.DialogPortal>
    </DialogPrimitive.Root>
  );
};
