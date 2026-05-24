'use client';

import { useCallback } from 'react';

import { AlertTriangleIcon } from 'lucide-react';

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export type ErrorDialogProps = {
  /** Controls whether the dialog is open. */
  open?: boolean;
  /** Title text displayed inside the dialog header. Defaults to `'An error occurred'`. */
  title?: string;
  /** Callback invoked when the dialog open state changes. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Displays a modal alert dialog for communicating error states to the user.
 *
 * @example
 * ```tsx
 * import { ErrorDialog } from '@customafk/lunas-ui/dialogs/error-dialog';
 *
 * <ErrorDialog open={hasError} title="Something went wrong" onOpenChange={setHasError}>
 *   <p>Please try again later.</p>
 * </ErrorDialog>
 * ```
 */
export const ErrorDialog: React.FC<React.PropsWithChildren<ErrorDialogProps>> = ({ open, title, children, onOpenChange }) => {
  const handleClose = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="gap-8 p-4 sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex flex-col items-center text-danger">
            <AlertTriangleIcon size={42} />
            <AlertDialogTitle className="text-xl font-medium">{title || 'An error occurred'}</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogAction className="w-full sm:w-28" onClick={handleClose}>
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
