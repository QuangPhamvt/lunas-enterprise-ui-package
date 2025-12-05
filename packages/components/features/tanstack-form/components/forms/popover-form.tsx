import { cn } from '@customafk/react-toolkit/utils';

import { CloseButton } from '@/components/ui/buttons/close';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { useTanStackFormContext } from '../../tanstack-form';
import { CancelButton } from '../ui/cancel-button';
import { Dialog, DialogPortal } from '../ui/dialog';
import { SubmitButton } from '../ui/submit-button';

export const TanStackPopoverForm: React.FC<
  React.PropsWithChildren<{
    title: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }>
> = ({ title, open, onOpenChange, children }) => {
  const form = useTanStackFormContext();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal data-slot="dialog-portal">
        <DialogPrimitive.Overlay
          data-slot="dialog-overlay"
          className={cn(
            'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm',
            'data-[state=open]:animate-in',
            'data-[state=open]:fade-in',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out'
          )}
        />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            'fixed top-4 right-4 z-50 h-[calc(100dvh-2rem)] min-w-sm max-w-xl rounded-md bg-background drop-shadow-lg',
            'duration-300',

            'data-[state=open]:animate-in',
            'data-[state=open]:slide-in-from-right',
            'data-[state=open]:fade-in',

            'data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-right',
            'data-[state=closed]:fade-out'
          )}
        >
          <section className="relative flex size-full flex-col">
            <header className="flex h-14 items-center border-border border-b px-4">
              <h2 className="font-semibold text-lg text-primary-strong">{title}</h2>
            </header>

            <div className="flex-1 overflow-y-auto py-4">{children}</div>

            <div className="flex flex-col space-y-4 border-border border-t px-4 py-2">
              <form.Subscribe
                selector={state => ({
                  isSubmitting: state.isSubmitting,
                  disabled: state.isPristine || !state.isValid || state.isValidating || state.isSubmitting || !state.canSubmit,
                })}
                children={({ isSubmitting, disabled }) => {
                  return <SubmitButton isSubmitting={isSubmitting} disabled={disabled} className="w-full" />;
                }}
              />
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
                      className="w-full"
                      onClick={() => {
                        form.reset();
                        onOpenChange?.(false);
                      }}
                    />
                  );
                }}
              />
            </div>

            <DialogPrimitive.Close asChild>
              <CloseButton className="absolute top-2 right-2" />
            </DialogPrimitive.Close>
          </section>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
