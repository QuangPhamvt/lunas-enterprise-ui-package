import { useCallback } from 'react';

import { Separator } from '@/components/ui/separator';

import { useTanStackFormContext } from '../../tanstack-form';
import { CancelButton } from '../ui/cancel-button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 rounded-sm p-0 sm:max-w-2xl">
        <DialogHeader className="flex items-center justify-center px-4 py-6">
          <DialogTitle className="font-medium">{title}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="relative flex flex-col space-y-4 p-4 pt-6">{children}</div>
        <Separator />
        <DialogFooter className="justify-between! flex items-center px-6 py-4">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
