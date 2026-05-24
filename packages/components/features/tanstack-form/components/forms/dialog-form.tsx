'use client';

import { useCallback } from 'react';

import { Separator } from '@/components/ui/separator';

import { useTanStackFormContext } from '../../tanstack-form';
import { CancelButton } from '../ui/cancel-button';
import { SubmitButton } from '../ui/submit-button';
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from '@/components/ui/dialog';

/**
 * Renders a modal dialog that wraps a TanStack Form with a title, scrollable content area, and built-in submit/cancel actions.
 *
 * @example
 * import { TanStackDialogForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackDialogForm
 *   title="Create User"
 *   submitText="Create"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <NameField />
 *   <EmailField />
 * </TanStackDialogForm>
 */
export const TanStackDialogForm: React.FC<
  React.PropsWithChildren<{
    /** Heading text displayed in the dialog title bar. */
    title: string;
    /** Custom label for the submit button. Defaults to the `SubmitButton` component's built-in label when omitted. */
    submitText?: string;
    /** Controlled open state of the dialog. */
    open?: boolean;
    /** Callback fired when the dialog open state changes; the form is reset on close. */
    onOpenChange?: (open: boolean) => void;
  }>
> = ({ title, submitText, open, onOpenChange, children }) => {
  const form = useTanStackFormContext();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) form.reset();
      onOpenChange?.(open);
    },
    [form.reset, onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay />
        <DialogContent className="flex size-full max-h-dvh max-w-dvw flex-col gap-0 overflow-y-auto p-0 shadow-dialog sm:h-auto sm:max-h-[85dvh] sm:max-w-2xl sm:rounded-md">
          <div data-slot="dialog-header" className="flex items-center justify-center gap-2 px-6 py-5 text-center sm:text-left">
            <DialogTitle data-slot="dialog-title" className="text-lg font-semibold tracking-tight">
              {title}
            </DialogTitle>
          </div>
          <Separator />
          <div data-slot="dialog-content" className="relative flex flex-col overflow-y-auto p-0 pt-4 max-sm:flex-1 sm:p-4">
            {children}
          </div>
          <Separator />
          <div data-slot="dialog-footer" className="flex flex-col-reverse items-center justify-end gap-2 px-6 py-4 sm:flex-row max-sm:[&>button]:w-full">
            <form.Subscribe
              selector={state => ({ disabled: state.isSubmitting })}
              children={({ disabled }) => (
                <CancelButton
                  disabled={disabled}
                  onClick={() => {
                    form.reset();
                    handleOpenChange(false);
                  }}
                />
              )}
            />
            <form.Subscribe
              selector={state => ({
                isSubmitting: state.isSubmitting,
                disabled: state.isPristine || !state.isValid || state.isValidating || state.isSubmitting || !state.canSubmit,
              })}
              children={({ isSubmitting, disabled }) => (
                <SubmitButton isSubmitting={isSubmitting} disabled={disabled} submitText={submitText} onClick={() => form.handleSubmit()} />
              )}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
