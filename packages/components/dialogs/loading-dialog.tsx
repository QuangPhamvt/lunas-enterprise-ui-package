'use client';

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

export type LoadingDialogProps = {
  /** Controls whether the dialog is open. */
  open?: boolean;
  /** Callback invoked when the dialog open state changes. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Displays a transparent, pointer-events-disabled modal overlay with a centered loading spinner.
 *
 * @example
 * ```tsx
 * import { LoadingDialog } from '@customafk/lunas-ui/dialogs/loading-dialog';
 *
 * <LoadingDialog open={isLoading} onOpenChange={setIsLoading} />
 * ```
 */
export const LoadingDialog: React.FC<LoadingDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="pointer-events-none border-none bg-transparent shadow-none outline-none [&>div]:bg-transparent">
        <DialogTitle />
        <div className="flex items-center justify-center">
          <div className="loader opacity-60" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
